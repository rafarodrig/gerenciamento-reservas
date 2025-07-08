<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reserva;
use Carbon\Carbon;


class ApagarReservasExpiradas extends Command
{
    protected $signature = 'reservas:limpar-expiradas';
    protected $description = 'Remove reservas que já expiraram';

    public function handle(): int
    {
        $data = Carbon::now()->format('Y-m-d');
        $expiradas = Reserva::where('data', '<', $data)->get();

        if ($expiradas->isEmpty()) {
            $this->info("Nenhuma reserva expirada encontrada -- " . Carbon::now());
            return Command::SUCCESS;
        }

        foreach ($expiradas as $reserva) {
            $this->info("Deletando reserva ID {$reserva->id} - Turma: {$reserva->turma_id} - Sala: {$reserva->sala_id} - Data: {$reserva->data}");
            $reserva->delete();
        }

        $this->info("✅ Total de reservas expiradas apagadas: " . $expiradas->count() . "--" . Carbon::now());

        return Command::SUCCESS;
    }
}
