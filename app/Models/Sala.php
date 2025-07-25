<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sala extends Model
{
  use SoftDeletes;

  public $timestamps = false;
  protected $guarded = ['id'];

  /**
   * Relacionamento com TipoSala
   */
  public function tipoSala()
  {
    return $this->belongsTo(TipoSala::class, 'tipo_sala_id')->withTrashed();
  }

  /**
   * Relacionamento com TipoMaquina
   */
  public function tipoMaquina()
  {
    return $this->belongsTo(TipoMaquina::class, 'tipo_maquina_id')->withTrashed();
  }

  /**
   * Método utilitário para opções distintas de uma coluna
   */
  public static function salasOptions(string $column)
  {
    return self::groupBy($column)->pluck($column);
  }
}
