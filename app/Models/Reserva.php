<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reserva extends Model
{
    public $timestamps = false;

    protected $guarded = ["id"];
    protected function casts(): array
{
    return [
        'data' => 'date:Y-m-d',
    ];
}
    public function turma(): BelongsTo
    {
        return $this->belongsTo(Turma::class)->withTrashed();
    }
    public function sala(): BelongsTo
    {
        return $this->belongsTo(Sala::class)->withTrashed();
    }

    

}
