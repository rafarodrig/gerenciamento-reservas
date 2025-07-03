<?php

use App\Http\Controllers\SalaController;
use App\Http\Controllers\TurmaController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ReservaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use Inertia\Inertia;


Route::get('/', function () {
    return redirect('/consultar-reservas');
});

Route::get('/teste', fn () => Inertia::render('Teste'));

Route::get('/consultar-reservas', [PageController::class,'consultarReservas'])->name("consultar-reservas");

Route::get('/cadastrar-reservas', [PageController::class,'cadastrarReservas'])->name("cadastrar-reservas");

Route::get('/gerenciar-salas', [PageController::class,'gerenciarSalas'])->name("gerenciar-salas");

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


// Route::resource('salas',SalaController::class,[
//     'except' => ['edit','create']
// ])->name("get","salas.index");

// Salas
    Route::prefix('salas')->group(function () {
        Route::get('/', [SalaController::class, 'index'])->name('salas.index');
        Route::get('/disponiveis', [SalaController::class, 'disponiveis'])->name('salas.disponiveis');
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

Route::resource('reservas',ReservaController::class,[
    'except' => ['edit','create']
])->name( "get","reservas.index");


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

