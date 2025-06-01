import * as app from './app'
import { reqServidor } from './utils/http';
import * as tabela from './components/tables';
import * as modal from './components/modals';


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
    reqServidor("POST","/salas", $(this).serialize(), tabela.refreshTabela)
}) 


// EDITAR SALA ===================================================================

//btn editar GET sala dados => server 
$(document).on("click",".btn-editar-sala",function (e) {
    e.preventDefault() 
    reqServidor("GET",$(this).attr("href"), {}, modal.editSala)
});



// submit modal editar => server
$(document).on("submit","#form-editar-sala", function (e) {
    e.preventDefault()
    reqServidor("PATCH",$(this).attr("action"), $(this).serialize(), tabela.refreshTabela)
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
    reqServidor("DELETE", form.attr("action"),form.serialize(), tabela.refreshTabela)
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