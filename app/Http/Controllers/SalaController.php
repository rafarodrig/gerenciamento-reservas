<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use App\Models\Reserva;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSalaRequest;
use App\Http\Requests\UpdateSalaRequest;
use App\Models\Turma;
use Illuminate\Http\Request;
use Inertia\Inertia;


class SalaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index(Request $request)
     {
         try {
            
            if ($request->has('disponiveis')) {
                $salas = Sala::salasDisponiveis($request);
                $turmas = Turma::turmasDisponiveisReserva($request);
                return response()->json( ["query"=>$request->query(),"salas" => $salas, "turmas_disponiveis" => $turmas], );
            }

            else if($request->has('disponiveis_troca')){
                $reserva = Reserva::find($request->id_reserva);

                $salas = Sala::salasDisponiveisTroca($reserva->sala,$reserva->data);

                return response()->json(["salas" => $salas]);
            }
            else {
                // Se tem filtro de unidade, filtra por unidade
                if ($request->has('unidade') && $request->unidade !== 'todas') {
                    $salas = Sala::where('unidade', $request->unidade)
                                 ->orderBy('unidade', 'asc')
                                 ->orderBy('numero', 'asc')
                                 ->paginate(15)
                                 ->appends($request->query());
                } else {
                    // Se não tem filtro ou é 'todas', retorna todas as salas
                    $salas = Sala::orderBy('unidade', 'asc')
                                 ->orderBy('numero', 'asc')
                                 ->paginate(15)
                                 ->appends($request->query());
                }
        
                // Se for uma requisição AJAX/API, retorna JSON
                if ($request->expectsJson() || $request->header('Accept') === 'application/json') {
                    return response()->json([
                        'salas' => $salas,
                        'unidade' => $request->unidade ?? 'todas'
                    ]);
                }
        
                // Caso contrário, retorna a view Inertia
                return Inertia::render("Salas/TableSalas", [
                    'salas' => $salas, 
                    'unidade' => $request->unidade ?? 'todas', 
                    'url' => "/salas?"
                ]);
            }

        
         } catch (\Exception $e) {
             return response()->json([
                 "status" => 500,
                 "message" => "An error occurred while processing your request.",
                 "error" => $e->getMessage(),
             ], 500);
         }
     }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSalaRequest $request)
    {   
        // try {

            Sala::create([
                "numero" => $request->numero,
                "tipo" => $request->tipo,
                "unidade" => $request->unidade,
                "lotacao" => $request->lotacao,
                "maquinas_qtd" => $request->input("maquinas-qtd"),
                "maquinas_tipo" => $request->input("maquinas-tipo"),
                "descricao" => $request->descricao
            ]);


            
            return response()->json([
                "message" => "Sala cadastrada com sucesso",
                "dados" => $request->all()
            ],200);

        // } catch (\Exception $e) {
        //     return response()->json([
        //         "message" => "An error occurred while processing your request.",
        //         "error" => $e->getMessage(),
        //     ], 500);
        // }
        
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Sala $sala)
    {
        return $sala;
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSalaRequest $request, Sala $sala)
    {
        $sala->update([
            "numero" => $request->numero,
            "tipo" => $request->tipo,
            "unidade" => $request->unidade,
            "lotacao" => $request->lotacao,
            "maquinas_qtd" => $request->input("maquinas-qtd"),
            "maquinas_tipo" => $request->input("maquinas-tipo"),
            "descricao" => $request->descricao
        ]);

        return response()->json([
            "message" => "Sala atualizada com sucesso",
            "dados" => $request->all()
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sala $sala)
    {   
        
        $sala->delete();

        return response()->json([
            "message" => "Sala deletada com sucesso"
        ],200);
    }
}
