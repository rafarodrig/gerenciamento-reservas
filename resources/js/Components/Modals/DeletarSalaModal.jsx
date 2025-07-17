import { Button, Modal } from "react-bootstrap";
import { ExclamationTriangle, Trash } from "react-bootstrap-icons";

export default function ModalDeletarSala({ showDeletarModal, salaDeletando, setShowDeletarModal, loading, confirmarDeletar }) {

    return (
        <Modal show={showDeletarModal} onHide={() => setShowDeletarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-danger">
                    <ExclamationTriangle className="me-2" />
                    Confirmar Exclusão
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <Trash className="text-danger" style={{ fontSize: '3rem' }} />
                    <p className="mt-3 mb-2">Tem certeza que deseja deletar a sala <strong>{salaDeletando?.numero}</strong> da unidade <strong>{salaDeletando?.unidade}</strong>?</p>
                    <p className="text-muted">Esta ação não pode ser desfeita.</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant="secondary" onClick={() => setShowDeletarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="danger"
                    onClick={confirmarDeletar}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Deletando...
                        </>
                    ) : (
                        <>
                            <Trash className="me-2" />
                            Deletar
                        </>
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}