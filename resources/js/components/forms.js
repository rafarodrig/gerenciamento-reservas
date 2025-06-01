import { reqServidor } from "../utils/http"
import { refreshTabela } from "./tables"

// FUNCIONALIDADES DOS FILTROS DE PESQUISA CONSULTAR E CADASTRAR RESERVAS


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

function checkDatas(){
    if(!$('#inp-consulta-data-fim').val() == '' && $("#inp-consulta-data-inicio").val() > $("#inp-consulta-data-fim").val() ){
        $(".inp-data").addClass('is-invalid')
        $(".btn-buscar").prop("disabled",true)
    } else {   
        $(".inp-data").removeClass('is-invalid')
        $(".btn-buscar").prop("disabled",false)
    }
}

$(document).on('change',".inp-data", function(){
    checkDatas()
})

//DESABILITA BOTÕES RESERVAR CASO FORM MUDAR
$(document).on('change', '.form-consulta', function (){

    $('.btn-reservar').prop('disabled', true) //Desabilita os botões 'reservar'

    if ($('#aviso').is("span") == false){ //Verifica o alerta de mudanças está na pág.
        $('.col-12').append("<span id='aviso'>Mudanças detectadas, por favor busque novamente.</span>").css({"color": "#dc3545", "font-size": ".875em"}) //Alerta
    }
});

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
    checkDatas()
})
