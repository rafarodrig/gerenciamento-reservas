<x-layout>
  
  <x-slot:title>
    {{ $pagina_titulo }}
  </x-slot>
  
  @vite('resources/js/consultar_reservas.js')

<!-- BOX FILTROS -->
<nav>
  <form class="row g-3 form-consulta m-auto mt-5 " id="form-consultar-reservas" method="get">
    
    <div class="mt-0 fs-3 d-flex justify-content justify-content-between">
      <h1 class="h3">{{ $pagina_titulo }}</h1>
      <h1 class="h3">{{ $dataAtualFormatada }}</h1>
    </div>
    <!-- FILTRO turma -->
    <div class="col-md-6">
      <label for="inp-consulta-turma" class="form-label">Turma</label>
      <input type="text" class="form-control" id="inp-consulta-turma" name="turma">
    </div>
    
    <!-- FILTRO DOCENTE -->
    <div class="col-md-6">
      <label for="inp-consulta-docente" class="form-label">Docente</label>
      <input type="text" class="form-control" id="inp-consulta-docente" name="docente">
    </div>
    
    <!-- FILTRO CURSO -->
    <div class="col-md-3">
      <label for="inp-consulta-curso" class="form-label">Curso</label>
      <input type="text" class="form-control" id="inp-consulta-curso" name="curso">
    </div>
    
    <!-- FILTRO DATA INICIO -->
    <div class="col-md-3">
      <label for="inp-consulta-data-inicio" class="form-label">De</label>
      <input type="date" class="form-control inp-data" id="inp-consulta-data-inicio" name="data-inicio" value="{{ $dataAtual }}">
    </div>
    
    <!-- FILTRO DATA FIM -->
    <div class="col-md-3">
      <label for="inp-consulta-data-fim" class="form-label">Até</label>
      <input type="date" class="form-control inp-data" id="inp-consulta-data-fim" name="data-fim" value="">
      <div  class="invalid-feedback">
        A data final não pode ser maior que a data inicial
      </div>
    </div>
    
    <!-- FILTRO SALA -->
    <div class="col-md-3">
      <label for="inp-consulta-sala" class="form-label"> N.&#xba; da sala</label>
      <select id="inp-consulta-sala" class="form-select" name="sala">
        <option value="" selected="">Qualquer</option>
        @include("options",['dados'=> $numeros])
      </select>
    </div>
    
    <!-- FILTRO TURNO -->
    <div class="col-md-3">
      <label for="inp-consulta-turno" class="form-label">Turno</label>
      <select id="inp-consulta-turno" class="form-select" name="turno">
        <option value="" selected="">Qualquer</option>
        <option value="Manhã">Manhã</option>
        <option value="Tarde">Tarde</option>
        <option value="Noite">Noite</option>
      </select>
    </div>
    
    <!-- FILTRO TIPO DE RESERVA -->
    <div class="col-md-3">
      <label for="inp-consulta-reserva-tipo" class="form-label">Tipo de reserva</label>
      <select id="inp-consulta-reserva-tipo" class="form-select" name="tipo-reserva">
        <option selected="" value="">Qualquer</option>
        <option value="Avulsa">Avulsa</option>
        <option value="Graduação">Graduação</option>
        <option value="Pos-graducao" >Pós-graduação</option>
        <option value="FIC" >FIC</option>
      </select>
    </div>
    
    <!-- RESERVA STATUS -->
    
    <div class="col-md-3">
      <label for="inp-reserva-status" class="form-label">Reservas status</label>
      <select id="inp-reserva-status" class="form-select" name="reserva-status">
        <option value="Ativa" selected="">Ativa</option>
        <option value="Inativa" >Inativa</option>
      </select>
    </div>
    
    <!-- BOTAO BUSCAR -->
    <div class="col-12" style="display: flex; align-items: center; gap:10px;">
      <button type="submit" class="btn btn-primary btn-buscar" value="consultar-reservas" id="btn-buscar">Buscar</button>
    </div>
  </form>
</nav>
  @include("modal.editar-reserva")
  @include("modal.deletar-reserva")
  @include("modal.deletar-turma")
  @include("modal.alerta")
  
  <div class="container-fluid my-4 " id="container-tabela"></div>
  
</x-layout>