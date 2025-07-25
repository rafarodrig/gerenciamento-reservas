import { Modal, Form, Container } from 'react-bootstrap';
import { useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import CancelarButton from '../Buttons/CancelarButton';
import DeletarButton from '../Buttons/DeletarButton';
import { api } from '@/services/api';


export default function ModalDeletarReserva({ reservaId, onResetId, onResult }) {

  if (!reservaId) return null;

  const [showModal, setShowModal] = useState(true)

  const [formData, setFormData] = useState({
    opcao: "atual"
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = () => {
    setShowModal(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    api.delete(`/reservas/${reservaId}`, { data: formData })
      .then((response) => {
        onResult({ show: true, type: "success", message: response.data.message });
      })
      .catch((err) => {
        onResult({ show: true, type: "danger", message: err })
      })
      .finally(() => {
        setShowModal(false);
      });
  };

  if (!reservaId) return null

  return (

    <>
      <style>{` .radio-vermelho .form-check-input:checked {
  background-color: red;
  border-color: red;
} `}</style>

      <Modal
        show={showModal}
        onHide={handleCancel}
        onExited={onResetId}
        centered>
        <Modal.Header closeButton className='pb-2' >
          <Modal.Title className="d-flex align-items-center text-danger">
            <TriangleAlert className="me-2" />
            Deletar Reserva
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Container className='px-4' >
              <p className="text-muted mb-3">
                Selecione como deseja aplicar a exclusão desta reserva:
              </p>
              <Form.Check
                type="radio"
                name="opcao"
                value="atual"
                label="Excluir somente este registro"
                defaultChecked
                className="radio-vermelho mb-2"
                onChange={handleChange}
              />
              <Form.Text className="text-muted ms-4">
                Excluir apenas esta reserva individualmente.
              </Form.Text>

              <Form.Check
                type="radio"
                name="opcao"
                value="todos"
                label="Excluir todos os registros relacionados"
                className="radio-vermelho mt-3 mb-2"
                onChange={handleChange}
              />
              <Form.Text className="text-muted ms-4">
                Excluir todos registros relacionados (mesma turma e sala).
              </Form.Text>

              <Form.Check
                type="radio"
                name="opcao"
                value="apartir"
                label="Excluir registros a partir deste"
                className="radio-vermelho mt-3 mb-2"
                onChange={handleChange}
              />
              <Form.Text className="text-muted ms-4">
                Excluir este e os futuros registros relacionados.
              </Form.Text>
            </Container>
          </Modal.Body>

          <Modal.Footer className=" d-flex justify-content-between">

            <CancelarButton onClick={handleCancel} />

            <DeletarButton type='submit' > Deletar</DeletarButton>

          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}