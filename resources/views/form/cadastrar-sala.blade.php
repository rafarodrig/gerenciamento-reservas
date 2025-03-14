<form method="post" id="form-cadastrar-sala" >
    @csrf
      <div class="row">
        <div class="col">
          <!-- INPUT NUMERO SALA-->
          <div class="form-floating ">
            <input type="number" class="form-control inp-numero inp-cadastrar" id="inp-cadastrar-numero" placeholder="N.&#xba; Sala" name="numero" min="1" >
            <label for="inp-cadastrar-numero" class="form-label">N.&#xba; Sala</label>
            <div id="inp-error-numero" class="invalid-feedback"></div>
          </div>
          <!-- INPUT UNIDADE -->
          {{-- <div class="mt-3"> --}}
            <label class="form-check-label d-block"> N.&#xba; unidade</label>
             <div class="form-check form-check-inline">
               <input class="form-check-input inp-unidade inp-cadastrar"  id="inp-cadastrar-unidade-1" type="radio" name="unidade" id="inp-cadastrar-unidade-1" value="1" >
               <label class="form-check-label" for="inp-cadastrar-unidade-1">1</label>
              </div>
              
              <div class="form-check form-check-inline">
                <input class="form-check-input inp-unidade inp-cadastrar" id="inp-cadastrar-unidade-2"type="radio" name="unidade" id="inp-cadastrar-unidade-2" value="2">
                <label class="form-check-label" for="inp-cadastrar-unidade-2">2</label>
              </div>
              <div class="invalid-feedback " id="inp-error-unidade"></div>
          {{-- </div> --}}

          <!-- INPUT TIPO -->
          <div class="form-floating ">
            <input type="text" class="form-control mt-3 inp-tipo inp-cadastrar" id="inp-cadastrar-tipo" placeholder="Tipo" name="tipo">
            <label for="inp-cadastrar-tipo" class="form-label">Tipo</label>
            <div id="inp-error-tipo" class="invalid-feedback"></div>
          </div>

          <!-- INPUT NUMERO MAQUINAS -->
          <div class="form-floating ">
            <input type="number" class="form-control inp-maquinas-qtd mt-3 inp-cadastrar" id="inp-cadastrar-maquinas-qtd" placeholder="N.&#xba; de máquinas" name="maquinas-qtd" min="1" >
            <label for="inp-cadastrar-maquinas-qtd" class="form-label">N.&#xba; de máquinas</label>
            <div id="inp-error-maquinas-qtd" class="invalid-feedback"></div>
          </div>

          <!-- INPUT MAQUINAS TIPO -->
          <div class="form-floating ">
            <input type="text" class="form-control inp-maquinas-tipo mt-3 inp-cadastrar" id="inp-cadastrar-maquinas-tipo" placeholder="Tipo de maquinas" name="maquinas-tipo" min="1" >
            <label for="inp-cadastrar-maquinas-tipo" class="form-label">Tipo de máquinas</label>
            <div id="inp-error-maquinas-tipo" class="invalid-feedback"></div>
          </div>

          <!-- INPUT LOTAÇÃO -->
          <div class="form-floating ">
            <input type="number" class="form-control mt-3 inp-lotacao inp-cadastrar" id="inp-cadastrar-lotacao" placeholder="Lotação" name="lotacao" min="1"  >
            <label for="inp-cadastrar-lotacao" class="form-label">Lotação</label>
            <div id="inp-error-lotacao" class="invalid-feedback"></div>
          </div>

        
          <!-- INPUT DESCRICAO -->
          <div class="form-floating ">
              <textarea class="form-control inp-descricao mt-3 inp-cadastrar" id="inp-cadastrar-descricao" style="height: 150px"  placeholder="Descrição" name="descricao"></textarea>
              <label for="inp-cadastrar-descricao" class="form-label">Descrição</label>
              <div id="inp-error-descricao" class="invalid-feedback"></div>
          </div>
      </div>
    </div>
  </form>