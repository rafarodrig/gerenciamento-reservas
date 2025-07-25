<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoSala extends Model
{
    use SoftDeletes;

    protected $table = "tipos_sala";
    public $timestamps = false;
    protected $guarded = ["id"];

    public function salas()
    {
        return $this->hasMany(Sala::class);
    }

    public function setNomeAttribute($value)
    {
        $this->attributes['nome'] = ucfirst(trim($value));
    }
}
