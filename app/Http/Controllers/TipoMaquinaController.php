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
        try {

            $request->validate([
                'nome' => 'required|unique:tipos_maquina,nome|max:255',
            ]);

            TipoMaquina::create($request->all());

            return response()->json([
                'message' => 'Tipo de máquina criado com sucesso!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao cadastrar um novo tipo de máquina.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(TipoMaquina $tipos_maquina)
    {
        return $tipos_maquina;
    }

    public function update(Request $request, TipoMaquina $tipos_maquina)
    {
        $request->validate([
            'nome' => 'required|max:255|unique:tipos_maquina,nome,' . $tipos_maquina->id,
        ]);

        $tipos_maquina->update($request->all());

        return $tipos_maquina;
    }

    public function destroy(TipoMaquina $tipos_maquina)
    {
        try {

            $tipos_maquina->delete();

            return response()->json([
                'message' => 'Tipo de máquina deletado com sucesso!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao deletar tipo de máquina.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
