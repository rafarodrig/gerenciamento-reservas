<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            DB::table("reservas")->insert([
              [
                "data" => "2024-12-30",
                "sala_id" => 1,
                "turma_id" => 1,
                "observacoes" => null,
                "responsavel_cadastro" => "dzzcZcZ"
              ],
              [
                "data" => "2025-01-06",
                "sala_id" => 1,
                "turma_id" => 1,
                "observacoes" => null,
                "responsavel_cadastro" => "dzzcZcZ"
              ]
          ]);
    }
}
