import { Building, LaptopMinimal, Users } from "lucide-react";
import { Button, Card } from "react-bootstrap";

export default function SalaCard({ sala, className = "", badge }) {
    return (
        <Card className={`container-style flex-grow-1 ${className}`}>
            <Card.Body>

                <Card.Title className="d-flex align-items-center justify-content-between mb-2">
                    <span title={sala.numero + " - " + sala.tipo_sala.nome} className="text-truncate me-2 " >{sala.numero} - {sala.tipo_sala.nome}</span>
                    {badge}

                    {/* {onTrocarSala && (
                        <Button variant="outline-primary" className="btn-sm" onClick={onTrocarSala}>
                            Trocar Sala
                        </Button>
                    )} */}
                </Card.Title>
                <p className="d-flex align-items-center mb-2">
                    <Building size={18} className="me-2" /> {sala.unidade} unidade
                </p>
                <p className="d-flex align-items-center mb-2">
                    <Users size={18} className="me-2" /> {sala.lotacao} pessoas
                </p>
                <p className="d-flex align-items-center mb-0">
                    <LaptopMinimal size={18} className="me-2" /> {sala.maquinas_qtd} máquinas
                </p>

            </Card.Body>
        </Card>
    )
}