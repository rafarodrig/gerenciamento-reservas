<form id="form-editar-turma" action="">
    @csrf
    <div class="input-group-turma">
        <!-- INPUT NOME TURMA -->
        <div class="input-group">
            <span class="input-group-text" >Nome</span>
            <input type="text" class="form-control inp-turma-dados" id="inp-editar-nome" placeholder="Nome" name="nome" value="" >
            <div  class="invalid-feedback" id="error-editar-nome"></div>
        </div>
        <!-- INPUT DOCENTE -->
        <div class="input-group">
            <span class="input-group-text" >Curso</span>
            <input type="text" class="form-control inp-turma-dados" id="inp-editar-docente"  placeholder="Docente" name="docente" value="" >
            <div  class="invalid-feedback" id="error-editar-docente"></div>
        </div>
        <!-- INPUT CURSO -->
        <div class="input-group">
            <span class="input-group-text" >Docente</span>
            <input type="text" class="form-control inp-turma-dados" id="inp-editar-curso" placeholder="Curso" name="curso" value="" >
            <div  class="invalid-feedback" id="error-editar-curso"></div>
        </div>
        <!-- INPUT LOTACAO -->
        <div class="input-group">
            <span class="input-group-text">Lotação</span>
            <input type="number" class="form-control inp-turma-dados" id="inp-editar-lotacao" placeholder="Lotação" name="lotacao" min="1" value="" >
            <div  class="invalid-feedback" id="error-editar-lotacao"></div>
        </div>

    <div class="btn-group" role="group" >
        <button type='submit' class='btn btn-sm btn-outline-primary btn-turma-dados'>Editar</button>
        <button type='button' class='btn btn-sm btn-outline-danger btn-turma-dados' data-bs-toggle="modal" data-bs-target="#modal-deletar-turma">Deletar</button>
    </div>
</div>
    
</form>