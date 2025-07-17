<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use App\Models\TipoMaquina;
use App\Models\TipoSala;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PageController extends Controller
{

    public function cadastrarReservas()
    {

        $pagina_dados = [
            'tipos' => TipoSala::orderBy('nome')->pluck('nome', 'id'),            // retorna: { id: nome }
            'maquinas_tipos' => TipoMaquina::orderBy('nome')->pluck('nome', 'id'),
            'numeros' => Sala::salasOptions("numero"),     // se quiser manter os números
        ];

        return Inertia::render('CadastrarReservasPage', $pagina_dados);
    }

    public function consultarReservas()
    {
        return Inertia::render('ConsultarReservasPage', ['numeros' => Sala::salasOptions('numero')]);
    }

    public function gerenciarSalas()
    {
        return Inertia::render('GerenciarSalasPage');
    }
}
