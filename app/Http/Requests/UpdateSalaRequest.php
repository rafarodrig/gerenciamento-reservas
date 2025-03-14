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
            "numero" => ["required","numeric"],
            "tipo" => ["required","min:3","max:255"],
            "unidade"=> ["required","numeric"],
            "lotacao"=> ["required","numeric"],
            "maquinas-qtd"=> ["required","numeric"],
            "maquinas-tipo"=> ["required","max:80"],
            "descricao" => ["nullable","max:255"]
        ];
    }
    public function attributes(): array
    {
        return [
            'descricao' => 'descrição',
            'lotacao' => 'lotação',
            'maquinas-tipo' => 'Tipo de máquinas',
            'maquinas-qtd' => 'N.º de máquinas',
        ];
    }

}
