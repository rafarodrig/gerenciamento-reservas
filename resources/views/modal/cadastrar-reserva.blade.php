<div class="modal fade modal-principal" id="modal-cadastrar-reserva" tabindex="-1" aria-labelledby="exampleModalLabel" >
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header" id="modal-header-cadastrar"><h1 class="modal-title fs-4">Cadastrar Reserva</h1></div>
        
        <div class="modal-body ">
          <div class="container p-0">
          
        <!-- DADOS SALA -->
        <div class="row row-cols-2">
          <div class="col">
            <div class="modal-dados" id="sala-dados"></div>
          </div>
          <!-- DADOS RESERVA -->
          <div class="col">
            <div class="modal-dados" id="reserva-dados"></div>
          </div>
        </div>

          <form method="POST" id="cadastrar-reserva" >@csrf</form>
            <input id="inp-cadastrar-sala" form="cadastrar-reserva" type="hidden" value="" name="sala">
          
                <div class="row row-cols-2 text-center ">

                  <div class="col">
                    
                  <!-- BTN TURMA CADASTRADA -->
                    <div class="form-btn-check row-btn-check">
                      <input type="radio" class="btn-check" form="cadastrar-reserva" id="btn-buscar-turma"  name="cadastro-turma" value="cadastrada" autocomplete="off" >
                      <label class="btn btn-outline-primary" for="btn-buscar-turma">Buscar Turma</label>
                    </div>

                    <div class="form-floating">
                      <select id="turma-cadastrada" form="cadastrar-reserva" class="form-select" disabled="" name="turma" aria-label="Floating label select example"  required>
                      </select>
                      <label for="turma-cadastrada">Turma</label>
                    </div>

                  </div>
                  
                  <div class="col">
                    <!-- BTN CADASTRAR TURMA -->
                    <div class="form-btn-check row-btn-check">
                      <input type="radio" class="btn-check" form="cadastrar-reserva"  id="btn-cadastro-turma" name="cadastro-turma" value="nova" autocomplete="off" checked>
                      <label class="btn btn-outline-primary" for="btn-cadastro-turma">Cadastrar Turma</label>
                    </div>
                    
                    <div class="form-floating ">
                      <input type="text" form="cadastrar-reserva"  class="form-control inp-cadastrar-turma" id="inp-cadastrar-nome" placeholder="Nome" name="nome" autocomplete="off" required>
                      <label for="inp-cadastrar-nome" class="form-label">Nome</label>
                      <div  class="invalid-feedback" id="error-cadastrar-nome"></div>
                    </div>

                  </div>

                </div>
                
                <div class="row row-cols-2">

                  <div class="col col-turma-dados" style="margin-top: 10px;">
                      <div class="turma-dados" id="turma-dados-cadastrar">

                     @include("container.form-turma")

                      </div>
                  </div>

                  <div class="col">
                    <!-- INPUT DOCENTE -->
                    <div class="form-floating ">
                      <input type="text" form="cadastrar-reserva"  class="form-control inp-cadastrar-turma" id="inp-cadastrar-docente" placeholder="Docente" name="docente" autocomplete="off" required>
                      <label for="inp-cadastrar-docente" class="form-label">Docente</label>
                      <div  class="invalid-feedback" id="error-cadastrar-docente"></div>
                    </div>
                    
                    <!-- INPUT CURSO -->
                    <div class="form-floating ">
                      <input type="text" form="cadastrar-reserva"  class="form-control inp-cadastrar-turma" id="inp-cadastrar-curso" placeholder="Curso" name="curso" autocomplete="off" required>
                      <label for="inp-cadastrar-curso" class="form-label">Curso</label>
                      <div  class="invalid-feedback" id="error-cadastrar-curso"></div>
                    </div>
                    
                    <!-- INPUT QUANTIDADE PARTICIPANTES -->
                    <div class="form-floating ">
                      <input type="number" form="cadastrar-reserva"  class="form-control inp-cadastrar-turma" id="inp-cadastrar-lotacao" placeholder="Lotação" name="lotacao" min="1" required>
                      <label for="inp-cadastrar-lotacao" class="form-label">Lotação</label>
                      <div  class="invalid-feedback" id="error-cadastrar-lotacao"></div>
                    </div>
                  </div>
                </div>
                
                <!-- INPUT RESPONSAVEL CADASTRO -->
                <div class="form-floating mt-3 ">
                  <input type="text" form="cadastrar-reserva"  class="form-control" id="inp-cadastrar-responsavel-cadastro" placeholder="Responsável Cadastro" name="responsavel-cadastro" autocomplete="off" required>
                  <label for="inp-cadastrar-responsavel-cadastro" class="form-label">Responsável Cadastro</label>
                  <div  class="invalid-feedback" id="error-cadastrar-responsavel-cadastro"></div>
                </div>
              </div>
      </div>
      
      <div class="modal-footer">
          <button type="submit" form="cadastrar-reserva" class="btn btn-primary " >Salvar</button>
          <button type="button"  class="btn btn-secondary btn-cancelar-reserva" >Cancelar</button>
      </div>
      </div>
    </div>
</div>

