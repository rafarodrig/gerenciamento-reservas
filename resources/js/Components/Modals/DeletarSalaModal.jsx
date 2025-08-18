import { Modal } from "react-bootstrap";
import { Trash2Icon, TriangleAlert } from "lucide-react";
import CancelarButton from "../Buttons/CancelarButton";
import { useAlert } from "@/contexts/AlertContext";
import DeletarButton from "../Buttons/DeletarButton";
import { useSimpleForm } from "@/hooks/useSimpleForm";
import { api } from "@/services/api";

export default function ModalDeletarSala({
    show,
    sala,
    onClose,
    onExited,
    onResult,
    onShow,
}) {
    const { showAlert } = useAlert();
    const {
        loading,
        handleSubmit,
    } = useSimpleForm({
        onSubmit: async () => {
            const res = await api.delete(`/salas/${sala?.id}`);
            showAlert(res.data.message, 'success');
            onResult();
            onClose();
        },
    });


    return (
        <Modal show={show} onShow={onShow} onHide={onClose} onExited={onExited} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-danger">
                    <TriangleAlert className="me-2" />
                    Confirmar Exclusão
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <Trash2Icon className="text-danger" strokeWidth={1.5} size={50} />
                    <p className="mt-3 mb-2">Tem certeza que deseja deletar a sala <strong>{sala?.numero}</strong> da unidade <strong>{sala?.unidade}</strong>?</p>
                    <p className="text-muted">Esta ação não pode ser desfeita.</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="">
                <CancelarButton onClick={onClose}>
                </CancelarButton>
                <DeletarButton
                    loading={loading}
                    disabled={loading}
                    onClick={handleSubmit}
                >Deletar</DeletarButton>
            </Modal.Footer>
        </Modal>
    )
}