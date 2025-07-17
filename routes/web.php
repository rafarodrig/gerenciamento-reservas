<?php

use App\Http\Controllers\SalaController;
use App\Http\Controllers\TurmaController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ReservaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TipoMaquinaController;
use App\Http\Controllers\TipoSalaController;

Route::get('/', function () {
    return redirect('/consultar-reservas');
});

Route::get('/consultar-reservas', [PageController::class, 'consultarReservas'])->name("consultar-reservas");

Route::get('/cadastrar-reservas', [PageController::class, 'cadastrarReservas'])->name("cadastrar-reservas");

Route::get('/gerenciar-salas', [PageController::class, 'gerenciarSalas'])->name("gerenciar-salas");

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

// Route::prefix('reservas')->group(function () {
//     Route::get('/', [TurmaController::class, 'index'])->name('reservas.index');
//     Route::get('/{reserva}', [TurmaController::class, 'show'])->name('reservas.show');
//     Route::post('/', [TurmaController::class, 'store'])->name('reservas.store');
//     Route::put('/{reserva}', [TurmaController::class, 'update'])->name('reservas.update');
//     Route::delete('/{reserva}', [TurmaController::class, 'destroy'])->name('reservas.destroy');
// });

Route::resource('reservas', ReservaController::class, [
    'except' => ['edit', 'create']
])->name("get", "reservas.index");

Route::resource('tipos-sala', TipoSalaController::class, ['except' => ['edit', 'create']]);
Route::resource('tipos-maquina', TipoMaquinaController::class, ['except' => ['edit', 'create']]);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
