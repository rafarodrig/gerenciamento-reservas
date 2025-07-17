<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoMaquinaSeeder extends Seeder
{
    public function run(): void
    {
        $tipos = ['Intel-i5-7', 'IMAC', 'Ryzen-5', 'Intel-i9-12'];

        foreach ($tipos as $tipo) {
            DB::table('tipos_maquina')->insert(['nome' => $tipo]);
        }
    }
}
