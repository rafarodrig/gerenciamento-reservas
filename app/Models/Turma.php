<?php

namespace App\Models;
use App\Helpers\TurmaHelper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\SoftDeletes;

class Turma extends Model
    
{
    use SoftDeletes;
    public $timestamps = false;
    protected $guarded = ["id"];

    public static function turmasDisponiveisReserva(Request $request){

        $tipo_turma = $request->input('tipo-reserva');
        $turno = $request->input('turno');
        $datas = $request->input('datas');

        $ids_indisponiveis = TurmaHelper::turmasIndisponiveisIds( $tipo_turma, $datas);

        $disp = [];
        $indisp = [];

        $turmas = Turma::get();

        foreach ($turmas as $turma) {

            if($turma->turno == $turno and $turma->tipo == $tipo_turma) {
                if(in_array($turma->id,$ids_indisponiveis)){
                    $indisp[] = $turma;
                } else {
                    $disp[] = $turma;
                }
            }
        }
        return ['disponiveis' => $disp,'indisponiveis' => $indisp];
    }

    public static function turmasDisponiveisTroca(Turma $turma, $data)
    {    
        // busca as turmas que podem ser trocadas
        $turmas = DB::table('reservas as r')
        ->join('turmas as t', 'r.turma_id', '=', 't.id')
        ->join('salas as s', 'r.sala_id', '=', 's.id')
        ->where('t.tipo', $turma->tipo)
        ->where('t.turno', $turma->turno)
        ->where('r.data', $data)
        ->select('t.id' , 't.nome', 's.numero as sala_numero')
        ->get();
        
        return $turmas;
    }
    
    
}