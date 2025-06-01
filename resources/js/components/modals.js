import { reqServidor } from "../utils/http"

// MOSTRADORES DE DADOS ===================================================================================
export function editTurma(turma){
    $("#form-editar-turma, #form-deletar-turma").attr("action","/turmas/" + turma.id)
    $("#inp-editar-nome").val(turma.nome)
    $("#inp-editar-docente").val(turma.docente)
    $("#inp-editar-curso").val(turma.curso)
    $("#inp-editar-lotacao").val(turma.lotacao)

}

export function showOptionsTurmas(res){
    $("#turma-cadastrada").html(res)
}

export function showSala(sala){    
    let dados = '<h6>'+ sala.numero+ ' - '+ sala.tipo + '</h6>'
    dados +='<h6>'+ sala.lotacao +' lugares</h6>'
    dados +='<h6> '+ sala.maquinas_qtd +' maquinas ('+ sala.maquinas_tipo + ')</h6>'
    $("#sala-dados").html(dados)
}

export function showReserva(datas,tipo,turno){
    let dados = '<h6>' + datas +'</h6>'
    dados += '<h6>' + tipo + '</h6>'
    dados += '<h6>' + turno + '</h6>'
    $("#reserva-dados").html(dados)
}


// server sala dados => modal editar sala
export function editSala(sala){
    if(sala.unidade == 1){
        $("#inp-editar-unidade-1").prop("checked", true)
    } else {
        $("#inp-editar-unidade-2").prop("checked", true)
    }

    $("#inp-editar-numero").val(sala.numero)
    $("#inp-editar-tipo").val(sala.tipo)
    $("#inp-editar-maquinas-qtd").val(sala.maquinas_qtd)
    $("#inp-editar-maquinas-tipo").val(sala.maquinas_tipo)
    $("#inp-editar-lotacao").val(sala.lotacao)
    $("#inp-editar-descricao").val(sala.descricao)
    $("#form-editar-sala").attr("action","/salas/"+sala.id)

    $("#modal-editar-sala").modal("show")
}

// MODAL CADASTRAR/EDITAR RESERVA: CONTAINER INFORMACOES TURMA
$(document).on('change','#turma-cadastrada', function(e){
    const turma_id = $(this).val()
    if(!turma_id){
        resetSelectTurma()
    } else {
        reqServidor("GET",'/turmas/'+ turma_id,{}, editTurma)
    }
    stateBtnTurmaDados()
})

export function stateBtnTurmaDados(){
    let turmaDados = $(".btn-turma-dados")

    if(!$("#turma-cadastrada").val()){
        turmaDados.prop("disabled",true)
    } else {
        turmaDados.prop("disabled",false)
    }
}

export function resetSelectTurma(){
    $("#turma-cadastrada, .inp-turma-dados, #btn-deletar-turma").val("")
    $(".btn-turma-dados").prop("disabled",true)
    $("#form-editar-turma").attr("action","")
}