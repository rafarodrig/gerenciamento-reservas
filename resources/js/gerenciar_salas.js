
import * as app from './app'


//BTN CANCELAR FORM SALAS
$(document).on("reset","form", function (){
    $(this).find("input").removeClass('is-invalid')
    $(".modal").modal("hide")
})

// SUBMIT FORM CADASTRAR SALA =================================================================
//btn cadastrar => modal cadastrar
$(document).on("click","#btn-cadastrar-sala", function(){
    $("#modal-cadastrar-sala").modal("show")
})
//submit modal cadastrar => server
$(document).on("submit","#form-cadastrar-sala", function (e) {
    e.preventDefault()
    app.reqServidor("POST","/salas", $(this).serialize(), app.refreshTabela)
}) 


// EDITAR SALA ===================================================================

//btn editar GET sala dados => server 
$(document).on("click",".btn-editar-sala",function (e) {
    e.preventDefault() 
    app.reqServidor("GET",$(this).attr("href"), {}, modalEditarSalaDados)
});

// server sala dados => modal editar sala
function modalEditarSalaDados(sala){
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

// submit modal editar => server
$(document).on("submit","#form-editar-sala", function (e) {
    e.preventDefault()
    app.reqServidor("PATCH",$(this).attr("action"), $(this).serialize(), app.refreshTabela)
}) 


// DELETAR SALA =============================================================================
//btn deletar => modal deletar
$(document).on("click", ".btn-deletar-sala", function(e){
    e.preventDefault()
    $("#form-deletar-sala").attr("action",$(this).attr("href"))
    $("#modal-deletar-sala").modal("show")
})
// submit modal deletar => server
$(document).on("submit","#form-deletar-sala", function (e) {
    e.preventDefault()
    let form = $(this)
    app.reqServidor("DELETE", form.attr("action"),form.serialize(),app.refreshTabela)
})


//DADOS A SEREM INSERIDOS NO PDF
function pdfBody(dados){
    let body = [];
    for (const i in dados){
        //console.log(dados[i].id_sala + " " + dados[i].tipo_sala + " " + dados[i].lugares_qtd + " " + dados[i].maquinas_qtd + " " + dados[i].maquinas_tipo);
        body.push({
            numero_sala: dados[i].numero_sala,
            tipo: dados[i].tipo_sala,
            unidade: dados[i].unidade,
            lotacao: dados[i].lugares_qtd,
            nmaq: dados[i].maquinas_qtd,
            tmaq: dados[i].maquinas_tipo
        });
    }
    return body;
}



//GERAR PDF
function gerarPDF(){
    $.ajax({
        type: "GET",
        url: "/salas",
        dataType: "json",
        success: function (dadosJSON) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFontSize(24);
            let text = "Salas cadastradas";
            let textX = (doc.internal.pageSize.getWidth() - doc.getTextWidth(text))/2
            doc.text(text, textX, 20);
            doc.setFontSize(12);

            let head = [{numero_sala: 'Sala', tipo: 'Tipo', unidade: 'Unidade', lotacao: 'Lotação', nmaq: 'N.º Maquinas', tmaq: 'Maquinas tipo'}];
            let body = pdfBody(dadosJSON.salas);
            doc.autoTable({head: head, body: body, startY: 25});
            doc.save('Salas.pdf');
        }
    });       

}