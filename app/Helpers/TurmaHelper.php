<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;


class TurmaHelper
{
    public static function turmasIndisponiveisIds($tipo_turma, $datas): array
    {

        if(!is_array($datas)){
            $datas = array($datas);
        }

        $query = DB::table('reservas as r')
        ->distinct("r.turma_id")
        ->join('turmas as t', 'r.turma_id', '=', 't.id')
        ->select('r.turma_id')
        ->where('t.tipo', '=', $tipo_turma);
    
        if ($tipo_turma === "Graduação") {
            $conditions = [];
            $i = 0;
        
            while (isset($datas[$i])) {
                $data_inicial = date('Y-m-d', strtotime("-6 days", strtotime($datas[$i])));
        
                while (isset($datas[$i + 1])) {
                    $diff = date_diff(date_create($datas[$i]), date_create($datas[$i + 1]), true);
                    if ((int)$diff->format("%a") > 7) {
                        break;
                    }
                    $i++;
                }
                
                $data_final = date('Y-m-d', strtotime("+6 days", strtotime($datas[$i])));
                array_push($conditions, [$data_inicial, $data_final]);
                $i++;
            }
            
            foreach ($conditions as $key => $val) {
                if ($key === array_key_first($conditions)) {
                    $query->whereBetween('r.data', $val);
                } else {
                    $query->orWhereBetween('r.data', $val);
                }
            }
            
            
        } elseif ($tipo_turma === "Avulsa") {
            $query->whereDate('r.data', '=', $datas[0]);
            
        } elseif ($tipo_turma === "FIC") {
            $query->whereIn('r.data', $datas);
        }

        return $query->pluck("r.turma_id")->toArray();    
    }

}