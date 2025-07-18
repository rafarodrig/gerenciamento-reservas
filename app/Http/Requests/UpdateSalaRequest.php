<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSalaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    // public function authorize(): bool
    // {
    //     return false;
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "numero" => ["required", "numeric"],
            "tipo_sala_id" => ["required", "numeric", "exists:tipos_sala,id"],
            "unidade" => ["required", "numeric"],
            "lotacao" => ["required", "numeric"],

            "maquinas_qtd" => [
                "nullable",
                "numeric",
                "required_with:tipo_maquina_id"
            ],
            "tipo_maquina_id" => [
                "nullable",
                "numeric",
                "exists:tipos_maquina,id",
                "required_with:maquinas_qtd"
            ],

            "descricao" => ["nullable", "max:255"],
        ];
    }


    public function attributes(): array
    {
        return [
            'numero' => 'número da sala',
            'tipo_sala_id' => 'tipo de sala',
            'unidade' => 'unidade',
            'lotacao' => 'lotação',
            'maquinas_qtd' => 'n.º de máquinas',
            'tipo_maquina_id' => 'tipo de máquinas',
            'descricao' => 'descrição',
        ];
    }
}
