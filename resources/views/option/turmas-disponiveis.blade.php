
@if (!empty($disponiveis))
    <option value="" selected="">Selecione uma turma</option>

    @foreach ($disponiveis as $turma)
        <option value="{{ $turma["id"] }}">{{ $turma["nome"] }}</option>
    @endforeach 
    
    @else 
    <option value="" @selected(true)>Nenhuma turma disponível</option>
    @endif
    
@foreach ($indisponiveis as $turma)
    <option @disabled(true)>  {{ $turma["nome"] }} - indisponivel</option>
@endforeach 
    
