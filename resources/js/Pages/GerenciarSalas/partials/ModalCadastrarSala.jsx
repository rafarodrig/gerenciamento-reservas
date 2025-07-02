import { Modal } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import styles from "../GerenciarSalas.module.scss";

export default function ModalCadastrarSala({setShowCadastrarModal, showCadastrarModal, children}){
    return(
        <Modal show={showCadastrarModal} onHide={() => setShowCadastrarModal(false)} size="lg" centered>
            <Modal.Header className={styles["modal-header"]} closeButton>
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