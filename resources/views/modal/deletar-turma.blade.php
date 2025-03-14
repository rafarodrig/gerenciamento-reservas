<div class="modal fade" id="modal-deletar-turma" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5">Deletar Turma</h1>
        </div>
        <form method="POST" id="form-deletar-turma" action="">
            @csrf
            <div class="modal-body"><span> Certeza que deseja deletar a turma? </span></div>
      
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Deletar</button>
                <button type="button" id="btn-del-cancelar" class="btn btn-secondary" data-bs-target=".modal-principal" data-bs-toggle="modal">Cancelar</button>
            </div>
        </form>
    </div>
  </div>
</div>