<?php

namespace App\Services;

use App\Models\Turma;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TurmaService
{
    public static function turmasDisponiveisReserva(Request $request): array
    {
        $turma_tipo = $request->reserva_tipo;
        $turno = $request->turno;
        $datas = $request->datas;

        // Buscar IDs de turmas já ocupadas nas datas informadas
        $ids_indisponiveis = self::turmasIndisponiveisIds($turma_tipo, $datas);

        // Obter todas as turmas do tipo e turno informados
        $turmas = Turma::where('turno', $turno)
            ->where('tipo', $turma_tipo)
            ->get();

        // Filtrar turmas disponíveis
        $disponiveis = $turmas->reject(function ($turma) use ($ids_indisponiveis) {
            return in_array($turma->id, $ids_indisponiveis);
        });

        return $disponiveis->values()->all();
    }

    public static function turmasIndisponiveisIds(string $tipo_turma, $datas): array
    {
        if (!is_array($datas)) {
            $datas = [$datas];
        }

        $query = DB::table('reservas as r')
            ->distinct()
            ->join('turmas as t', 'r.turma_id', '=', 't.id')
            ->select('r.turma_id')
            ->where('t.tipo', '=', $tipo_turma);

        switch ($tipo_turma) {
            case 'Graduação':
                $conditions = self::agruparIntervalosSemanais($datas);
                foreach ($conditions as $i => [$inicio, $fim]) {
                    $i === 0
                        ? $query->whereBetween('r.data', [$inicio, $fim])
                        : $query->orWhereBetween('r.data', [$inicio, $fim]);
                }
                break;

            case 'Avulsa':
                $query->whereDate('r.data', '=', $datas[0]);
                break;

            case 'FIC':
                $query->whereIn('r.data', $datas);
                break;
        }

        return $query->whereNull('r.deleted_at')->pluck('r.turma_id')->toArray();
    }

    private static function agruparIntervalosSemanais(array $datas): array
    {
        sort($datas);
        $intervalos = [];
        $i = 0;

        while (isset($datas[$i])) {
            $data_inicio = date('Y-m-d', strtotime("-6 days", strtotime($datas[$i])));

            while (isset($datas[$i + 1])) {
                $diff = abs(strtotime($datas[$i + 1]) - strtotime($datas[$i]));
                if ($diff > (7 * 24 * 60 * 60)) {
                    break;
                }
                $i++;
            }

            $data_fim = date('Y-m-d', strtotime("+6 days", strtotime($datas[$i])));
            $intervalos[] = [$data_inicio, $data_fim];
            $i++;
        }

        return $intervalos;
    }

    public function criarTurma(array $dados): Turma
    {
        return Turma::create([
            'nome'    => $dados['nome'],
            'curso'   => $dados['curso'],
            'docente' => $dados['docente'],
            'lotacao' => $dados['lotacao'],
            'turno'   => $dados['turno'],
            'tipo'    => $dados['tipo'],
        ]);
    }
    public function atualizarTurma(Turma $turma, $request)
    {
        $turma->update([
            "nome" => $request->nome,
            "curso" => $request->curso,
            "docente" => $request->docente,
            "lotacao" => $request->lotacao
        ]);
    }

    public function deletarTurma(Turma $turma)
    {
        $turma->delete();
    }
}
