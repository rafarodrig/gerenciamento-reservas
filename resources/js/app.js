
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})

import './jquery_import'

// import * as bootstrap from 'bootstrap';

// import $ from 'jquery';
// window.$ = $;

// function defineJQueryPlugin(plugin) {
//   const name = plugin.NAME;
//   const JQUERY_NO_CONFLICT = $.fn[name];
//   $.fn[name] = plugin.jQueryInterface;
//   $.fn[name].Constructor = plugin;
//   $.fn[name].noConflict = () => {
//     $.fn[name] = JQUERY_NO_CONFLICT;
//     return plugin.jQueryInterface;
//   }
// }

// defineJQueryPlugin(bootstrap.Modal);
// defineJQueryPlugin(bootstrap.Tooltip);
// defineJQueryPlugin(bootstrap.Popover);

// $("#modal-cadastrar-sala").modal("show")

bootstrap.Modal.Default.keyboard = false
bootstrap.Modal.Default.backdrop = 'static'

document.addEventListener('hidden.bs.modal', function (event) {
    
    if (document.activeElement) {
    document.activeElement.blur();
    }
});

export let counter = 0;

export function refreshTabela(){
    reqServidor('GET',$("#current_page").attr('href'),{}, function (res){    
        $("#container-tabela").html(res)
    });
}

//DESABILITA BOTÕES RESERVAR CASO FORM MUDAR
$(document).on('change', '.form-consulta', function (){

    $('.btn-reservar').prop('disabled', true) //Desabilita os botões 'reservar'

    if ($('#aviso').is("span") == false){ //Verifica o alerta de mudanças está na pág.
        $('.col-12').append("<span id='aviso'>Mudanças detectadas, por favor busque novamente.</span>").css({"color": "#dc3545", "font-size": ".875em"}) //Alerta
    }
});

$(".inp-cadastrar").on("input", function (){
    console.log($(this).val())
    if($(this).val().trim() != ""){
        $(this).removeClass('is-invalid')
    } 
    else {
        $(this).addClass("is-invalid")

    }
})


// MODAL CADASTRAR/EDITAR RESERVA: CONTAINER INFORMACOES TURMA
$(document).on('change','#turma-cadastrada', function(e){
    const turma_id = $(this).val()
    if(!turma_id){
        resetSelectTurma()
    } else {
        reqServidor("GET",'/turmas/'+ turma_id,{}, mostrarTurmaDados)
    }
    stateBtnTurmaDados()
})

    
// CONVERTE DATA NO FORMATO "Y-m-d" PARA O FORMATO "d/m/Y"
export function converterData(data){
    const date = new Date (data + ' 00:00')
    const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' })
    return formatter.format(date)
}


export function diaSemana(data){

    if(data.includes("/")){

        data = data.split("/").reverse().join("-")
    }

    let date = new Date (data + ' 00:00')
    const diaSemana = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]
    return diaSemana[date.getDay()]
}



export function modalAlerta(res){

    $(".modal").modal('hide')
    // mostra a mesagem de alerta 
    $("#modal-alerta-msg").html(res)
    // mostra o modal alerta
    $("#modal-alerta").modal('show')
}

export function reqServidor(method, url, data=null, callback=null) {
    
    console.log((method) + " -> " + url + data)


   return $.ajax({
        type: method,
        url: url,
        data: data,
        success: function (res) {
            
            console.log(res)

            if (method !== 'GET') {
                modalAlerta(res.message)
            }

            if(callback){
                callback(res)
            }
        
        },
        error: function(res) {
            if(res.status == 422){
                console.log(res)
                displayErrors(res.responseJSON)
            } else {
                console.log(res)
                modalAlerta(res.responseJSON.message)              
            }
        }

    })
}

function displayErrors(res){
    let form = res.error_bag
    let errors = res.errors
    for (const property in errors) {
        if(property == "unidade"){
            $(`.inp-${form}-${property}`).addClass('is-invalid')
        }
        $(`#inp-${form}-${property}`).addClass('is-invalid')
        $(`#error-${form}-${property}`).html(errors[property])
    }
}


// FUNC EDITAR/DELETAR TURMA ======================================================================================

// BOTAO DELETAR TURMA
// $(document).on('click','#btn-deletar-turma', function(){
//     $(".modal").modal('hide')
//     $("#modal-deletar-turma").modal('show')    
// })

// SUBMIT FORM-MODAL DELETAR TURMA
$(document).on('submit','#form-deletar-turma', function (e) {
    e.preventDefault()
    reqServidor("DELETE",$(this).attr("action"),$(this).serialize(), refreshTabela)
    
})


// SUBMIT FORM EDITAR TURMA
$(document).on('submit','#form-editar-turma', function (e) {
    e.preventDefault()
    reqServidor('PATCH',$(this).attr("action"),$(this).serialize(), refreshTabela)

})


// MOSTRADORES DE DADOS ===================================================================================
export function mostrarTurmaDados(turma){
    $("#form-editar-turma, #form-deletar-turma").attr("action","/turmas/" + turma.id)
    $("#inp-editar-nome").val(turma.nome)
    $("#inp-editar-docente").val(turma.docente)
    $("#inp-editar-curso").val(turma.curso)
    $("#inp-editar-lotacao").val(turma.lotacao)

}

export function mostrarOptionsTurmas(res){
    $("#turma-cadastrada").html(res)
}

export function mostrarSalaDados(sala){    
    let dados = '<h6>'+ sala.numero+ ' - '+ sala.tipo + '</h6>'
    dados +='<h6>'+ sala.lotacao +' lugares</h6>'
    dados +='<h6> '+ sala.maquinas_qtd +' maquinas ('+ sala.maquinas_tipo + ')</h6>'
    $("#sala-dados").html(dados)
}

export function mostrarReservaDados(datas,tipo,turno){
    let dados = '<h6>' + datas +'</h6>'
    dados += '<h6>' + tipo + '</h6>'
    dados += '<h6>' + turno + '</h6>'
    $("#reserva-dados").html(dados)
}

$(document).on('change',".inp-data", function(){
    checkDatas()
})

export function checkDatas(){
    if(!$('#inp-consulta-data-fim').val() == '' && $("#inp-consulta-data-inicio").val() > $("#inp-consulta-data-fim").val() ){
        $(".inp-data").addClass('is-invalid')
        $(".btn-buscar").prop("disabled",true)
    } else {   
        $(".inp-data").removeClass('is-invalid')
        $(".btn-buscar").prop("disabled",false)
    }
}


// BTN PAGINA E UNIDADE
$(document).on("click",".page-link, .unidade-link",function (e) {
    e.preventDefault();

    if($(this).is("[href]")){
        reqServidor("GET",$(this).attr('href'),{}, function(res){
            $("#container-tabela").html(res)
        })
    }
})


export function resetSelectTurma(){
    $("#turma-cadastrada, .inp-turma-dados, #btn-deletar-turma").val("")
    $(".btn-turma-dados").prop("disabled",true)
    $("#form-editar-turma").attr("action","")
}

export function stateBtnTurmaDados(){
    let turmaDados = $(".btn-turma-dados")

    if(!$("#turma-cadastrada").val()){
        turmaDados.prop("disabled",true)
    } else {
        turmaDados.prop("disabled",false)
    }
}


export function alertaTabela(msg){
    return "<span class='alerta-Tabela'>" + msg + "</span>"
}

export function logJSON(str){
    console.log(Object.fromEntries(new URLSearchParams(str)))
}




