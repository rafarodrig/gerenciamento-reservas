<x-layout>
  <x-slot:title>
    {{ $pagina_titulo }}
  </x-slot>
  @vite(['resources/js/cadastrar_reservas.js','resources/css/cadastrar_reservas.css'])
    <!-- BOX FILTROS -->
<form class="row g-3 form-consulta m-auto mt-5 " id="form-consultar-salas"  method="get">
  
<div style="display: flex; font-size: 1.8rem; justify-content: space-between; margin-top:0;">
      <h2>{{ $pagina_titulo }}</h2>
      <h2>{{ $dataAtualFormatada }}</h2>
    </div>

<!-- FILTRO DATA INICIO -->
<div class=" col-md-3">
  <label for="inp-consulta-data-inicio" class="form-label">De</label>
  <input type="date" class="form-control inp-data" id="inp-consulta-data-inicio" min="{{ $dataAtual }}" value="{{ $dataAtual }}" name="data-inicio" required>
</div>


<!-- FILTRO DATA FINAL -->
<div class="col-md-3">
  <label for="inp-consulta-data-fim" class="form-label">Até</label>
  <input type="date" class="form-control inp-data" id="inp-consulta-data-fim" min="{{ $dataAtual }}" name="data-fim" disabled required>
<div class="invalid-feedback">
    A data final não pode ser maior que a data inicial
  </div>
</div>

<!-- NUM ENCONTROS -->
<div class="col-md-3">
<label for="inp-semanas" class="form-label">N.&#xba; de Semanas</label>
<input type="number" class="form-control" id="inp-semanas" min="1" name="semanas" disabled required>
</div>
<div class="col-md-3">
  <label for="inp-semanas" class="form-label">Dias da Semana</label>
  <div class="d-flex" style=" flex-wrap: wrap; align-items:center; column-gap:6px;">
        <div class="form-check ">
          <input class="form-check-input inp-dia-semana" type="checkbox" name="dias-semana[]" value="1" id="inp-segunda" disabled>
          <label class="form-check-label" for="inp-segunda">Seg</label>
        </div>
        <div class="form-check ">
          <input class="form-check-input inp-dia-semana" type="checkbox" name="dias-semana[]" value="2" id="inp-terca" checked disabled>
          <label class="form-check-label" for="inp-terca">Ter</label>
        </div>
        <div class="form-check ">
          <input class="form-check-input inp-dia-semana" type="checkbox" name="dias-semana[]" value="3" id="inp-quarta" disabled>
          <label class="form-check-label" for="inp-quarta">Qua</label>
        </div>
        <div class="form-check ">
          <input class="form-check-input inp-dia-semana" type="checkbox" name="dias-semana[]" value="4" id="inp-quinta"checked disabled>
          <label class="form-check-label" for="inp-quinta">Qui</label>
        </div>
        <div class="form-check ">
          <input class="form-check-input inp-dia-semana" type="checkbox" name="dias-semana[]" value="5" id="inp-sexta" disabled>
          <label class="form-check-label" for="inp-sexta">Sex</label>
        </div>
        <div class="form-check ">
          <input class="form-check-input inp-dia-semana" type="checkbox" name="dias-semana[]" value="6" id="inp-sabado" disabled>
          <label class="form-check-label" for="inp-sabado">Sáb</label>
        </div>
        <div class="form-check ">
          <input class="form-check-input inp-dia-semana" type="checkbox" name="dias-semana[]" value="0" id="inp-domingo" disabled>
          <label class="form-check-label" for="inp-domingo">Dom</label>
        </div>
    </div>
  </div>

<!-- FILTRO TIPO DE RESERVA -->
<div class="col-md-3">
<label for="inp-consulta-reserva-tipo" class="form-label">Tipo de Reserva</label>
<select id="inp-consulta-reserva-tipo" class="form-select" name="tipo-reserva">
  <option value="Avulsa">Avulsa</option>
  <option value="Graduação">Graduação</option>
  <option value="Pos-graduacao" >Pós-graduação</option>
  <option value="FIC" >FIC</option>
</select>
</div>

<!-- FILTRO TURNO -->
<div class="col-md-3">
<label for="inp-consulta-turno" class="form-label">Turno</label>
<select id="inp-consulta-turno" class="form-select" name="turno">
  <option value="Manhã" >Manhã</option>
  <option value="Tarde" >Tarde</option>
  <option value="Noite" >Noite</option>
</select>
</div>

<!-- FILTRO NUMERO SALA -->
<div class="col-md-3">
<label for="inp-consulta-sala" class="form-label">N.&#xba; da Sala</label>
<select id="inp-consulta-sala" class="form-select" name="numero">
  <option value="" selected="">Qualquer</option>
  @include("options",['dados'=> $numeros])
</select>
</div>

<!-- FILTRO TIPO DE SALA -->
<div class="col-md-3">
<label for="inp-consulta-sala-tipo" class="form-label">Tipo de Sala</label>
<select id="inp-consulta-sala-tipo" class="form-select" name="tipo">
  <option value="" selected="">Qualquer</option>
  @include("options",['dados'=> $tipos])
</select>
</div>

<!-- FILTRO QUANTIDADE LUGARES -->
<div class="col-md-3">
<label for="inp-consulta-lotacao" class="form-label" >Lotação</label>
<input type="number" id="inp-consulta-lotacao" class="form-control" min="1" placeholder="Qualquer" name="lotacao">
</div>

<!-- FILTRO QUANTIDADE MAQUINAS -->
<div class="col-md-3">
<label for="inp-consulta-maquinas-qtd" class="form-label" >N.&#xba; de Máquinas</label>
<input type="number" id="inp-consulta-maquinas-qtd" class="form-control" min="0" placeholder="Qualquer" name="maquinas-qtd">
</div>

<!-- FILTRO MAQUINA TIPO --> 

<div class="col-md-3">
<label for="inp-consulta-maquinas-tipo" class="form-label">Tipo de Máquinas</label>
<select id="inp-consulta-maquinas-tipo" class="form-select" name="maquinas-tipo">
  <option value="" selected="">Qualquer</option>
  @include("options",['dados'=> $maquinas_tipos])
</select>
</div>


<!-- BOTAO BUSCAR -->
<div class="col-12" style="display: flex; align-items: center; gap:10px;">
<button type="submit" class="btn btn-primary btn-buscar" id="btn-buscar-sala-disponivel" >Buscar</button>
</div>
</form>

@include('modal.cadastrar-reserva')
@include('modal.deletar-turma')
@include('modal.alerta')
  
  <div class="container-fluid mt-4" style="padding: 10px;" id="container-filtros">
    <form id="form-badge-filtros" method="get"></form>
      <div class='collapse d-inline-flex flex-wrap' id='tabDatas'></div>
     
  </div>
  
  <div class="container-fluid my-4 " style="padding: 20px;"  id="container-tabela"></div>
    
</x-layout>