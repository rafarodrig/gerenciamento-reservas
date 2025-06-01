import { reqServidor } from "../utils/http";

export function showTabela (res){
    $("#container-tabela").css("visibility","visible")
    $("#container-tabela").html(res)
}

export function refreshTabela(){
    reqServidor('GET',$("#current_page").attr('href'),{}, function (res){    
        $("#container-tabela").html(res)
    });
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
