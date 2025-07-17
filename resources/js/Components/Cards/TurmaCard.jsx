import { BookOpen, User, Users } from "lucide-react";
import { Button, Card } from "react-bootstrap";

export default function TurmaCard({ turma, badge }) {
    return (

        <Card className="container-style flex-grow-1">
            <Card.Body>
                <Card.Title className="d-flex align-items-center justify-content-between mb-2">
                    <span title={turma.nome} className="text-truncate me-2 " >{turma.nome}</span>
                    {badge}
                </Card.Title>
                <p className="d-flex align-items-center mb-2 text-truncate" >
                    <User size={18} className="me-2" /> {turma.docente}
                </p>
                <p className="d-flex align-items-center mb-2">
                    <BookOpen size={18} className="me-2" /> {turma.tipo}
                </p>
                <p className="d-flex align-items-center mb-0">
                    <Users size={18} className="me-2" /> {turma.lotacao} alunos
                </p>
            </Card.Body>
        </Card>

    )
}