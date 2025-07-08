<?php

namespace App\Services;

use App\Services\TurmaService;
use App\Models\Reserva;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

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
            $responsavel = $request->input('responsavel_cadastro');

            $turmaId = $request->filled('turma')
                ? $request->input('turma')
                : $this->turmaService->criarTurma($request->all())->id;

            $reservas = collect($datas)->map(function ($data) use ($salaId, $turmaId, $responsavel) {
                return [
                    'data' => $data,
                    'sala_id' => $salaId,
                    'turma_id' => $turmaId,
                    'responsavel_cadastro' => $responsavel,
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

    public function obterReservasPaginadas(array $dados)
    {

        $query = Reserva::with(['sala', 'turma']);

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

        // Define a data padrão a ser usada na listagem principal

        if (!empty($dados["tabData"]) && $datas->contains($dados["tabData"])) {
            $data = $dados["tabData"];
        } else {
            $data = $datas->first();
        }

        if ($data) {
            $query->where("data", '=', $data);
        }

        // Lista paginada de reservas para a data selecionada
        $reservas = $query->orderBy("data")->paginate(20);

        return [
            "datas" => $datas,
            "reservas" => $reservas,
            "currentTab" => $data
        ];
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
