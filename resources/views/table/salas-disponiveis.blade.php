<table class="table table-striped align-middle tabela-consulta">
    <a id="current_page" type="hidden" href="{{$salas->url($salas->currentPage())}}"></a> 
        @include('btn.unidades', ['unidade' => $unidade, 'unidades' => 2, 'url' => $url])  
    <br>
    @if (!count($salas))
        <span class='alerta-Tabela'>Nenhuma sala disponivel{{ $unidade }}</span>
    @else 
    <thead>
        <tr>
            <th scope="col">Sala</th>
            <th scope="col">Tipo</th>
            <th scope="col">Lotação</th>
            <th scope="col">N.&#xba; maquinas</th>
            <th scope="col">Maquinas tipo</th>
            <th scope="col">Ação</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($salas as $sala)
        
        <tr>
            <td> {{ $sala->numero }} </td>
            <td> {{ $sala->tipo }}</td>
            <td> {{ $sala->lotacao }}</td>
            <td> {{ $sala->maquinas_qtd }}</td>
            <td> {{ $sala->maquinas_tipo }}</td>
            <td>
                <button type="button" class="btn btn-primary btn-reservar" value="{{ $sala->id }}" >Reservar</button>
            </td>
        </tr>
        @endforeach
    </tbody>
        
    @endif
</table>
{{$salas->links()}}