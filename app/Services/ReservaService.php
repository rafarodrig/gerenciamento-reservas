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
        $query =  Reserva::with(["sala","turma"]);
        if(!empty($dados["data_inicio"])) $query->where("data", '>=',  $dados["data_inicio"]);
        if(!empty($dados["data_fim"])) $query->where("data", '<=',  $dados["data_fim"]);

        $query->whereHas('turma', function (Builder $query) use ($dados) {
            if(!empty($dados["docente"])) $query->where("docente", 'LIKE', "%{$dados["docente"]}%" );

            if(!empty($dados["reserva_tipo"])) $query->where("tipo", '=',  $dados["reserva_tipo"]);

            if(!empty($dados["curso"])) $query->where("curso", 'LIKE', "%{$dados["curso"]}%" );

            if(!empty($dados["turma"])) $query->where("nome", 'LIKE', "%{$dados["turma"]}%" );

            if(!empty($dados["turno"])) $query->where("turno", '=',  $dados["turno"]);
            
        });

        $query->whereHas('sala', function (Builder $query) use ($dados) {    
            $query->where("unidade", '=',  $dados["unidade"]);
            if(!empty($dados["sala"])) $query->where("numero", '=',  $dados["sala"]);
        });

        return $query->orderBy("data")->paginate(20);
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
