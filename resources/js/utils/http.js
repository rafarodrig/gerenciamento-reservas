export function displayErrors(res){
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