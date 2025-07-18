import { PlusCircleIcon } from "lucide-react";
import { Modal } from "react-bootstrap";

export default function CadastrarTurmaModal({ setShowCadastrarTurmaModal, showCadastrarTurmaModal, children }) {
    return (
        <Modal show={showCadastrarTurmaModal} onHide={() => setShowCadastrarTurmaModal(false)} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <PlusCircleIcon className="me-2" />
                    Cadastrar Nova Turma
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}