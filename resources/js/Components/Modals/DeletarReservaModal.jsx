import { Modal, Button, Form, Container } from 'react-bootstrap';
import { useState } from 'react';
import { ExclamationTriangle, PencilSquare, Trash } from 'react-bootstrap-icons';
import axios from 'axios';


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
    axios.delete(`/reservas/${reservaId}`, { data: formData })
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
            <ExclamationTriangle className="me-2" />
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
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button variant="danger" type='submit'>
              <Trash className='me-2' />
              Deletar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}