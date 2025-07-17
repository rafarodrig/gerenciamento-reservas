<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoMaquina extends Model
{
    protected $table = "tipos_maquina";
    protected $fillable = ['nome'];

    public function salas()
    {
        return $this->hasMany(Sala::class);
    }
}
