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
            $table->string('tipo', 45);
            $table->integer('lotacao'); 
            $table->integer('maquinas_qtd')->nullable(); // Nullable
            $table->string('maquinas_tipo', 45)->nullable(); // Nullable string with a max length of 45
            $table->integer('unidade'); // Not null
            $table->text('descricao')->nullable(); // Nullable text
            $table->softDeletes();
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
