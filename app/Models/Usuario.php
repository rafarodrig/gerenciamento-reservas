<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, Notifiable;

    public $timestamps = false;

    protected $table = 'usuarios'; // caso sua tabela não seja 'usuarios' no plural automático

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $casts = [
        'is_admin' => 'boolean',
    ];

    protected $hidden = ['password'];
}
