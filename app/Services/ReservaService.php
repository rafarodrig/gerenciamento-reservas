<?php

namespace App\Services;

use App\Services\TurmaService;
use App\Models\Reserva;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReservaService
{
    protected $turmaService;

    public function __construct(TurmaService $turmaService)
    {
        $this->turmaService = $turmaService;
    }

    public function criarReservaComTurma($request): array
    {
        DB::beginTransaction();

        try {
            $datas = $request->input('datas');
            $salaId = $request->input('sala');
            $usuarioId = Auth::id();

            $turmaId = $request->filled('turma')
                ? $request->input('turma')
                : $this->turmaService->criarTurma($request->all())->id;

            $reservas = collect($datas)->map(function ($data) use ($salaId, $turmaId, $usuarioId) {
                return [
                    'data' => $data,
                    'sala_id' => $salaId,
                    'turma_id' => $turmaId,
                    'usuario_id' => $usuarioId,
                ];
            })->toArray();

            Reserva::insert($reservas);

            DB::commit();

            return $reservas;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function obterTabDatas(array $dados)
    {

        $query = $this->getQueryReservas($dados);

        // Clona a query original antes de modificá-la
        $queryClonada = clone $query;

        if (!empty($dados["data_inicio"])) {
            $queryClonada->where("data", '>=', $dados["data_inicio"]);
        }

        if (!empty($dados["data_fim"])) {
            $queryClonada->where("data", '<=', $dados["data_fim"]);
        }

        // Busca todas as datas disponíveis
        $datas = $queryClonada->select('data')->distinct()->orderBy("data")->pluck('data');

        return [
            "datas" => $datas,
        ];
    }
    protected function getQueryReservas(array $dados)
    {
        $query = Reserva::with(['sala.TipoSala:id,nome', 'turma', 'usuario:name,id']);

        // Se a busca for por reservas inativas (deletadas)
        if (!empty($dados["reserva_status"]) && $dados["reserva_status"] === "Inativa") {
            $query = $query->onlyTrashed();
        }

        // Caso queira exibir tudo (ativas + deletadas):
        // if (!empty($dados["reserva_status"]) && $dados["reserva_status"] === "todas") {
        //     $query = $query->withTrashed();
        // }

        // Filtros por atributos de turma
        $query->whereHas('turma', function (Builder $q) use ($dados) {
            if (!empty($dados["docente"])) $q->where("docente", 'LIKE', "%{$dados["docente"]}%");
            if (!empty($dados["reserva_tipo"])) $q->where("tipo", $dados["reserva_tipo"]);
            if (!empty($dados["curso"])) $q->where("curso", 'LIKE', "%{$dados["curso"]}%");
            if (!empty($dados["turma"])) $q->where("nome", 'LIKE', "%{$dados["turma"]}%");
            if (!empty($dados["turno"])) $q->where("turno", $dados["turno"]);
        });

        // Filtros por atributos de sala
        $query->whereHas('sala', function (Builder $q) use ($dados) {
            if (!empty($dados["unidade"]) && $dados["unidade"] !== "todas") $q->where("unidade", $dados["unidade"]);
            if (!empty($dados["sala"])) $q->where("numero", $dados["sala"]);
        });

        return $query;
    }

    public function obterReservasPaginadas(array $dados)
    {

        $query = $this->getQueryReservas($dados);

        $query->where("data", '=', $dados["tabData"]);

        return [
            "reservas" => $query->orderBy("data")->paginate(20),
        ];
    }

    public function trocarSala(Reserva $reserva, string $opcao, int $salaNovaId): int
    {
        $turmaId = $reserva->turma_id;
        $salaAtualId = $reserva->sala_id;
        $dataReserva = $reserva->data;

        switch ($opcao) {
            case 'atual':
                $reserva->sala_id = $salaNovaId;
                $reserva->save();
                return 1;

            case 'todos':
                return Reserva::where('turma_id', $turmaId)
                    ->where('sala_id', $salaAtualId)
                    ->update(['sala_id' => $salaNovaId]);

            case 'apartir':
                return Reserva::where('turma_id', $turmaId)
                    ->where('sala_id', $salaAtualId)
                    ->where('data', '>=', $dataReserva)
                    ->update(['sala_id' => $salaNovaId]);

            default:
                throw new \InvalidArgumentException("Opção de troca inválida: $opcao");
        }
    }


    public function excluirReserva(Reserva $reserva, string $opcao): int
    {
        return match ($opcao) {
            'atual' => $reserva->delete() ? 1 : 0,
            'todos' => Reserva::where('turma_id', $reserva->turma_id)->delete(),
            'apartir' => Reserva::where('turma_id', $reserva->turma_id)
                ->where('data', '>=', $reserva->data)
                ->delete(),
        };
    }
}
