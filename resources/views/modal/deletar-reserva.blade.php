<div class="modal fade" id="modal-deletar-reserva" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Deletar Reserva</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="form-deletar-reserva" action="">
        @csrf
        <div class="modal-body">
          <div class="form-check">
            <input class="form-check-input" id="radio-del-atual" type="radio" name="del-reservas" value="atual" checked>
            <label class="form-check-label" for="flexRadioDefault1">Deletar registro atual</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" id="radio-del-todos" type="radio" name="del-reservas" value="todos" >
            <label class="form-check-label" for="flexRadioDefault2">Deletar todos os registros</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" id="radio-del-apartir" type="radio" name="del-reservas" value="apartir"  >
            <label class="form-check-label" for="flexRadioDefault2">Deletar os registros a partir do atual</label>
          </div>
        </div>
        <div class="modal-footer">
          <button  type="submit" class="btn btn-primary" data-bs-dismiss="modal">Deletar</button>
          <button  type="reset" id="btn-del-cancelar" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</div>