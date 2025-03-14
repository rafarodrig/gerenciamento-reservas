<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\Turma;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReservaRequest;
use App\Http\Requests\UpdatereservaRequest;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class ReservaController extends Controller

{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->mergeIfMissing(['unidade' => 1]);

        $query =  Reserva::with(["sala","turma"]);
        if($request->filled("data-inicio")) $query->where("data", '>=',  $request->input("data-inicio"));
        if($request->filled("data-fim")) $query->where("data", '<=',  $request->input("data-fim"));

        $query->whereHas('turma', function (Builder $query) use ($request) {
            if($request->filled("docente")) $query->where("docente", 'LIKE', '%' . $request->docente . '%' ) ;
            if($request->filled("curso")) $query->where("curso", 'LIKE', '%' . $request->curso . '%' ) ;
            if($request->filled("turma")) $query->where("nome", 'LIKE', '%' . $request->turma . '%' ) ;
            if($request->filled("turno")) $query->where("turno", '=',  $request->turno);
            if($request->filled("tipo-reserva")) $query->where("turma.tipo", '=',  $request->input("tipo-reserva"));
        });

        $query->whereHas('sala', function (Builder $query) use ($request) {    
            $query->where("unidade", '=',  $request->unidade);
            if($request->filled("sala")) $query->where("numero", '=',  $request->sala);
        });

        $reservas = $query->paginate(20)->appends($request->query());
        
        return view("table.reservas", ["reservas" => $reservas,'unidade' => $request->unidade , 'url' => $request->fullUrlWithoutQuery(['unidade','page'])]);
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
        $datas = $request->datas;
        if ($request->has("turma")) {
            $turma = $request->turma;
        } else {

            $turma = Turma::create([
                "nome" => $request->nome,
                "curso"=> $request->curso,
                "docente"=> $request->docente,
                "lotacao"=> $request->lotacao,
                "turno" => $request->turno,
                "tipo" => $request->input("tipo-reserva")
            ])->id;
        }

        $rows = [];

        $sala = $request->sala;
        $responsavel_cadastro = $request->input("responsavel-cadastro");

        foreach ($datas as $data) {
            $rows[] = 
            [
                "data" => $data, 
                "sala_id" => $sala,
                "turma_id" => $turma,
                "responsavel_cadastro" => $responsavel_cadastro
            ];
        }

        Reserva::insert($rows);

        $num = count($rows);

        $msg = $num > 1 ? "$num reservas cadastradas com sucesso": "Reserva cadastrada com sucesso";

        return response()->json([
            "message" => $msg,
            "dados" => $request->all()
        ],203);

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
        
        $tipo = $request->input("editar-reserva");
        
        
        
        $turma_nova = $request->turma;
        
        $turma = $reserva->turma_id;
        
        $dados = ["responsavel_cadastro" => $request->input("responsavel-cadastro")];
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
    public function destroy(Reserva $reserva)
    {
        $tipo = request()->input("del-reservas");

        if($tipo == "atual"){
            $res = $reserva->delete();
        }
        else if ($tipo == "todos"){
            $res = Reserva::where("turma_id",$reserva->turma_id)->delete();
        }
        else if ($tipo == "apartir"){
            $res = Reserva::where("turma_id",$reserva->turma_id)
            ->where("data",">=",$reserva->data)
            ->delete();
        }
        $msg = $res > 1 ? "$res reservas deletadas com sucesso": "Reserva deletada com sucesso";
        return response()->json(["message"=> $msg],200);
    }
}
