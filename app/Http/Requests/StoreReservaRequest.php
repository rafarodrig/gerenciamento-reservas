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
    public function messages(): array
    {
        return [
            'turma.exists' => 'A turma selecionada não foi encontrada.',
            'sala.required' => 'A sala é obrigatória.',
            'sala.exists' => 'A sala selecionada não foi encontrada.',
            'responsavel_cadastro.required' => 'O responsável pelo cadastro é obrigatório.',
            'responsavel_cadastro.max' => 'O nome do responsável não pode ultrapassar 255 caracteres.',

            'nome.required_if' => 'O nome da turma é obrigatório.',
            'nome.max' => 'O nome da turma não pode ultrapassar 255 caracteres.',

            'curso.required_if' => 'O curso é obrigatório.',
            'curso.max' => 'O nome do curso não pode ultrapassar 255 caracteres.',

            'turno.required_if' => 'O turno é obrigatório.',
            'turno.max' => 'O turno não pode ultrapassar 255 caracteres.',

            'docente.required_if' => 'O nome do docente é obrigatório.',
            'docente.max' => 'O nome do docente não pode ultrapassar 255 caracteres.',

            'reserva_tipo.required_if' => 'O tipo de reserva é obrigatório.',
            'reserva_tipo.max' => 'O tipo de reserva não pode ultrapassar 255 caracteres.',

            'lotacao.required_if' => 'A lotação é obrigatória.',
            'lotacao.numeric' => 'A lotação deve ser um número.',
            'lotacao.min' => 'A lotação mínima é 1.',
        ];
    }
}
