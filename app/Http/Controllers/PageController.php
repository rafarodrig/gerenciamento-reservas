<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use App\Helpers\Helper;
use Inertia\Inertia;

class PageController extends Controller
{

    public function cadastrarReservas()
    {

        $pagina_dados = [
            'pagina_titulo' => 'Cadastrar Reservas',
            'tipos' => Sala::salasOptions('tipo'),
            'maquinas_tipos' => Sala::salasOptions('maquinas_tipo'),
            'numeros' => Sala::salasOptions('numero'),
        ];

        return Inertia::render('CadastrarReservas/Index', $pagina_dados);
    }

    public function consultarReservas()
    {
        $pagina_dados = [
            'pagina_titulo' => 'Consultar Reservas',
            'numeros' => Sala::salasOptions('numero')
        ];

        return Inertia::render('ConsultarReservas/Index', $pagina_dados);
    }

    public function gerenciarSalas()
    {
        $unidade = 1;

        return Inertia::render('GerenciarSalas/Index');
    }
}
