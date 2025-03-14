<table class="table table-striped align-middle tabela-consulta">
    <a id="current_page" type="hidden" href="{{$reservas->url($reservas->currentPage())}}"></a>
    <br>
        @include('btn.unidades', ['unidade' => $unidade, 'unidades' => 2, 'url' => $url])
    
    <br>
    
    @if (!count($reservas))
        <span class='alerta-Tabela'>Nenhum resultado encontrado</span>
    @else
        <thead>
            <tr>
                <th scope="col">Sala</th>
                <th scope="col">Data</th>
                <th scope="col">Turno</th>
                <th scope="col">Tipo de reserva</th>
                <th scope="col">Turma</th>
                <th scope="col">Docente</th>
                <th scope="col">Lotação</th>
                <th scope="col">Ação</th>
            </tr>
        </thead>
    <tbody>
        @foreach ($reservas as $reserva)
            <tr>
                <td> {{$reserva->sala->numero . " - " . $reserva->sala->tipo }}</td>
                <td> {{$reserva->data->isoFormat("ddd - DD/MM/YY") }}</td>
                <td> {{$reserva->turma->turno }}</td> 
                <td> {{$reserva->turma->tipo }}</td>
                <td> {{$reserva->turma->nome }}</td>
                <td> {{$reserva->turma->docente }}</td> 
                <td> {{$reserva->turma->lotacao . "/" . $reserva->sala->lotacao }}</td>
                <td>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button type="button" class="btn-editar-reserva btn btn-primary" href="/reservas/{{$reserva->id}}">Editar</button>
                        <button type="button" class="btn-deletar-reserva btn btn-danger" href="/reservas/{{$reserva->id}}">Deletar</button>
                    </div>
                </td> 
            </tr>
        @endforeach
    </tbody>
    @endif
</table>
{{$reservas->links()}}