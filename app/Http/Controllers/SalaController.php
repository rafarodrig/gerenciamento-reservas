<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSalaRequest;
use App\Http\Requests\UpdateSalaRequest;
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
             
             if ($request->has('filtros-salas-disponiveis')) {
                $res["status"] = 200;
                $res["dados"] = Sala::filtrosSalasDisponiveis( $request );
                return response()->json($res,200);

             } 

            $request->mergeIfMissing(['unidade' => 1]);
            
            if ($request->has('disponiveis')) {
                $salas = Sala::salasDisponiveis($request);

                return view("table.salas-disponiveis", ['salas' => $salas, 'unidade' => $request->unidade , 'url' => $request->fullUrlWithoutQuery(['unidade','page'])]);

            } else {
                $salas = Sala::where('unidade', $request->unidade)->paginate(15)->appends($request->query());
        
                // return view("table.salas", ['salas' => $salas, 'unidade' => $request->unidade , 'url' =>"/salas?" ]);
                return Inertia::render("Salas/TableSalas", ['salas' => $salas, 'unidade' => $request->unidade , 'url' =>"/salas?" ]);
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
