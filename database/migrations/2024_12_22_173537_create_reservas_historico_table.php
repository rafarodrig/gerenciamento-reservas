<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservas_historico', function (Blueprint $table) {
            $table->integer('id');
            $table->date('data');
            $table->string('docente', 80);
            $table->integer('participantes');
            $table->integer('turma_id');
            $table->integer('sala_id');
            $table->string('responsavel_cadastro', 80);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas_historico');
    }
};
