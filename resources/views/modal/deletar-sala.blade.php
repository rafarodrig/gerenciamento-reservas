<div class="modal fade" id="modal-deletar-sala" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5">Deletar Sala</h1>
        </div>
          <form method="post" id="form-deletar-sala" action="">
            @csrf
            <div class="modal-body" id="msg-del-turma">
              Certeza que deseja deletar a sala?</div>
            
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary" >Confirmar</button>
                <button type="reset" class="btn btn-secondary">Cancelar</button>
            </div>
          </form>
    </div>
  </div>
</div>