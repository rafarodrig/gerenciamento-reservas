<?php

use App\Http\Controllers\SalaController;
use App\Http\Controllers\TurmaController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ReservaController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return redirect('/consultar-reservas');
});

Route::get('/consultar-reservas', [PageController::class,'consultarReservas']);

Route::get('/cadastrar-reservas', [PageController::class,'cadastrarReservas']);

Route::get('/gerenciar-salas', [PageController::class,'gerenciarSalas']);


Route::resource('salas',SalaController::class,[
    'except' => ['edit','create']
]);
Route::resource('turmas',TurmaController::class,[
    'except' => ['edit','create']
]);
Route::resource('reservas',ReservaController::class,[
    'except' => ['edit','create']
]);

