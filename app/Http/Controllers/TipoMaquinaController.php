<?php

// app/Http/Controllers/TipoMaquinaController.php

namespace App\Http\Controllers;

use App\Models\TipoMaquina;
use Illuminate\Http\Request;

class TipoMaquinaController extends Controller
{
    public function index()
    {
        return TipoMaquina::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|unique:tipos_maquina,nome|max:255',
        ]);

        return TipoMaquina::create($request->all());
    }

    public function show(TipoMaquina $tipo_maquina)
    {
        return $tipo_maquina;
    }

    public function update(Request $request, TipoMaquina $tipo_maquina)
    {
        $request->validate([
            'nome' => 'required|max:255|unique:tipos_maquina,nome,' . $tipo_maquina->id,
        ]);

        $tipo_maquina->update($request->all());

        return $tipo_maquina;
    }

    public function destroy(TipoMaquina $tipo_maquina)
    {
        $tipo_maquina->delete();

        return response()->noContent();
    }
}
