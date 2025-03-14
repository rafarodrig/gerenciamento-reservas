<table class="table table-striped align-middle tabela-consulta">
    <a id="current_page" type="hidden" href="{{$salas->url($salas->currentPage())}}"></a>
    <br>
    <div class="d-flex justify-content-between">
        @include('btn.unidades', ['unidade' => $unidade, 'unidades' => 2, 'url' => $url])
        <button class=" btn btn-primary" id="btn-cadastrar-sala" >Cadastrar</button>
    </div>
    <br>
    @if (!count($salas))
        <span class='alerta-Tabela'>Nenhuma sala cadastrada da unidade {{ $unidade }}</span>
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
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button class="btn btn-primary btn-editar-sala" href="/salas/{{$sala->id}}" >Editar</button>
                        <button class="btn btn-danger btn-deletar-sala" href="/salas/{{$sala->id}}" >Deletar</button>
                    </div>
                </td>
            </tr>
        @endforeach
    </tbody>
    @endif
</table>
{{$salas->links()}}


    {{-- <div style="margin-bottom: 20px;">'
        <button type="button" onclick="gerarPDF()" class="btn btn-primary btn-reservar">Gerar PDF</button>
    </div> --}}