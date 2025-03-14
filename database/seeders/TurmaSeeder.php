<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TurmaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('turmas')->insert([
            [
                'nome' => 'Desenvolvimento Interface Web',
                'curso' => 'SPI',
                'docente' => 'Fernando',
                'turno' => 'Manhã',
                'tipo' => 'Graduação',
                'lotacao' => 20
             ],
             [
                'nome' => 'Desenvolvimento Interface Web',
                'curso' => 'SPI',
                'docente' => 'Fernando',
                'turno' => 'Noite',
                'tipo' => 'Graduação',
                'lotacao' => 25
             ],
             [
                'nome' => 'Desenvolvimento Gráfico',
                'curso' => 'PM',
                'docente' => 'Roberto',
                'turno' => 'Manhã',
                'tipo' => 'Graduação',
                'lotacao' => 18
             ],
             [
                'nome' => 'Desenvolvimento Gráfico',
                'curso' => 'PM',
                'docente' => 'Roberto',
                'turno' => 'Noite',
                'tipo' => 'Graduação',
                'lotacao' => 25
             ],
             [
                'nome' => 'Algoritmos Estruturas de Dados I',
                'curso' => 'ADS',
                'docente' => 'Roberto',
                'turno' => 'Manhã',
                'tipo' => 'Graduação',
                'lotacao' => 27
             ],
             [
                'nome' => 'Algoritmos Estruturas de Dados I',
                'curso' => 'ADS',
                'docente' => 'Roberto',
                'turno' => 'Noite',
                'tipo' => 'Graduação',
                'lotacao' => 22
             ],
             [
                'nome' => 'Fundamentos Computacionais',
                'curso' => 'ADS',
                'docente' => 'Ronaldo',
                'turno' => 'Manhã',
                'tipo' => 'Graduação',
                'lotacao' => 22
             ],
             [
                'nome' => 'Fundamentos Computacionais',
                'curso' => 'ADS',
                'docente' => 'Ronaldo',
                'turno' => 'Noite',
                'tipo' => 'Graduação',
                'lotacao' => 26
             ]
        ]);
    }
}
