<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSalaRequest;
use App\Http\Requests\UpdateSalaRequest;
use App\Services\SalaService;
use App\Services\TurmaService;
use Illuminate\Http\Request;



class SalaController extends Controller
{
    protected $salaService;
    protected $turmaService;

    public function __construct(SalaService $salaService, TurmaService $turmaService)
    {
        $this->salaService = $salaService;
        $this->turmaService = $turmaService;
    }

    public function index(Request $request)
    {
        try {

            $salas = $this->salaService->obterSalasPaginadas($request);

            return response()->json([
                'salas' => $salas,
                'unidade' => $request->unidade ?? 'todas',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => 500,
                "message" => "Erro ao processar a solicitação.",
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function disponiveis(Request $request)
    {
        try {

            $salas = $this->salaService->obterSalasDisponiveis($request->query());

            return response()->json([
                'salas' => $salas->paginate(20),
                'unidade' => $request->unidade ?? '0'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => 500,
                "message" => "Erro ao processar a solicitação.",
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function disponiveisTroca(Request $request)
    {
        try {

            $dados = $this->salaService->obterSalasDisponiveisTroca($request->query());

            return response()->json([
                'salas' => $dados["salas"]->paginate(15),
                'datas' => $dados["datas"],
                'unidade' => 'todas'
            ]);
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
    public function store(StoreSalaRequest $request)
    {
        try {
            // Lógica de criação delegada ao Service
            $sala = $this->salaService->criarSala($request->validated());

            return response()->json([
                'message' => 'Sala criada com sucesso!',
                'sala' => $sala
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Erro ao criar sala.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Sala $sala)
    {
        $sala->load(['tipoSala', 'tipoMaquina']);
        return $sala;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSalaRequest $request, Sala $sala)
    {
        $sala = $this->salaService->atualizarSala($sala, $request->validated());

        return response()->json([
            "message" => "Sala atualizada com sucesso!",
            "sala" => $sala
        ], 200);
    }

    public function destroy(Sala $sala)
    {
        $this->salaService->deletarSala($sala);

        return response()->json([
            "message" => "Sala deletada com sucesso"
        ], 200);
    }
}
