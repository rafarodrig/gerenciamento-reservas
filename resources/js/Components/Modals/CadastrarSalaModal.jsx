import { Modal } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";

export default function ModalCadastrarSala({ setShowCadastrarModal, showCadastrarModal, children }) {
    return (
        <Modal show={showCadastrarModal} onHide={() => setShowCadastrarModal(false)} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <PlusCircle className="me-2" />
                    Cadastrar Nova Sala
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}