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
        Schema::create('turmas', function (Blueprint $table) {
            $table->id(); // Equivalent to int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT
            $table->string('nome', 80);
            $table->string('curso', 80);
            $table->string('docente', 50);
            $table->string('turno', 10);
            $table->string('tipo', 20);
            $table->integer('lotacao');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('turmas');
    }
};
