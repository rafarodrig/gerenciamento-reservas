<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class LimparLogs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:limpar-logs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
public function handle(): int
{
    $logPath = storage_path('logs');

    foreach (glob("$logPath/*.log") as $file) {
        unlink($file);
        $this->info("Deletado: " . basename($file));
    }

    return Command::SUCCESS;
}
}