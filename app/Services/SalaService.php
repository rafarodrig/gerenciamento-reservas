<?php

namespace App\Services;

use App\Models\Sala;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalaService
{
    public function obterSalasPaginadas(Request $request)
    {
        $query = Sala::query();
    
        if ($request->filled('unidade') && $request->unidade !== 'todas') {
            $query->where('unidade', $request->unidade);
        }
    
        return $query->orderBy('unidade')
                       ->orderBy('numero')
                       ->paginate(15);
    }
    public function obterSalasDisponiveis(array $dados)
    {
        $query = Sala::query();

        if (!empty($dados['unidade'])) $query->where('unidade', (int) $dados['unidade']);
        
        if (!empty($dados['numero'])) $query->where('numero', (int) $dados['numero']);
        
        if (!empty($dados['tipo'])) $query->where('tipo', $dados['tipo']);

        if (!empty($dados['maquinas_qtd'])) $query->where('maquinas_qtd', '>=', (int) $dados['maquinas_qtd']);

        if (!empty($dados['maquinas_tipo'])) $query->where('maquinas_tipo', 'LIKE', '%' . $dados['maquinas_tipo'] . '%');
        
        if (!empty($dados['lotacao'])) $query->where('lotacao', '>=', (int) $dados['lotacao']);

        if (!empty($dados['datas'])) {
            $datas = $dados['datas'];
            $query->whereNotIn('id', function ($subquery) use ($datas, $dados) {
                $subquery->select('s.id')
                    ->from('salas as s')
                    ->join('reservas as r', 's.id', '=', 'r.sala_id')
                    ->join('turmas as t', 'r.turma_id', '=', 't.id')
                    ->whereIn(DB::raw('DATE(data)'), $datas);

                if (!empty($dados['turno'])) {
                    $subquery->where('t.turno', $dados['turno']);
                }
            });
        }

        return $query->orderBy('unidade')
                       ->orderBy('numero')
                       ->paginate(20);
    }


    public function obterSalasDisponiveisTroca(Request $request)
    {
        // $reserva = Reserva::with(['turma', 'sala'])->findOrFail($request->id_reserva);

        // $datas = match ($request->input('disponiveis_troca')) {
        //     'atual'   => [$reserva->data],
        //     'todos', => Reserva::where("turma_id", $reserva->turma_id)
        //                         ->pluck("data")
        //                         ->toArray(),
        //     'apartir' => Reserva::where("turma_id", $reserva->turma_id)
        //                         ->where("data", ">=", $reserva->data)
        //                         ->pluck("data")
        //                         ->toArray(),
        //     default   => [],
        // };

        // $dados = [
        //     "tipo"    => $reserva->turma->tipo,
        //     "unidade" => $reserva->sala->unidade,
        //     "datas"   => $datas,
        // ];

        // return Sala::leftJoin('reservas as r', function ($join) use ($data) {
        //     $join->on('salas.id', '=', 'r.sala_id')
        //         ->whereDate('r.data', $data);
        // })
        // ->leftJoin('turmas as t', 'r.turma_id', '=', 't.id')
        // ->select(
        //     'salas.id',
        //     'salas.unidade',
        //     'salas.numero',
        //     't.id as turma_id',
        //     't.nome as turma_nome'
        // )
        // ->get();
    }


    public function criarSala(array $dados)
    {
        return Sala::create([
            'numero'         => $dados['numero'],
            'tipo'           => $dados['tipo'],
            'unidade'        => $dados['unidade'],
            'lotacao'        => $dados['lotacao'],
            'maquinas_qtd'   => $dados['maquinas_qtd'] ?? null,
            'maquinas_tipo'  => $dados['maquinas_tipo'] ?? null,
            'descricao'      => $dados['descricao'] ?? null,
        ]);
    }

    public function atualizarSala(Sala $sala, array $dados)
    {
        return $sala->update([
            'numero'         => $dados['numero'],
            'tipo'           => $dados['tipo'],
            'unidade'        => $dados['unidade'],
            'lotacao'        => $dados['lotacao'],
            'maquinas_qtd'   => $dados['maquinas_qtd'] ?? null,
            'maquinas_tipo'  => $dados['maquinas_tipo'] ?? null,
            'descricao'      => $dados['descricao'] ?? null,
        ]);
    }

    public function deletarSala(Sala $sala)
    {
        $sala->delete();
    }
}