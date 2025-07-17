<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTiposSalaTable extends Migration
{
    public function up()
    {
        Schema::create('tipos_sala', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->unique(); // Ex: Laboratório, Auditório
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tipos_sala');
    }
}
