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
        Schema::create('reservas', function (Blueprint $table) {
            $table->id(); // Primary key with auto-increment
            $table->date('data');
            $table->unsignedInteger('sala_id');
            $table->unsignedInteger('turma_id');
            $table->text('observacoes')->nullable();
            $table->string('responsavel_cadastro', 80);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
