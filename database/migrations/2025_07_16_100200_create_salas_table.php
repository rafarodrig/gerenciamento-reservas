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
        Schema::create('salas', function (Blueprint $table) {
            $table->id(); // Primary key with auto-increment
            $table->integer('numero'); // Not null
            $table->foreignId('tipo_sala_id')->nullable()->constrained('tipos_sala')->nullOnDelete();
            $table->integer('lotacao');
            $table->integer('maquinas_qtd')->nullable(); // Nullable
            $table->foreignId('tipo_maquina_id')->nullable()->constrained('tipos_maquina')->nullOnDelete();
            $table->integer('unidade'); // Not null
            $table->text('descricao')->nullable(); // Nullable text
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salas');
    }
};
