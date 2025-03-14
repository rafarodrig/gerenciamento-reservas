@foreach ($turmas as $turma)
    @if ($turma->id == $turma_atual)
        <option value="{{ $turma->id }}" selected="">{{ $turma->nome }}</option>
    @else
        <option value="{{ $turma->id }}">{{ $turma->nome . " - Sala  " . $turma->sala_numero }}</option>
    @endif
    
@endforeach