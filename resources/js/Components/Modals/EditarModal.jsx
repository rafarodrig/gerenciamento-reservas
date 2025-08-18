
import { PenSquare } from "lucide-react";
import { Modal } from "react-bootstrap";

export default function EditarModal({
    show,
    title = "",
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
                    <PenSquare className="me-2" />
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}