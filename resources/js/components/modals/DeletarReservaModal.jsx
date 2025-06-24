import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import axios from 'axios';


 export default function ModalDeletarReserva({ reservaId, onResetId, onResult}) {

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

  const handleCancel = () =>{
    setShowModal(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      console.log(formData)
      axios.delete(`/reservas/${reservaId}`,{data: formData})
      .then((res) => {
          setShowModal(false)
          onResult({
              prevModal: false,
              msg: res.data.msg
            })
      }).catch(function (error) {
        console.log(error)
  });
  
  };

if (!reservaId) return null

  return (

    <>
    <style>{` .radio-vermelho .form-check-input:checked {
  background-color: red;
  border-color: red;
} `}</style>

    <Modal show={showModal} onHide={handleCancel}
     onExited={onResetId}
     centered>
      <Modal.Header closeButton className="bg-danger text-white" data-bs-theme="dark">
        <Modal.Title>
          <PencilSquare className="me-2" />
          Deletar Reserva
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>

            <p className="text-muted mb-3">
            Selecione como deseja aplicar a edição desta reserva:
            </p>
          <Form.Check
            type="radio"
            name="opcao"
            value="atual"
            label="Editar somente este registro"
            defaultChecked
            className="radio-vermelho mb-2"
            onChange={handleChange}
            />
          <Form.Text className="text-muted ms-4">
            Altere apenas esta reserva individualmente.
          </Form.Text>

          <Form.Check
            type="radio"
            name="opcao"
            value="todos"
            label="Editar todos os registros relacionados"
            className="radio-vermelho mt-3 mb-2"
            onChange={handleChange}
            />
          <Form.Text className="text-muted ms-4">
            Todos os registros relacionados (mesma turma e sala) serão modificados.
          </Form.Text>

          <Form.Check
            type="radio"
            name="opcao"
            value="apartir"
            label="Editar registros a partir deste"
            className="radio-vermelho mt-3 mb-2"
            onChange={handleChange}
            />
          <Form.Text className="text-muted ms-4">
            Edita este e os futuros registros relacionados.
          </Form.Text>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleCancel}>
             Cancelar
          </Button>
          <Button variant="danger" type='submit'>
             Deletar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    </>
  );
}