
import { dataAtual, diaSemanaAtual } from "@/dates"
import { capitalize } from "@/utils"

export default function TituloData({ className = "", titulo, descricao }) {
    return (
        <div className={`page-header d-flex justify-content-between align-items-center ${className}`}>
            <div>
                <h2 className="page-title">{titulo}</h2>
                <p className="text-muted mb-0">{descricao}</p>
            </div>
            <div >
                <h2 className="page-title">{capitalize(diaSemanaAtual())}, {dataAtual()}</h2>
            </div>
        </div>
    )
}