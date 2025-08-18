import { PenSquare } from "lucide-react";
import { Modal } from "react-bootstrap";

export default function EditarTurmaTitle() {
    return (
        <Modal.Title>
            <PenSquare className="me-2" />
            Editar Turma
        </Modal.Title>
    )

}