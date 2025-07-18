import { Trash2Icon, TriangleAlert } from "lucide-react";
import { Button, Modal } from "react-bootstrap";
import CancelarButton from "../Buttons/CancelarButton";

export default function ModalDeletarSala({ showDeletarModal, salaDeletando, setShowDeletarModal, loading, confirmarDeletar }) {

    return (
        <Modal show={showDeletarModal} onHide={() => setShowDeletarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-danger">
                    <TriangleAlert className="me-2" />
                    Confirmar Exclusão
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <Trash2Icon className="text-danger" strokeWidth={1.5} size={50} />
                    <p className="mt-3 mb-2">Tem certeza que deseja deletar a sala <strong>{salaDeletando?.numero}</strong> da unidade <strong>{salaDeletando?.unidade}</strong>?</p>
                    <p className="text-muted">Esta ação não pode ser desfeita.</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="">
                <CancelarButton variant="secondary" onClick={() => setShowDeletarModal(false)}>
                </CancelarButton>
                <Button
                    variant="danger"
                    onClick={confirmarDeletar}
                    disabled={loading}
                    className="d-flex align-items-center gap-2 btn-translate-animation"
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Deletando...
                        </>
                    ) : (
                        <>
                            <Trash2Icon size={20} />
                            Deletar
                        </>
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}