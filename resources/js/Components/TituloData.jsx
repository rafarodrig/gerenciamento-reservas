
import { dataAtual, diaSemanaAtual } from "@/dates"

export default function TituloData({titulo}){
    return (
        <>
        <div className="mt-0 fs-3 d-flex justify-content justify-content-between">
            <h1 className="h3">{titulo}</h1>
            <h1 className="h3">{diaSemanaAtual()}, {dataAtual()}</h1>
        </div>
        </>
    )
}