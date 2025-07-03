
import { Modal } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import styles from "../GerenciarSalas.module.scss"

export default function ModalEditarSala({showEditarModal,setShowEditarModal, children }){
    return(
    <Modal show={showEditarModal} onHide={() => setShowEditarModal(false)} size="lg" centered>
        <Modal.Header className={styles["modal-header"]} closeButton>
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