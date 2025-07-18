import { PenSquare } from "lucide-react";
import { Modal } from "react-bootstrap";

export default function EditarTurmaModal({ onClose, onExited, showEditarTurmaModal, children }) {
    return (
        <Modal show={showEditarTurmaModal} onHide={onClose} onExited={onExited} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <PenSquare className="me-2" />
                    Editar Turma
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}