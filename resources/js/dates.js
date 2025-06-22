export function converterData(data){
    if(!data) return "";
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
