
import { Modal } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";

export default function ModalEditarSala({ showEditarModal, setShowEditarModal, children }) {
    return (
        <Modal show={showEditarModal} onHide={() => setShowEditarModal(false)} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <PencilSquare className="me-2" />
                    Editar Sala
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}