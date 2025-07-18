<?php

namespace App\Services;

use App\Models\Reserva;
use App\Models\Sala;
use Barryvdh\Debugbar\Twig\Extension\Debug;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SalaService
{

    public function obterSalasPaginadas(Request $request)
    {
        $query = Sala::with(['tipoSala', 'tipoMaquina']);

        if ($request->filled('unidade') && $request->unidade !== 'todas') {
            $query->where('unidade', $request->unidade);
        }

        if ($request->filled('tipo_sala_id')) {
            $query->where('tipo_sala_id', $request->tipo_sala_id);
        }

        if ($request->filled('tipo_maquina_id')) {
            $query->where('tipo_maquina_id', $request->tipo_maquina_id);
        }

        // Aplicar ordenação
        $query->orderBy('unidade')->orderBy('numero');

        // Paginar e armazenar resultado
        $salasPaginadas = $query->paginate(15);

        // Logar resultado paginado (você pode reduzir a verbosidade se quiser)
        Log::debug('Salas paginadas retornadas', [
            'filtros' => $request->all(),
            'total' => $salasPaginadas->total(),
            'por_pagina' => $salasPaginadas->perPage(),
            'dados' => $salasPaginadas,
            // 'dados' => $salasPaginadas->items(), // cuidado: pode gerar log muito grande
        ]);

        return $salasPaginadas;
    }


    public function obterSalasDisponiveis(array $dados)
    {
        $query = Sala::query()->with(['tipoSala', 'tipoMaquina']);

        if (!empty($dados['unidade']) && $dados['unidade'] !== "todas") $query->where('unidade', (int) $dados['unidade']);

        if (!empty($dados['numero'])) $query->where('numero', (int) $dados['numero']);

        if (!empty($dados['tipo_sala_id'])) $query->where('tipo_sala_id', $dados['tipo_sala_id']);

        if (!empty($dados['maquinas_qtd'])) $query->where('maquinas_qtd', '>=', (int) $dados['maquinas_qtd']);

        if (!empty($dados['tipo_maquina_id'])) $query->where('tipo_maquina_id', $dados['tipo_maquina_id']);

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
            ->orderBy('numero');
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
            'numero'          => $dados['numero'],
            'tipo_sala_id'    => $dados['tipo_sala_id'],
            'unidade'         => $dados['unidade'],
            'lotacao'         => $dados['lotacao'],
            'maquinas_qtd'    => $dados['maquinas_qtd'] ?? null,
            'tipo_maquina_id' => $dados['tipo_maquina_id'] ?? null,
            'descricao'       => $dados['descricao'] ?? null,
        ]);
    }

    public function atualizarSala(Sala $sala, array $dados)
    {
        return $sala->update([
            'numero'          => $dados['numero'],
            'tipo_sala_id'    => $dados['tipo_sala_id'],
            'unidade'         => $dados['unidade'],
            'lotacao'         => $dados['lotacao'],
            'maquinas_qtd'    => $dados['maquinas_qtd'] ?? null,
            'tipo_maquina_id' => $dados['tipo_maquina_id'] ?? null,
            'descricao'       => $dados['descricao'] ?? null,
        ]);
    }

    public function deletarSala(Sala $sala)
    {
        $sala->delete();
    }
}
