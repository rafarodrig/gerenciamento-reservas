<div class="modal fade" id="modal-cadastrar-sala" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Cadastrar Sala</h1> 
        </div>
        <div class="modal-body">
          <form method="post" id="form-cadastrar-sala" >
            @csrf
              <div class="row">
                <div class="col">
                  <!-- INPUT NUMERO SALA-->
                  <div class="form-floating ">
                    <input type="number" class="form-control inp-cadastrar" id="inp-cadastrar-numero" placeholder="N.&#xba; Sala" name="numero" min="1" >
                    <label for="inp-cadastrar-numero" class="form-label">N.&#xba; Sala</label>
                    <div id="error-cadastrar-numero" class="invalid-feedback"></div>
                  </div>
                  <!-- INPUT UNIDADE -->
                  {{-- <div class="mt-3"> --}}
                    <label class="form-check-label d-block"> N.&#xba; unidade</label>
                     <div class="form-check form-check-inline">
                       <input class="form-check-input inp-cadastrar-unidade inp-cadastrar" id="inp-cadastrar-unidade-1" type="radio" name="unidade" id="inp-cadastrar-unidade-1" value="1" >
                       <label class="form-check-label" for="inp-cadastrar-unidade-1">1</label>
                      </div>
                      
                      <div class="form-check form-check-inline">
                        <input class="form-check-input inp-cadastrar-unidade inp-cadastrar" id="inp-cadastrar-unidade-2"type="radio" name="unidade" id="inp-cadastrar-unidade-2" value="2">
                        <label class="form-check-label" for="inp-cadastrar-unidade-2">2</label>
                      </div>
                      <div class="invalid-feedback" id="error-cadastrar-unidade"></div>
                  {{-- </div> --}}
  
                  <!-- INPUT TIPO -->
                  <div class="form-floating ">
                    <input type="text" class="form-control mt-3 inp-cadastrar" id="inp-cadastrar-tipo" placeholder="Tipo" name="tipo">
                    <label for="inp-cadastrar-tipo" class="form-label">Tipo</label>
                    <div class="invalid-feedback" id="error-cadastrar-tipo"></div>
                  </div>
  
                  <!-- INPUT NUMERO MAQUINAS -->
                  <div class="form-floating ">
                    <input type="number" class="form-control mt-3 inp-cadastrar" id="inp-cadastrar-maquinas-qtd" placeholder="N.&#xba; de máquinas" name="maquinas-qtd" min="1" >
                    <label for="inp-cadastrar-maquinas-qtd" class="form-label">N.&#xba; de máquinas</label>
                    <div class="invalid-feedback" id="error-cadastrar-maquinas-qtd"></div>
                  </div>
  
                  <!-- INPUT MAQUINAS TIPO -->
                  <div class="form-floating ">
                    <input type="text" class="form-control mt-3 inp-cadastrar" id="inp-cadastrar-maquinas-tipo" placeholder="Tipo de maquinas" name="maquinas-tipo" min="1" >
                    <label for="inp-cadastrar-maquinas-tipo" class="form-label">Tipo de máquinas</label>
                    <div class="invalid-feedback" id="error-cadastrar-maquinas-tipo"></div>
                  </div>
  
                  <!-- INPUT LOTAÇÃO -->
                  <div class="form-floating ">
                    <input type="number" class="form-control mt-3 inp-cadastrar" id="inp-cadastrar-lotacao" placeholder="Lotação" name="lotacao" min="1"  >
                    <label for="inp-cadastrar-lotacao" class="form-label">Lotação</label>
                    <div class="invalid-feedback" id="error-cadastrar-lotacao"></div>
                  </div>
  
                
                  <!-- INPUT DESCRICAO -->
                  <div class="form-floating ">
                      <textarea class="form-control mt-3 inp-cadastrar" id="inp-cadastrar-descricao" style="height: 150px"  placeholder="Descrição" name="descricao"></textarea>
                      <label for="inp-cadastrar-descricao" class="form-label">Descrição</label>
                      <div class="invalid-feedback" id="error-cadastrar-descricao"></div>
                  </div>
              </div>
            </div>
          </form>

        </div>
        <div class="modal-footer">
            <button type="submit" form="form-cadastrar-sala" class="btn btn-primary" id="btn-salvar-cadastrar">Salvar</button>
            <button type="reset" form="form-cadastrar-sala" class="btn btn-secondary btn-cancelar-form"  >Cancelar</button>
        </div>
        
        </div>
      </div>
  </div>