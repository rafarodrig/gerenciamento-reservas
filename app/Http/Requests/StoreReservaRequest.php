<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\BaseRequest as BaseRequest;
class StoreReservaRequest extends BaseRequest
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
        "turma" => "nullable|exists:turmas,id",
        "sala" => "required|exists:salas,id",
        "responsavel_cadastro" => "required|string|max:255",

        // Se turma NÃO for enviada, esses campos são obrigatórios
        "nome" => "required_if:turma,null|string|max:255",
        "curso" => "required_if:turma,null|string|max:255",
        "turno" => "required_if:turma,null|string|max:255",
        "docente" => "required_if:turma,null|string|max:255",
        "reserva_tipo" => "required_if:turma,null|string|max:255",
        "lotacao" => "required_if:turma,null|numeric|min:1",
    ];
}

}
