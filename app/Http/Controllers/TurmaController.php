<?php

namespace App\Http\Controllers;

use App\Models\Turma;
use App\Models\Reserva;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTurmaRequest;
use App\Http\Requests\UpdateTurmaRequest;
use Illuminate\Http\Request;


class TurmaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            
        if($request->has('disponiveis')){
            $turmas = Turma::turmasDisponiveisReserva($request);
            return view('option.turmas-disponiveis', ['disponiveis' => $turmas['disponiveis'], 'indisponiveis' => $turmas['indisponiveis']]);
        }
        else if($request->has('disponiveis-troca')){
            $reserva = Reserva::find($request->input("id-reserva"));
            $turma_atual = $reserva->turma;
            $turmas = Turma::turmasDisponiveisTroca($turma_atual,$reserva->data);
            return view('option.turmas-disponiveis-troca', ["turma_atual" => $turma_atual->id,"turmas" => $turmas]);
        }

        return Turma::all();

        } catch (\Exception $e) {
            return response()->json([
                "status" => 500,
                "msg" => "An error occurred while processing your request.",
                "error" => $e->getMessage(),
            ], 500);
        }
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTurmaRequest $request)
    {
        Turma::create([
            "nome"=> $request->nome,
            "curso"=> $request->curso,
            "docente"=> $request->docente,
            "turno"=> $request->turno,
            "tipo"=> $request->tipo,
            "lotacao"=> $request->lotacao
        ]);

        return response()->json([
            "message" => "Turma cadastrada com sucesso",
            "dados" => $request->all()
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Turma $turma)
    {
        return $turma;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTurmaRequest $request, Turma $turma)
    {
        $turma->update([
            "nome"=> $request->nome,
            "curso"=> $request->curso,
            "docente"=> $request->docente,
            "lotacao"=> $request->lotacao
        ]);

        return response()->json([
            "message" => "Turma atualizada com sucesso",
            "dados" => $request->all()
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Turma $turma)
    {
        $turma->delete();

        return response()->json([
            "message" => "Turma deletada com sucesso!"
        ],200);
    }
}
