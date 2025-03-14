// $(document).ready(function () {
//     $("#form-consultar-reservas").submit()
// });
import * as app from './app'


$(document).on('submit','#form-consultar-reservas', function (e) {
    e.preventDefault()
    $('#aviso').remove()
    gerarTabelaReservas()
})

// BOTAO DELETAR
$(document).on('click','.btn-deletar-reserva', function () {  

    $("#modal-deletar-reserva").modal("show")

    $("#form-deletar-reserva").attr("action",$(this).attr("href"))

    const tipo_reserva = $(this).parents("tr").children("td:nth-child(4)")

    // desabilita as opcoes (radio) de deletar todos os registros e apartir no modal deletar reservas 
    if(tipo_reserva.text() == "Avulsa"){
        $("#radio-del-apartir, #radio-del-todos").prop("disabled",true)
    } else {
        $("#radio-del-apartir, #radio-del-todos").prop("disabled",false)
    }
})
    
// MODAL-FORM DELETAR RESERVAS
$(document).on('submit', '#form-deletar-reserva', function (e) { 
    e.preventDefault();
    
    app.reqServidor("DELETE",$(this).attr("action"), $(this).serialize(), app.refreshTabela)
})
    
// BOTAO EDITAR

$(document).on('click','.btn-editar-reserva', function () {
    let href = $(this).attr("href")

    app.reqServidor("GET", href ,{}, function(reserva){

        $("#form-editar-reserva").attr("action", href)
        app.mostrarSalaDados(reserva.sala)
        app.mostrarTurmaDados(reserva.turma)

        app.reqServidor("GET","/turmas",{'disponiveis-troca': true, 'id-reserva':reserva.id}, app.mostrarOptionsTurmas)

        dadosReservaModalEditarReserva(reserva)
        $("#modal-editar").modal("show")
    })
})


// SUBMIT FORM-MODAL EDITAR RESERVA
$(document).on('submit','#form-editar-reserva', function(e){
    e.preventDefault()
    
    app.logJSON($(this).serialize())
    app.reqServidor("PATCH",$(this).attr('action'), $(this).serialize() , app.refreshTabela)

})
    

// LIMPAR DADOS MODAL EDITAR APOS CANCELAR OPERACAO

function gerarTabelaReservas(){
    let form = $("#form-consultar-reservas").serialize()

    app.logJSON(form)

    app.reqServidor("GET","/reservas", form , function(res){        
        $("#container-tabela").css("visibility","visible")
        $("#container-tabela").html(res)
    })

}


function dadosReservaModalEditarReserva(reserva){
    const turma = reserva.turma
    app.mostrarReservaDados(app.converterData(reserva.data), turma.tipo, turma.turno)
    $("#inp-responsavel-cadastro").val(reserva.responsavel_cadastro)
    
}


function pdfBody(dados){
    let body = [];
    for (const i in dados){
        //console.log(dados[i].id_sala + " " + dados[i].tipo_sala + " " + dados[i].lugares_qtd + " " + dados[i].maquinas_qtd + " " + dados[i].maquinas_tipo);
        body.push({
            sala: dados[i].sala, 
            sala_tipo: dados[i].sala_tipo,
            unidade : dados[i].unidade,
            data: diaSemana(dados[i].data) +" - " + converterData(dados[i].data),
            reserva: dados[i].reserva,
            turma: dados[i].turma,
            docente: dados[i].docente,
            turno: dados[i].turno,
            lugares: dados[i].lugares,
        });
    }
    return body;
}

//GERAR PDF
function gerarPDF(){
    $.ajax({
        type: "GET",
        url: "./reservas",
        data:{"reservas-json":true},
        dataType: "json",
        success: function (dadosJSON) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFontSize(24);
            let text = "Reservas cadastradas";
            let textX = (doc.internal.pageSize.getWidth() - doc.getTextWidth(text))/2
            doc.text(text, textX, 20);
            doc.setFontSize(12);

            let head = [{sala: 'Sala', sala_tipo: "Tipo Sala", unidade: 'Unidade' ,data: 'Data', turno: 'Turno', reserva: 'Tipo Reserva', turma: 'Turma', docente:'Docente', lugares: 'Lotação'}];
            let body = pdfBody(dadosJSON.reservas);
            doc.autoTable({head: head, body: body, startY: 25});
            doc.save('Reservas.pdf');
        }
    });       

}







    