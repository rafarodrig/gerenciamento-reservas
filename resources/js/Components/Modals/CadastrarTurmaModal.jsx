import { PlusCircleIcon } from "lucide-react";
import { Modal } from "react-bootstrap";

export default function CadastrarTurmaModal({
    show,
    onClose,
    children,
    ...props
}) {
    return (
        <Modal
            show={show}
            onHide={onClose}
            size="lg"
            centered
            {...props}
        >
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