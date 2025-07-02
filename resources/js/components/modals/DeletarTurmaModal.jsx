import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ExclamationTriangle, Trash } from "react-bootstrap-icons";
import axios from 'axios';

export default function DeletarTurmaModal({ 
  turmaId, 
  onCancel, 
  onExited, 
  onResult,
  loading=false 
}) {
  const [turma, setTurma] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!turmaId) return;

    let isMounted = true;

    axios.get(`/turmas/${turmaId}`)
      .then(res => {
        if (isMounted) {
          setTurma(res.data);
          setShowModal(true);
        }
      })
      .catch(err => {
        onResult({ show: true, type: "danger", message: ("Erro ao carregar turma: ", err) });
        onCancel();
      });

    return () => { isMounted = false; };
  }, [turmaId]);

  const handleCancel = () => {
    setShowModal(false);
    onCancel();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.delete(`/turmas/${turmaId}`)
      .then(response => {
        onResult({ show: true, type: "success", message: response.data.message });
      })
      .catch(err => {
        onResult({ show: true, type: "danger", message: "Erro ao deletar turma: " + err });
        onCancel();
      })
      .finally(() =>{
        setShowModal(false);
      });
  };

  if (!turmaId || !turma) return null;

  return (
      <Modal show={showModal}  onHide={handleCancel} onExited={onExited}  centered>
          <Modal.Header  closeButton>
              <Modal.Title className="text-danger">
                  <ExclamationTriangle className="me-2" />
                  Confirmar Exclusão
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="text-center">
                  <Trash className="text-danger" style={{fontSize: '3rem'}} />
                  <p className="mt-3 mb-2">Tem certeza que deseja deletar a turma <strong>{turma.nome}</strong>?</p>
                  <p className="text-muted">Esta ação não pode ser desfeita.</p>
              </div>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleCancel}>
                  Cancelar
              </Button>
              <Button 
                  variant="danger" 
                  onClick={handleSubmit}
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
  );
}
