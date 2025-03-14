<?php

namespace App\Models;

use App\Events\SalaCadastrada;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Helpers\Helper;
use DateTime;
use GuzzleHttp\Promise\Create;

class Sala extends Model
{
  use SoftDeletes;
  public $timestamps = false;
  protected $guarded = ["id"];

  public static function salasOptions(String $column)
  {

      $dados = Sala::groupBy($column)->get($column);

      $arr = $dados->pluck($column);

      return $arr;
      
  }

  public static function salasDisponiveis(Request $request)
  {
    // if($request->has("cached")){
    //   return Cache::get("salasDisponiveis");
    // }

    // $query = DB::table('salas as s');
    $query = Sala::where('unidade', '=', (int) $request->unidade);

    // Add filters dynamically
    if ($request->has('numero')) $query->where('numero', '=', $request->numero);
    if ($request->has('tipo')) $query->where('tipo', '=', $request->tipo);
    if ($request->has('maquinas-qtd')) $query->where('maquinas_qtd', '>=', (int) $request->input('maquinas-qtd'));
    if ($request->has('maquinas-tipo')) $query->where('maquinas_tipo', 'LIKE', '%' . $request->input('maquinas-tipo') . '%');
    if ($request->has('lotacao')) $query->where('lotacao', '>=', (int) $request->lotacao);

    if ($request->has('datas')) {
        $datas = $request->input('datas');
        $query->whereNotIn('id', function ($subquery) use ($datas, $request) {
            $subquery->select('s.id')
                ->from('salas as s')
                ->join('reservas as r', 's.id', '=', 'r.sala_id')
                ->join('turmas as t', 'r.turma_id', '=', 't.id')
                ->whereIn(DB::raw('DATE(data)'), $datas);

            if ($request->has('turno')) {
                $subquery->where('t.turno', '=', $request->input('turno'));
            }
        });
    }

    return $query->paginate(20)->appends($request->query());

  }

  public static function filtrosSalasDisponiveis(Request $request){
    $filtros = [];

    if ($request->filled('tipo-reserva')) $filtros['tipo-reserva'] = $request->input('tipo-reserva');
    if ($request->filled('turno')) $filtros['turno'] = $request->input('turno');
    if ($request->filled('numero')) $filtros['numero'] = $request->input('numero');
    if ($request->filled('tipo')) $filtros['tipo'] = $request->input('tipo');
    if ($request->filled('maquinas-qtd')) $filtros['maquinas-qtd'] = $request->input('maquinas-qtd') . " maquinas";
    if ($request->filled('maquinas-tipo')) $filtros['maquinas-tipo'] = $request->input('maquinas-tipo');
    if ($request->filled('lotacao'))$filtros['lotacao'] = $request->input('lotacao') . " lugares";

    // Data inicial
    $data_inicial = new DateTime($request->input('data-inicio'));

    // Data final (optional)
    $data_final = $request->filled('data-fim') ? new DateTime($request->input('data-fim')) : null;

    // Semanas (optional)
    $semanas = $request->filled('semanas') ? (int) $request->input('semanas') : null;

    // Dias da semana (optional)
    $dias_semana = $request->input('dias-semana', null);
  
    switch ($request->input("tipo-reserva")){
      case "Avulsa":
          $dias[] = $data_inicial->format('Y-m-d');
          break;

      case "Graduação":
          $dias = Helper::gerarDatasGraduacao($data_inicial,$data_final,$semanas);
          break;
      
      case "FIC":
          $dias = Helper::gerarDatasFIC($data_inicial,$data_final,$semanas);
          break;

      case "Pos-graduacao":
          $dias = Helper::gerarDatasPos($data_inicial,$dias_semana,$semanas);
          break;
  }
    return [
      "filtros" => $filtros,
      "datas" => $dias
    ];
  }

}
