import * as app from './app'

$(document).on('ready', function () {
    $(".inp-turma-dados").prop("disabled",true)
    $(".btn-turma-dados").prop("disabled",true)
});

// RODA AO CLICAR O BOTAO "BUSCAR"
$(document).on('submit','#form-consultar-salas',function (e) {
    e.preventDefault()
    $('#aviso').remove()
    gerarTabelaSalasDisponiveis()
})

$(document).on('click','.close-badge', function(){
     
    let num = $(".data-badge").map(function(){
        return 1
    }).get()

    if(num.length > 1){
        $(this).closest('.data-badge-div').remove()
    }

    gerarTabelaSalasDisponiveis();
})

function gerarFiltros(res){
    const dados = res.dados 

    let conteudo = "";
    for (const [key, value] of Object.entries(dados.filtros)) {
        conteudo += `<div class="data-badge-div d-flex">`
        conteudo += `<input form="form-badge-filtros" name="${key}" value="${value}" type="hidden">`
        conteudo += `<button class="badge text-bg-primary filtros">${value}</button>`
        conteudo += `</div>`
      }

      dados.datas.forEach( (data) =>{
        conteudo += '<div class="data-badge-div d-flex">'
        conteudo += `<input form="form-badge-filtros" name="datas[]" value="${data}" type="hidden">`
        conteudo += '<button class="badge data-badge text-bg-primary"><div class=" d-inline-flex" data-bs-theme="dark">' + app.converterData(data) + '<svg xmlns="http://www.w3.org/2000/svg" class="close-badge"  viewBox="0 0 72 72" width="14px" height="14px"><path d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z"/></svg></div></button></div>'
    })
    conteudo += "</div>"
    
    $("#tabDatas").html(conteudo)

    $("#container-filtros").css("visibility","visible")

}



// BOTAO RESERVAR
$(document).on('click','.btn-reservar', function () {
    resetInpCadastrarReserva()

    let form = new FormData(document.forms["form-badge-filtros"])

    const sala_id = $(this).val()

    $("#inp-cadastrar-sala").val(sala_id)

    
    const datas = form.getAll("datas[]")

    const str_datas = '<h6>'+ app.diaSemana(datas[0]) +'</h6><h6 id="reserva-datas" class="overflow-x-auto">' + " " + datas.join(" - ") +"</h6>"

    app.mostrarReservaDados(str_datas, form.get("tipo-reserva"), form.get("turno"))
    
    form.append("disponiveis",true)
    
    app.reqServidor("GET","/salas/" + sala_id, {}, app.mostrarSalaDados)
    
    app.reqServidor("GET","/turmas", new URLSearchParams(form).toString(), app.mostrarOptionsTurmas)

    $("#modal-cadastrar-reserva").modal("show")
    
})

$(document).on("click",".btn-cancelar-reserva", function(){
    $("#modal-cadastrar-reserva").modal("hide")
})


// BOTOES CADASTRAR/BUSCAR TURMA PARA CADASTRAR RESERVA
// DESABILITA INPUTS CONFORME OPCAO SELECIONADA
$(document).on("click",".btn-check", function(){

    if(this.id == "btn-cadastro-turma"){ 
        $("#turma-cadastrada, .inp-turma-dados, .btn-turma-dados").prop("disabled",true)
        $(".inp-cadastrar-turma").prop("disabled",false)
    } else {
        $("#turma-cadastrada, .inp-turma-dados").prop("disabled",false)
        $(".inp-cadastrar-turma").prop("disabled",true)
        app.stateBtnTurmaDados()
    }
    
})

$(document).on('change','#form-consultar-salas', function () {
    app.reqServidor("GET","./salas?filtros-salas-disponiveis=true",$("#form-consultar-salas").serialize(), gerarFiltros)
})
 
// SUBMIT MODAL-FORM CADASTRAR RESERVA
$(document).on('submit','#cadastrar-reserva', function (e) {
    e.preventDefault()

            let filtros = new FormData(document.forms["form-badge-filtros"])

            // COMBINA OS DADOS DA RESERVA COM OS DADOS DA TURMA
            let form = $(this).serialize() + "&" + new URLSearchParams(filtros).toString()
            
            app.logJSON(form)
            app.reqServidor("POST","/reservas", form , app.refreshTabela)
})

function resetInpCadastrarReserva(){
    app.resetSelectTurma()
    $(".inp-cadastrar-turma, .inp-turma-dados, #inp-responsavel-cadastro").val("")                
}


// DESABILITAR DATA FIM
$(document).on('change','#inp-consulta-reserva-tipo', function(){
    
    $("#inp-consulta-data-fim, #inp-semanas, .inp-dia-semana").prop("disabled",true)
    $("#inp-consulta-data-fim, #inp-semanas").val('')

    if(this.value == "Avulsa"){
        
    } else if(this.value == "Pos-graduacao"){
        
        $(".inp-dia-semana, #inp-semanas").prop("disabled",false)
        
    }
    else if(this.value == "FIC"){
        
        $("#inp-semanas").prop("disabled",false)
    }
    else if(this.value == "Graduação"){
        
        $("#inp-semanas,#inp-consulta-data-fim").prop("disabled",false)
    }
    app.checkDatas()
})


$(document).on('change','#inp-semanas, #inp-consulta-data-fim', function(){

    if(this.id == "inp-semanas" && !this.value == ''){
        $("#inp-consulta-data-fim").prop("disabled",true)
    }
    else if(this.id == "inp-consulta-data-fim" && !this.value == ''){
        $("#inp-semanas").prop("disabled",true)
    } 
    else {
        $("#inp-consulta-data-fim, #inp-semanas").prop("disabled",false)
    }
}) 

// TABELA SALAS DISPONIVEIS

async function gerarTabelaSalasDisponiveis(){

    if(!$(".data-badge").length){
      await app.reqServidor("GET","./salas?filtros-salas-disponiveis=true",$("#form-consultar-salas").serialize(), gerarFiltros)
    }
    
    app.reqServidor("GET","/salas?disponiveis=true", $("#form-badge-filtros").serialize() , function(res){
        
        $("#container-tabela").css("visibility","visible")

        $("#container-tabela").html(res)
    })
   
}


$("#tabDatas").on('mouseenter', () => {
    $("#tabDatas").collapse('show');
})

$("#tabDatas").on("mouseleave", () => {
    $("#tabDatas").collapse('hide');
})



