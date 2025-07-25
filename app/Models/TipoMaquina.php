<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoMaquina extends Model
{
    use SoftDeletes;
    protected $table = "tipos_maquina";
    public $timestamps = false;
    protected $fillable = ['nome'];

    public function salas()
    {
        return $this->hasMany(Sala::class);
    }

    public function setNomeAttribute($value)
    {
        $this->attributes['nome'] = ucfirst(trim($value));
    }
}
