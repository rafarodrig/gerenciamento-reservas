<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\BaseRequest as BaseRequest;

class StoreSalaRequest extends BaseRequest
{
    protected $errorBag = "cadastrar";

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    public function rules(): array
    {
        return [
            "numero" => [
                "required",
                "numeric",
                "min:1",
                Rule::unique('salas')->where(function ($query) {
                    return $query
                        ->where('unidade', $this->unidade)
                        ->whereNull('deleted_at'); // Ignora soft deletes
                }),
            ],
            "tipo_sala_id" => ["required", "numeric", "exists:tipos_sala,id"],
            "unidade" => ["required", "numeric", "in:1,2"],
            "lotacao" => ["required", "numeric", "min:1"],

            "maquinas_qtd" => [
                "nullable",
                "numeric",
                "min:1", // precisa ser maior que zero
                "required_with:tipo_maquina_id",
            ],
            "tipo_maquina_id" => [
                "nullable",
                "numeric",
                "exists:tipos_maquina,id",
                "required_with:maquinas_qtd",
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
            'maquinas_qtd.required_with' => 'Informe a quantidade de máquinas quando um tipo for selecionado.',
            'maquinas_qtd.min' => 'A quantidade de máquinas deve ser no mínimo 1.',
            'tipo_maquina_id.required_with' => 'Selecione o tipo de máquina se a quantidade for informada.',
        ];
    }
}
