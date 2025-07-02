<?php

namespace App\Http\Controllers;

use App\Models\Turma;
use App\Models\Reserva;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReservaRequest;
use App\Http\Requests\UpdatereservaRequest;
use App\Services\ReservaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReservaController extends Controller

{
    protected $reservaService;


    public function __construct(ReservaService $reservaService)
    {
        $this->reservaService = $reservaService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
        
        $reservas = $this->reservaService->obterReservasPaginadas($request->all());
        
        return response()->json( ["reservas" => $reservas]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

public function store(StoreReservaRequest $request)
{
    try {
        $reservas = $this->reservaService->criarReservaComTurma($request);
        
        return response()->json([
                'message' => count($reservas) > 1
                    ? count($reservas) . ' Reservas cadastradas com sucesso!'
                    : 'Reserva cadastrada com sucesso!',
                'reservas' => $reservas
            ], 201);

    } catch (\Exception $e) {
        Log::error('Erro ao cadastrar reserva', [
            'erro' => $e->getMessage(),
            'dados' => $request->all()
        ]);

        return response()->json([
            'msg' => 'Ocorreu um erro ao cadastrar a reserva.',
            'erro' => $e->getMessage()
        ], 500);
    }
}


    /**
     * Display the specified resource.
     */
    public function show(Reserva $reserva)
    {
        return $reserva->load(["sala","turma"]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reserva $reservas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatereservaRequest $request, Reserva $reserva)
    {   
        
        $tipo = $request->editar_reserva;
        
        $turma_nova = $request->turma;
        
        $turma = $reserva->turma_id;
        
        $dados = ["responsavel_cadastro" => $request->responsavel_cadastro];
        $dados["turma_id"] =  $turma;   
        
        switch ($tipo) {
            case 'atual':
                
                $res = Reserva::where("turma_id",$turma_nova)->where("data",$reserva->data)->update($dados);
                $reserva->update(["turma_id" => $turma_nova]);
                break;
            case 'todos':
                $reservas_ids = Reserva::where("turma_id",$turma)->get("id");
                
                Reserva::where("turma_id",$turma_nova)->update($dados);

                $res = Reserva::whereIn("id",$reservas_ids)->update(["turma_id" => $turma_nova]);
                
                break;
                case 'apartir':
                    $res = Reserva::where("turma_id",$reserva->turma_id)
                    ->where("data",">=",$reserva->data)
                    ->update($dados);
                    break;
                }

                $msg = $res > 1 ? "$res reservas atualizadas com sucesso": "Reserva atualizada com sucesso";
                return response()->json(["message"=> $msg],200);
        
    }

    /**
     * Remove the specified resource from storage.
     */
public function destroy(Reserva $reserva, Request $request)
    {
        $opcao = $request->input('opcao');

        if (!in_array($opcao, ['atual', 'todos', 'apartir'])) {
            return response()->json(['message' => 'Opção de exclusão inválida.'], 400);
        }

        try {
            $quantidade = $this->reservaService->excluirReserva($reserva, $opcao);

            $mensagem = $quantidade > 1
                ? "$quantidade reservas deletadas com sucesso"
                : "Reserva deletada com sucesso";

            return response()->json(['message' => $mensagem], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao excluir reserva.',
                'erro' => $e->getMessage(),
            ], 500);
        }
    }

}
