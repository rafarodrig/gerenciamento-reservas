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
        try {

            $request->validate([
                'nome' => 'required|unique:tipos_sala,nome|max:255',
            ]);

            TipoSala::create($request->all());

            return response()->json([
                'message' => 'Tipo de Sala criado com sucesso!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao cadastrar um novo tipo de sala.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(TipoSala $tipos_sala)
    {
        return $tipos_sala;
    }

    public function update(Request $request, TipoSala $tipos_sala)
    {
        $request->validate([
            'nome' => 'required|max:255|unique:tipos_sala,nome,' . $tipos_sala->id,
        ]);

        $tipos_sala->update($request->all());

        return $tipos_sala;
    }

    public function destroy(TipoSala $tipos_sala)
    {
        try {
            $tipos_sala->delete();

            return response()->json([
                'message' => 'Tipo de Sala deletado com sucesso!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao deletar tipo de sala.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
