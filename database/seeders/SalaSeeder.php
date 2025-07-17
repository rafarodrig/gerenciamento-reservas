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

    $tipoSalas = DB::table('tipos_sala')->pluck('id', 'nome');        // ['Estúdio' => 1, ...]
    $tipoMaquinas = DB::table('tipos_maquina')->pluck('id', 'nome');  // ['Ryzen-5' => 1, ...]


    $salas = [
      [
        'numero' => 101,
        'tipo_sala_id' => $tipoSalas['Estúdio'],
        'lotacao' => 20,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Intel-i5-7'],
        'unidade' => 1,
        'descricao' => 'Vídeo / Foto'
      ],

      [
        'numero' => 102,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 18,
        'maquinas_qtd' => 30,
        'tipo_maquina_id' => $tipoMaquinas['Intel-i5-7'],
        'unidade' => 1,
        'descricao' => '18 PCs novos'
      ],


      [
        'numero' => 103,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 13,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['IMAC'],
        'unidade' => 1,
        'descricao' => '13 IMAC'
      ],

      [
        'numero' => 204,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 30,
        'maquinas_qtd' => 30,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 205,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 30,
        'maquinas_qtd' => 30,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 206,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 40,
        'maquinas_qtd' => 30,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => 'Desenho de Moda'
      ],
      [
        'numero' => 207,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 20,
        'maquinas_qtd' => 30,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => 'Modelagem de Moda - 5 Mesas e 20 lugares'
      ],
      [
        'numero' => 208,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 45,
        'maquinas_qtd' => 25,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => 'Confecção de Moda - 25 Máquinas e 25 lugares'
      ],
      [
        'numero' => 210,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 45,
        'maquinas_qtd' => 30,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => 'Modateca - Biblioteca da Moda'
      ],

      [
        'numero' => 301,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 25,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Intel-i9-12'],
        'unidade' => 1,
        'descricao' => 'Sala nova'
      ],
      [
        'numero' => 302,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 45,
        'maquinas_qtd' => 30,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 303,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 20,
        'maquinas_qtd' => 30,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 304,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 28,
        'maquinas_qtd' => 30,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 305,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 28,
        'maquinas_qtd' => 30,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => 'Quarto de Hotel - 28 lugares (Cadeira universitária)'
      ],
      [
        'numero' => 306,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 15,
        'maquinas_qtd' => 30,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 308,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 33,
        'maquinas_qtd' => 19,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => '19 PCs novos'
      ],
      [
        'numero' => 309,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 39,
        'maquinas_qtd' => 19,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => '19 PCs novos'
      ],
      [
        'numero' => 310,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 20,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 311,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 39,
        'maquinas_qtd' => 19,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => 'Sala nova'
      ],
      [
        'numero' => 312,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 34,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => 'Cisco - 20 PCs novos'
      ],
      [
        'numero' => 406,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 15,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 407,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 28,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 408,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 28,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 409,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 32,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 410,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 18,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 411,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 30,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 412,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 30,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 413,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 48,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 501,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 15,
        'maquinas_qtd' => 13,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 502,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 20,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => 'Audaces - 20 PCs novos'
      ],
      [
        'numero' => 503,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 22,
        'maquinas_qtd' => 44,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => 'Audaces - 22 PCs novos'
      ],
      [
        'numero' => 504,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 24,
        'maquinas_qtd' => 28,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => '24 PCs novos'
      ],
      [
        'numero' => 505,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 49,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 506,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 32,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 507,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 30,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 601,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 33,
        'maquinas_qtd' => 34,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 602,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 21,
        'maquinas_qtd' => 21,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 603,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 20,
        'maquinas_qtd' => 25,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 604,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 25,
        'maquinas_qtd' => 30,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 701,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 25,
        'maquinas_qtd' => 40,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => '25 PCs novos'
      ],
      [
        'numero' => 702,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 22,
        'maquinas_qtd' => 27,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 703,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 20,
        'maquinas_qtd' => 31,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 704,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 25,
        'maquinas_qtd' => 29,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => '25 PCs novos'
      ],
      [
        'numero' => 801,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 20,
        'maquinas_qtd' => 31,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => '25 PCs novos'
      ],
      [
        'numero' => 802,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 12,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 803,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 3,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => NULL
      ],
      [
        'numero' => 122,
        'tipo_sala_id' => $tipoSalas['Estúdio'],
        'lotacao' => 3,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 1,
        'descricao' => 'Áudio'
      ],
      [
        'numero' => 201,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 3,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 202,
        'tipo_sala_id' => $tipoSalas['Auditório'],
        'lotacao' => 70,
        'maquinas_qtd' => 1,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 501,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 30,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 502,
        'tipo_sala_id' => $tipoSalas['Laboratório'],
        'lotacao' => 30,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 601,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 50,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 602,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 50,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 801,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 50,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 802,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 50,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 901,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 50,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 902,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 50,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 1001,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 50,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 1002,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 50,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 1101,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 50,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 1102,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 50,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 1201,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 50,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 1301,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 40,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ],
      [
        'numero' => 1302,
        'tipo_sala_id' => $tipoSalas['Sala de Aula'],
        'lotacao' => 40,
        'maquinas_qtd' => 20,
        'tipo_maquina_id' => $tipoMaquinas['Ryzen-5'],
        'unidade' => 2,
        'descricao' => NULL
      ]

    ];

    DB::table('salas')->insert($salas);
  }
}
