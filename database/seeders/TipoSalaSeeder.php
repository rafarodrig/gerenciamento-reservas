<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoSalaSeeder extends Seeder
{
    public function run(): void
    {
        $tipos = ['Estúdio', 'Laboratório', 'Sala de Aula', 'Auditório'];

        foreach ($tipos as $tipo) {
            DB::table('tipos_sala')->insert(['nome' => $tipo]);
        }
    }
}
