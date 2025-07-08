<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Console\Commands\ApagarReservasExpiradas;
use Illuminate\Support\Facades\Schedule;

// Artisan::command('inspire', function () {
//     $this->comment(\Illuminate\Foundation\Inspiring::quote());
// })->purpose('Display an inspiring quote')
//   ->everyMinute()
//   ->appendOutputTo(storage_path('logs/inspire.log'));

Schedule::command('reservas:limpar-expiradas')
    ->daily()
    ->appendOutputTo(storage_path('logs/reservas-limpeza.log'));

