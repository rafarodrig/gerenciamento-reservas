<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Turma extends Model

{
    use SoftDeletes;
    public $timestamps = false;
    protected $guarded = ["id"];

    // Mutators para normalizar os dados de texto
    public function setNomeAttribute($value)
    {
        $this->attributes['nome'] = ucwords(trim($value));
    }

    public function setCursoAttribute($value)
    {
        $this->attributes['curso'] = ucwords(trim($value));
    }

    public function setDocenteAttribute($value)
    {
        $this->attributes['docente'] = ucwords(trim($value));
    }

    public function setTurnoAttribute($value)
    {
        $this->attributes['turno'] = ucfirst(trim($value));
    }

    public function setTipoAttribute($value)
    {
        $this->attributes['tipo'] = ucfirst(trim($value));
    }
}
