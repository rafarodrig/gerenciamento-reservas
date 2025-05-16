<?php

use App\Http\Controllers\SalaController;
use App\Http\Controllers\TurmaController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ReservaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Inertia\Inertia;


Route::get('/', function () {
    return redirect('/consultar-reservas');
});

Route::get('/consultar-reservas', [PageController::class,'consultarReservas'])->name("consultar-reservas");

// Route::get('/cadastrar-reservas', [PageController::class,'cadastrarReservas']);

Route::get('/gerenciar-salas', [PageController::class,'gerenciarSalas'])->name("gerenciar-salas");

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/', function () {
//     return Inertia::render('ConsultarReserva');
// });

Route::resource('salas',SalaController::class,[
    'except' => ['edit','create']
])->name("get","salas.index");
// Route::resource('turmas',TurmaController::class,[
//     'except' => ['edit','create']
// ]);

Route::resource('reservas',ReservaController::class,[
    'except' => ['edit','create']
])->name( "get","reservas.index");


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

