import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { XCircle, Trash} from 'react-bootstrap-icons';
import axios from 'axios';

export default function DeletarTurmaModal({ turmaId, onCancel, onExited, onResult }) {
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
        console.error("Erro ao carregar turma:", err);
        onResult("Erro ao carregar dados da turma");
        onCancel();
      });

    return () => { isMounted = false; };
  }, [turmaId]);

  const handleCancel = () => {
    setShowModal(false);
    onCancel();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`/turmas/${turmaId}`)
      .then(res => {
        setShowModal(false);
        onResult({
          prevModal: true,
          msg: res.data.msg
        });
      })
      .catch(err => {
        console.error("Erro ao deletar turma:", err);
        onResult({
          prevModal: true,
          msg: "Erro ao deletar turma"
        });
      });
  };

  if (!turmaId || !turma) return null;

  return (
    <Modal 
      show={showModal} 
      onHide={handleCancel} 
      onExited={onExited} 
      centered
    >
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>
          <Trash className="me-2" />
          Deletar Turma
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleDelete}>
        <Modal.Body>
          <p className='my-2 '>Tem certeza que deseja deletar a turma <strong>{turma.nome}</strong>?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" variant="danger">
            Deletar
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
