
import './jquery_import'
import * as bootstrap from 'bootstrap';
// import { reqServidor } from './utils/http';
// import * as modal from './components/modals';
// import * as tabela from './components/tables';


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

$(".inp-cadastrar").on("input", function (){
    console.log($(this).val())
    if($(this).val().trim() != ""){
        $(this).removeClass('is-invalid')
    } 
    else {
        $(this).addClass("is-invalid")

    }
})




// FUNC EDITAR/DELETAR TURMA ======================================================================================

// BOTAO DELETAR TURMA
// $(document).on('click','#btn-deletar-turma', function(){
//     $(".modal").modal('hide')
//     $("#modal-deletar-turma").modal('show')    
// })





export function alertaTabela(msg){
    return "<span class='alerta-Tabela'>" + msg + "</span>"
}

export function logJSON(str){
    console.log(Object.fromEntries(new URLSearchParams(str)))
}




