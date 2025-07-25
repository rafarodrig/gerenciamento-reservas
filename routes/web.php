<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;



Route::get('/', fn() => redirect('/login'));

Route::get('/login', [PageController::class, 'login'])->name('login');

Route::get('/register', [PageController::class, 'register'])->name('register');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/consultar-reservas', [PageController::class, 'consultarReservas'])->name("consultar-reservas");
    Route::get('/cadastrar-reservas', [PageController::class, 'cadastrarReservas'])->name("cadastrar-reservas");
    Route::get('/gerenciar-salas', [PageController::class, 'gerenciarSalas'])->name("gerenciar-salas");
});
