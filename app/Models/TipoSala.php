<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoSala extends Model
{
    protected $table = "tipos_sala";

    protected $fillable = ['nome'];

    public function salas()
    {
        return $this->hasMany(Sala::class);
    }
}
