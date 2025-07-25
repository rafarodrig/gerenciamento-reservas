<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SalaController;
use App\Http\Controllers\TurmaController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\TipoSalaController;
use App\Http\Controllers\TipoMaquinaController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

// Autenticação
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Rotas protegidas por token Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Salas
    Route::prefix('salas')->group(function () {
        Route::get('/', [SalaController::class, 'index'])->name('salas.index');
        Route::get('/disponiveis', [SalaController::class, 'disponiveis'])->name('salas.disponiveis');
        Route::get('/disponiveis_troca', [SalaController::class, 'disponiveisTroca'])->name('salas.disponiveisTroca');
        Route::get('/{sala}', [SalaController::class, 'show'])->name('salas.show');
        Route::post('/', [SalaController::class, 'store'])->name('salas.store');
        Route::put('/{sala}', [SalaController::class, 'update'])->name('salas.update');
        Route::delete('/{sala}', [SalaController::class, 'destroy'])->name('salas.destroy');
    });

    Route::prefix('turmas')->group(function () {
        Route::get('/', [TurmaController::class, 'index'])->name('turmas.index');
        Route::get('/disponiveis', [TurmaController::class, 'disponiveis'])->name('turmas.disponiveis');
        Route::get('/{turma}', [TurmaController::class, 'show'])->name('turmas.show');
        Route::post('/', [TurmaController::class, 'store'])->name('turmas.store');
        Route::put('/{turma}', [TurmaController::class, 'update'])->name('turmas.update');
        Route::delete('/{turma}', [TurmaController::class, 'destroy'])->name('turmas.destroy');
    });

    Route::prefix('reservas')->group(function () {
        Route::get('/', [ReservaController::class, 'index'])->name('reservas.index');
        Route::get('/tabData', [ReservaController::class, 'tabData'])->name('reservas.tabData');
        Route::get('/{reserva}', [ReservaController::class, 'show'])->name('reservas.show');
        Route::post('/', [ReservaController::class, 'store'])->name('reservas.store');
        Route::put('/{reserva}', [ReservaController::class, 'update'])->name('reservas.update');
        Route::delete('/{reserva}', [ReservaController::class, 'destroy'])->name('reservas.destroy');
    });


    Route::resource('tipos-sala', TipoSalaController::class, ['except' => ['edit', 'create']]);
    Route::resource('tipos-maquina', TipoMaquinaController::class, ['except' => ['edit', 'create']]);
});
