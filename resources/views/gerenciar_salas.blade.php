<x-layout>
  @vite('resources/js/gerenciar_salas.js')
  <x-slot:title>Gerenciar Salas</x-slot>

  <div class="container-fluid m-auto mt-5 " id="container-tabela" style="visibility: visible">
    @include('table.salas', ['salas' => $salas, 'unidade' => $unidade, 'url' => $url])
  </div>

    @include('modal.cadastrar-sala')
    @include('modal.editar-sala')
    @include('modal.deletar-sala')
    @include('modal.alerta')
  
</x-layout>