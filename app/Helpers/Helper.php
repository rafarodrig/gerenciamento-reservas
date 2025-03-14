<?php

namespace App\Helpers;
use DateTime;
use DateTimeZone;

class Helper
{
    public static function diaSemana($str){
    
        $dias_semana = [
            'Monday' => 'Segunda-feira',
            'Tuesday' => 'Terça-feira',
            'Wednesday' => 'Quarta-feira',
            'Thursday' => 'Quinta-feira',
            'Friday' => 'Sexta-feira',
            'Saturday' => 'Sábado',
            'Sunday' => 'Domingo'
        ];
    
        return $dias_semana[$str];
    }
    
    public static function dataAtual()
    {
        $dt = new DateTime("now", new DateTimeZone('America/Sao_Paulo'));
        return $dt->format('Y-m-d');
    }
    public static function getDataAtual(){
        
        $data_atual = date('d/m/Y'); // Formato: dia/mês/ano
        $dia = date('l');
        
        return Helper::diaSemana($dia) . ", " .$data_atual;
    }
    
    
    public static function gerarDatasGraduacao($data_inicial,$data_final,$semanas){
        
        $dias = [];

    if($data_final){
                
        while ($data_inicial <= $data_final) {
            $dias[] = $data_inicial->format('Y-m-d');
            $data_inicial->modify("+1 week");
        }
        
    } else {

        for ($i=0; $i < $semanas; $i++) { 
            $dias[] = $data_inicial->format('Y-m-d');
            $data_inicial->modify("+1 week");
        }
    }
    return $dias; 
    }

    public static function gerarDatasFIC($data_inicial,$data_final,$semanas){
        
        $dias = [];
    
        $semanas *= 5; 
    
        $fim_semanda = ["6","0"];
    
        if($data_final){
    
            while ($data_inicial <= $data_final) {
                if(!in_array($data_inicial->format('w'),$fim_semanda)){
                    $dias[] = $data_inicial->format('Y-m-d');
                }
                $data_inicial->modify("+1 day");
            }
    
        } else {
            $i=0;
            while ($i < $semanas) {
                if(!in_array($data_inicial->format('w'),$fim_semanda)){
                    $dias[] = $data_inicial->format('Y-m-d');
                    $i++;
                }
                $data_inicial->modify("+1 day");
            }
        }
    
        // return $dias = substr_replace($dias,"",-1); 
        return $dias;
    }

    public static function gerarDatasPos($data_inicial,$dias_semana,$semanas){
        $dias = [];
    
        if(!$dias_semana){
            return $dias;
        }
        // if($data_final){
    
        //     while ($data_inicial <= $data_final) {
        //         if(!in_array($data_inicial->format('w'),$dias_semana)){
        //             $dias .= $data_inicial->format('Y-m-d,');
        //         }
        //         $data_inicial->modify("+1 day");
        //     }
    
        // } else {
            $i=0;
            while ($i < $semanas * count($dias_semana)) {
                if(in_array($data_inicial->format('w'),$dias_semana)){
                    $dias[] =  $data_inicial->format('Y-m-d');
                    $i++;
                }
                $data_inicial->modify("+1 day");
            }
        // }
    
        return $dias;
    }
}

