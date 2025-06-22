<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\Turma;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReservaRequest;
use App\Http\Requests\UpdatereservaRequest;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReservaController extends Controller

{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
        
        // $request->mergeIfMissing(['unidade' => 1]);
        

        $query =  Reserva::with(["sala","turma"]);
        if($request->filled("data_inicio")) $query->where("data", '>=',  $request->data_inicio);
        if($request->filled("data_fim")) $query->where("data", '<=',  $request->data_fim);

        $query->whereHas('turma', function (Builder $query) use ($request) {
            if($request->filled("docente")) $query->where("docente", 'LIKE', "%{$request->docente}%" ) ;
            if($request->filled("curso")) $query->where("curso", 'LIKE', "%{$request->curso}%" ) ;
            if($request->filled("turma")) $query->where("nome", 'LIKE', "%{$request->turma}%" ) ;
            if($request->filled("turno")) $query->where("turno", '=',  $request->turno);
            if($request->filled("reserva_tipo")) $query->where("tipo", '=',  $request->reserva_tipo);
        });

        $query->whereHas('sala', function (Builder $query) use ($request) {    
            $query->where("unidade", '=',  $request->unidade);
            if($request->filled("sala")) $query->where("numero", '=',  $request->sala);
        });

        $reservas = $query->orderBy("data")->paginate(20)->appends($request->query());

        return response()->json( ["query"=>$request->query(),"reservas" => $reservas]);
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
    DB::beginTransaction();

    try {
        $datas = $request->input('datas');
        $salaId = $request->input('sala');
        $responsavel = $request->input('responsavel_cadastro');

        // Verifica se é uma turma existente ou cria nova
        if ($request->filled('turma')) {
            $turmaId = $request->input('turma');
        } else {
            $turma = Turma::create([
                'nome'     => $request->input('nome'),
                'curso'    => $request->input('curso'),
                'docente'  => $request->input('docente'),
                'lotacao'  => $request->input('lotacao'),
                'turno'    => $request->input('turno'),
                'tipo'     => $request->input('reserva_tipo'),
            ]);

            $turmaId = $turma->id;
        }

        // Monta os registros de reservas
        $reservas = array_map(function ($data) use ($salaId, $turmaId, $responsavel) {
            return [
                'data' => $data,
                'sala_id' => $salaId,
                'turma_id' => $turmaId,
                'responsavel_cadastro' => $responsavel,
            ];
        }, $datas);

        Reserva::insert($reservas);

        DB::commit();

        $quantidade = count($reservas);
        $mensagem = $quantidade > 1
            ? "$quantidade reservas cadastradas com sucesso"
            : "Reserva cadastrada com sucesso";

        return response()->json([
            'msg' => $mensagem,
            'dados' => $request->all()
        ], 201);

    } catch (\Exception $e) {
        DB::rollBack();

        Log::error('Erro ao cadastrar reserva: ' . $e->getMessage(), [
            'exception' => $e,
            'dados_enviados' => $request->all()
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
                return response()->json(["msg"=> $msg],200);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reserva $reserva)
{
    $opcao = request()->input('opcao');

    // Validação simples
    if (!in_array($opcao, ['atual', 'todos', 'apartir'])) {
        return response()->json(['msg' => 'Opção de exclusão inválida.'], 400);
    }

    // Deleção conforme a opção
    $res = match ($opcao) {
        'atual' => $reserva->delete(),
        'todos' => Reserva::where('turma_id', $reserva->turma_id)->delete(),
        'apartir' => Reserva::where('turma_id', $reserva->turma_id)
                            ->where('data', '>=', $reserva->data)
                            ->delete(),
    };

    // Ajuste de mensagem
    $msg = ($res && $res > 1)
        ? "$res reservas deletadas com sucesso"
        : "Reserva deletada com sucesso";

    return response()->json(['msg' => $msg], 200);
}
}
