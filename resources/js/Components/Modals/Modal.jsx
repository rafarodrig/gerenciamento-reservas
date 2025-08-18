import { Modal } from "react-bootstrap";

export default function BaseModal({
    title,
    onClose,
    onExited,
    show,
    size = "lg",
    children }) {
    return (
        <Modal show={show} onHide={onClose} onExited={onExited} size={size} centered>
            <Modal.Header closeButton>
                {title}
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}