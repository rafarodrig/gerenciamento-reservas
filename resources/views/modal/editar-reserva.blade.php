<div class="modal fade modal-principal" id="modal-editar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header" id="modal-header-editar">
        <h1 class="modal-title fs-4">Editar Reserva</h1> 
      </div>
      
      <div class="modal-body">
        
        <!-- DADOS SALA -->
        <div class="row row-cols-2" style="margin-bottom: 10px;" >
          <div class="col">
            <div class="modal-dados" id="sala-dados"></div>
          </div>
          <!-- DADOS RESERVA -->
          <div class="col">
            <div class="modal-dados" id="reserva-dados"></div>
          </div>
        </div>

        <form method="POST" id="form-editar-reserva" action="">@csrf</form>
          
            <div class="row text-center">
              <div class="col">
                <div class="form-floating" style="margin-bottom: 10px;">
                  <input type="text" form="form-editar-reserva"  class="form-control" id="inp-responsavel-cadastro" placeholder="Responsável Cadastro" name="responsavel-cadastro" autocomplete="off">
                  <label for="inp-responsavel-cadastro" class="form-label">Responsável Cadastro</label>
                </div>
                <div class="form-floating">
                  <select form="form-editar-reserva" id="turma-cadastrada" class="form-select" name="turma" aria-label="Floating label select example"  required>
                  </select>
                  <label for="turma-cadastrada">Turma</label>
                </div>

                <!-- BOX DE DADOS TURMA -->
                <div class="turma-dados" id="turmas-dados-editar">

                  @include('container.form-turma')

                </div>
              </div>
            </div>
      </div>

      <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="btn-salvar-editar" data-bs-target="#modal-editar-reserva" data-bs-toggle="modal" >Salvar</button>
          <button type="button" class="btn btn-secondary btn-cancelar-modal-principal" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </div>
   </div>
</div>

<!-- MODAL EDITAR RESERVAS -->

<div class="modal fade" id="modal-editar-reserva" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Editar Reserva</h1>
      </div>
        @csrf
        <div class="modal-body">
          <div class="form-check">
            <input class="form-check-input" form="form-editar-reserva" id="radio-edit-atual" type="radio" name="editar-reserva" value="atual" checked>
            <label class="form-check-label" for="radio-edit-atual">Editar registro atual</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" form="form-editar-reserva" id="radio-edit-todos" type="radio" name="editar-reserva" value="todos">
            <label class="form-check-label" for="radio-edit-todos">Editar todos os registros</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" form="form-editar-reserva" id="radio-edit-apartir" type="radio" name="editar-reserva" value="apartir">
            <label class="form-check-label" for="radio-edit-apartir">Editar os registros a partir do atual</label>
          </div>
        </div>
        <div class="modal-footer">
          <button  type="submit" form="form-editar-reserva" class="btn btn-primary" data-bs-dismiss="modal">Editar</button>
          <button  type="reset" form="form-editar-reserva" class="btn btn-secondary" data-bs-target="#modal-editar" data-bs-toggle="modal" >Cancelar</button>
        </div>
    </div>
  </div>
</div>