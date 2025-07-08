<?php

namespace App\Services;

use App\Models\Reserva;
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

        if (!empty($dados['unidade']) && $dados['unidade'] !== "todas") $query->where('unidade', (int) $dados['unidade']);

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
                    ->whereIn(DB::raw('DATE(data)'), $datas)
                    ->whereNull('r.deleted_at'); // ✅ ignora reservas deletadas

                if (!empty($dados['turno'])) {
                    $subquery->where('t.turno', $dados['turno']);
                }
            });
        }

        return $query->orderBy('unidade')
            ->orderBy('numero')
            ->paginate(20);
    }


    public function obterSalasDisponiveisTroca(array $dados)
    {
        $reserva = Reserva::with(['turma', 'sala'])->findOrFail($dados["reserva_id"]);

        // Define as datas-alvo com base na opção fornecida
        $datas = match ($dados["opcao"] ?? '') {
            'atual' => [$reserva->data],
            'todos' => Reserva::where('turma_id', $reserva->turma_id)
                ->pluck('data')
                ->unique()
                ->sort()
                ->values()
                ->toArray(),
            'apartir' => Reserva::where('turma_id', $reserva->turma_id)
                ->whereDate('data', '>=', $reserva->data)
                ->pluck('data')
                ->unique()
                ->sort()
                ->values()
                ->toArray(),
            default => [],
        };

        // Prepara os parâmetros para a busca de salas
        $dados_reserva = [
            'turno'   => $reserva->turma->turno,
            'unidade' => 'todas',
            'datas'   => $datas,
        ];

        return [
            'salas' => self::obterSalasDisponiveis($dados_reserva),
            'datas' => $datas,
        ];
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
