<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

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

}
