<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class SalaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('salas')->insert([
            [
                'numero' => 101,
                'tipo' => 'Estúdio',
                'lotacao' => 20,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Intel-i5-7',
                'unidade' => 1,
                'descricao' => 'Vídeo / Foto'
              ],
              [
                'numero' => 102,
                'tipo' => 'Laboratório',
                'lotacao' => 18,
                'maquinas_qtd' => 30,
                'maquinas_tipo' => 'Intel-i5-7',
                'unidade' => 1,
                'descricao' => '18 PCs novos'
              ],
              [
                'numero' => 103,
                'tipo' => 'Laboratório',
                'lotacao' => 13,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'IMAC',
                'unidade' => 1,
                'descricao' => '13 IMAC'
              ],
              [
                'numero' => 204,
                'tipo' => 'Sala de Aula',
                'lotacao' => 30,
                'maquinas_qtd' => 30,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 205,
                'tipo' => 'Sala de Aula',
                'lotacao' => 30,
                'maquinas_qtd' => 30,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 206,
                'tipo' => 'Sala de Aula',
                'lotacao' => 40,
                'maquinas_qtd' => 30,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => 'Desenho de Moda'
              ],
              [
                'numero' => 207,
                'tipo' => 'Sala de Aula',
                'lotacao' => 20,
                'maquinas_qtd' => 30,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => 'Modelagem de Moda - 5 Mesas e 20 lugares'
              ],
              [
                'numero' => 208,
                'tipo' => 'Laboratório',
                'lotacao' => 45,
                'maquinas_qtd' => 25,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => 'Confecção de Moda - 25 Máquinas e 25 lugares'
              ],
              [
                'numero' => 210,
                'tipo' => 'Sala de Aula',
                'lotacao' => 45,
                'maquinas_qtd' => 30,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => 'Modateca - Biblioteca da Moda'
              ],
              [
                'numero' => 301,
                'tipo' => 'Laboratório',
                'lotacao' => 25,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Intel-i9-12',
                'unidade' => 1,
                'descricao' => 'Sala nova'
              ],
              [
                'numero' => 302,
                'tipo' => 'Sala de Aula',
                'lotacao' => 45,
                'maquinas_qtd' => 30,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 303,
                'tipo' => 'Sala de Aula',
                'lotacao' => 20,
                'maquinas_qtd' => 30,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 304,
                'tipo' => 'Sala de Aula',
                'lotacao' => 28,
                'maquinas_qtd' => 30,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 305,
                'tipo' => 'Sala de Aula',
                'lotacao' => 28,
                'maquinas_qtd' => 30,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => 'Quarto de Hotel - 28 lugares (Cadeira universitária)'
              ],
              [
                'numero' => 306,
                'tipo' => 'Sala de Aula',
                'lotacao' => 15,
                'maquinas_qtd' => 30,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 308,
                'tipo' => 'Laboratório',
                'lotacao' => 33,
                'maquinas_qtd' => 19,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => '19 PCs novos'
              ],
              [
                'numero' => 309,
                'tipo' => 'Laboratório',
                'lotacao' => 39,
                'maquinas_qtd' => 19,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => '19 PCs novos'
              ],
              [
                'numero' => 310,
                'tipo' => 'Laboratório',
                'lotacao' => 20,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 311,
                'tipo' => 'Laboratório',
                'lotacao' => 39,
                'maquinas_qtd' => 19,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => 'Sala nova'
              ],
              [
                'numero' => 312,
                'tipo' => 'Laboratório',
                'lotacao' => 34,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => 'Cisco - 20 PCs novos'
              ],
              [
                'numero' => 406,
                'tipo' => 'Sala de Aula',
                'lotacao' => 15,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 407,
                'tipo' => 'Sala de Aula',
                'lotacao' => 28,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 408,
                'tipo' => 'Sala de Aula',
                'lotacao' => 28,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 409,
                'tipo' => 'Sala de Aula',
                'lotacao' => 32,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 410,
                'tipo' => 'Sala de Aula',
                'lotacao' => 18,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 411,
                'tipo' => 'Sala de Aula',
                'lotacao' => 30,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 412,
                'tipo' => 'Sala de Aula',
                'lotacao' => 30,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 413,
                'tipo' => 'Sala de Aula',
                'lotacao' => 48,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 501,
                'tipo' => 'Laboratório',
                'lotacao' => 15,
                'maquinas_qtd' => 13,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 502,
                'tipo' => 'Laboratório',
                'lotacao' => 20,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => 'Audaces - 20 PCs novos'
              ],
              [
                'numero' => 503,
                'tipo' => 'Laboratório',
                'lotacao' => 22,
                'maquinas_qtd' => 44,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => 'Audaces - 22 PCs novos'
              ],
              [
                'numero' => 504,
                'tipo' => 'Laboratório',
                'lotacao' => 24,
                'maquinas_qtd' => 28,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => '24 PCs novos'
              ],
              [
                'numero' => 505,
                'tipo' => 'Sala de Aula',
                'lotacao' => 49,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 506,
                'tipo' => 'Sala de Aula',
                'lotacao' => 32,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 507,
                'tipo' => 'Sala de Aula',
                'lotacao' => 30,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 601,
                'tipo' => 'Laboratório',
                'lotacao' => 33,
                'maquinas_qtd' => 34,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 602,
                'tipo' => 'Laboratório',
                'lotacao' => 21,
                'maquinas_qtd' => 21,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 603,
                'tipo' => 'Laboratório',
                'lotacao' => 20,
                'maquinas_qtd' => 25,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 604,
                'tipo' => 'Laboratório',
                'lotacao' => 25,
                'maquinas_qtd' => 30,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 701,
                'tipo' => 'Laboratório',
                'lotacao' => 25,
                'maquinas_qtd' => 40,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => '25 PCs novos'
              ],
              [
                'numero' => 702,
                'tipo' => 'Laboratório',
                'lotacao' => 22,
                'maquinas_qtd' => 27,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 703,
                'tipo' => 'Laboratório',
                'lotacao' => 20,
                'maquinas_qtd' => 31,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 704,
                'tipo' => 'Laboratório',
                'lotacao' => 25,
                'maquinas_qtd' => 29,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => '25 PCs novos'
              ],
              [
                'numero' => 801,
                'tipo' => 'Laboratório',
                'lotacao' => 20,
                'maquinas_qtd' => 31,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => '25 PCs novos'
              ],
              [
                'numero' => 802,
                'tipo' => 'Sala de Aula',
                'lotacao' => 12,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 803,
                'tipo' => 'Sala de Aula',
                'lotacao' => 3,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => NULL
              ],
              [
                'numero' => 122,
                'tipo' => 'Estúdio',
                'lotacao' => 3,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 1,
                'descricao' => 'Áudio'
              ],
              [
                'numero' => 201,
                'tipo' => 'Laboratório',
                'lotacao' => 3,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 202,
                'tipo' => 'Auditório',
                'lotacao' => 70,
                'maquinas_qtd' => 1,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 501,
                'tipo' => 'Laboratório',
                'lotacao' => 30,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 502,
                'tipo' => 'Laboratório',
                'lotacao' => 30,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 601,
                'tipo' => 'Sala de Aula',
                'lotacao' => 50,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 602,
                'tipo' => 'Sala de Aula',
                'lotacao' => 50,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 801,
                'tipo' => 'Sala de Aula',
                'lotacao' => 50,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 802,
                'tipo' => 'Sala de Aula',
                'lotacao' => 50,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 901,
                'tipo' => 'Sala de Aula',
                'lotacao' => 50,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 902,
                'tipo' => 'Sala de Aula',
                'lotacao' => 50,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 1001,
                'tipo' => 'Sala de Aula',
                'lotacao' => 50,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 1002,
                'tipo' => 'Sala de Aula',
                'lotacao' => 50,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 1101,
                'tipo' => 'Sala de Aula',
                'lotacao' => 50,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 1102,
                'tipo' => 'Sala de Aula',
                'lotacao' => 50,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 1201,
                'tipo' => 'Sala de Aula',
                'lotacao' => 50,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 1301,
                'tipo' => 'Sala de Aula',
                'lotacao' => 40,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ],
              [
                'numero' => 1302,
                'tipo' => 'Sala de Aula',
                'lotacao' => 40,
                'maquinas_qtd' => 20,
                'maquinas_tipo' => 'Ryzen-5',
                'unidade' => 2,
                'descricao' => NULL
              ]
              
            ]
    
    
    );
    }
}
