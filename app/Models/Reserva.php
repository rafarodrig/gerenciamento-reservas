<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Reserva extends Model
{
    use SoftDeletes;

    public $timestamps = false;
    protected $guarded = ["id"];

    protected function data(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('Y-m-d'),
            set: fn($value) => Carbon::parse($value),
        );
    }
    public function turma(): BelongsTo
    {
        return $this->belongsTo(Turma::class)->withTrashed();
    }
    public function sala(): BelongsTo
    {
        return $this->belongsTo(Sala::class)->withTrashed();
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function getNomeUsuarioAttribute()
    {
        return $this->usuario?->name;
    }
}
