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
            "responsavel-cadastro" => "required|string|max:255",
            "nome" => "exclude_if:turma,required|string|max:255",
            "curso" => "exclude_if:turma,required|string|max:255",
            "turno" => "exclude_if:turma,required|string|max:255",
            "tipo-reserva" => "exclude_if:turma,required|string|max:255",
            "lotacao" => "exclude_if:turma,required|numeric",
        ];
    }
}
