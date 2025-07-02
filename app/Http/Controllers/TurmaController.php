<?php

namespace App\Http\Controllers;

use App\Models\Turma;
use App\Models\Reserva;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTurmaRequest;
use App\Http\Requests\UpdateTurmaRequest;
use App\Services\TurmaService;
use Illuminate\Http\Request;

class TurmaController extends Controller
{   
    protected $turmaService;


    public function __construct(TurmaService $turmaService)
    {
        $this->turmaService = $turmaService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            
            if($request->has('disponiveis_troca')){
                $reserva = Reserva::find($request->id_reserva);
                $turma_atual = $reserva->turma;
                $turmas = Turma::turmasDisponiveisTroca($turma_atual,$reserva->data);
                return response()->json(["turmas" => $turmas]);
            }
            
            return Turma::all();
            
        } catch (\Exception $e) {
            return response()->json([
                "status" => 500,
                "message" => "Erro ao processar a solicitação.",
                "error" => $e->getMessage(),
            ], 500);
        }
        
        
    }
    
    public function disponiveis(Request $request){
        try{

            $turmas = $this->turmaService->turmasDisponiveisReserva($request);
            return response()->json(["turmas" => $turmas]);

        } catch (\Exception $e) {
            return response()->json([
                "status" => 500,
                "message" => "Erro ao processar a solicitação.",
                "error" => $e->getMessage(),
            ], 500);
        }
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTurmaRequest $request)
    {
        try {
            // Lógica de criação delegada ao Service
            $turma = $this->turmaService->criarTurma($request->validated());

            return response()->json([
                'message' => 'Turma criada com sucesso!',
                'turma' => $turma
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Erro ao criar turma.',
                'message' => $e->getMessage()
            ], 500);
        }
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
        $this->turmaService->atualizarTurma($turma, $request);

        return response()->json([
            "message" => "Turma atualizada com sucesso",
            "dados" => $request->all()
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Turma $turma)
    {
        $this->turmaService->deletarTurma($turma);

        return response()->json([
            "message" => "Turma deletada com sucesso!"
        ],200);
    }
}
