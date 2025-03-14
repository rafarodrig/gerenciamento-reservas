<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use App\Helpers\Helper;


class PageController extends Controller
{
    public function getDatas(){
        return [
            "dataAtual"=> Helper::dataAtual(),
            "dataAtualFormatada" => Helper::getDataAtual()
        ];
    }

    public function cadastrarReservas(){
        

        $pagina_dados = [
            'pagina_titulo' => 'Cadastrar Reservas',
            'tipos' => Sala::salasOptions('tipo'),
            'maquinas_tipos' => Sala::salasOptions('maquinas_tipo'),
            'numeros' => Sala::salasOptions('numero'),
        ];

        return view('cadastrar_reservas', array_merge($pagina_dados, $this->getDatas()));
    }

    public function consultarReservas(){
        $pagina_dados = [
            'pagina_titulo' => 'Consultar Reservas',
            'numeros' => Sala::salasOptions('numero')
        ];

        return view('consultar_reservas', array_merge($pagina_dados, $this->getDatas()));
    }

    public function gerenciarSalas(){
        $unidade = 1;
        $salas = Sala::where('unidade', $unidade)->paginate(15);
        $salas->withPath('/salas?unidade='. $unidade);
        return view('gerenciar_salas',['salas' => $salas, 'unidade' => $unidade, 'url' => '/salas?']);
    }
}