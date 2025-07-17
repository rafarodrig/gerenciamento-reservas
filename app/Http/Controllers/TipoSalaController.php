<?php

// app/Http/Controllers/TipoSalaController.php

namespace App\Http\Controllers;

use App\Models\TipoSala;
use Illuminate\Http\Request;

class TipoSalaController extends Controller
{
    public function index()
    {
        return TipoSala::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|unique:tipos_sala,nome|max:255',
        ]);

        return TipoSala::create($request->all());
    }

    public function show(TipoSala $tipo_sala)
    {
        return $tipo_sala;
    }

    public function update(Request $request, TipoSala $tipo_sala)
    {
        $request->validate([
            'nome' => 'required|max:255|unique:tipos_sala,nome,' . $tipo_sala->id,
        ]);

        $tipo_sala->update($request->all());

        return $tipo_sala;
    }

    public function destroy(TipoSala $tipo_sala)
    {
        $tipo_sala->delete();

        return response()->noContent();
    }
}
