<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTiposMaquinaTable extends Migration
{
    public function up()
    {
        Schema::create('tipos_maquina', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->unique(); // Ex: Windows, Linux
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tipos_maquina');
    }
}
