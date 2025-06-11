import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

function ModalDeletarReserva({ show, onHide, onSubmit }) {
  const [opcao, setOpcao] = useState('atual');

  const handleChange = (e) => {
    setOpcao(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(opcao); // envia a opção selecionada
    onHide(); // fecha o modal
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar Reserva</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Check
            type="radio"
            id="radio-del-atual"
            name="del-reservas"
            value="atual"
            label="Deletar registro atual"
            checked={opcao === 'atual'}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            id="radio-del-todos"
            name="del-reservas"
            value="todos"
            label="Deletar todos os registros"
            checked={opcao === 'todos'}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            id="radio-del-apartir"
            name="del-reservas"
            value="apartir"
            label="Deletar os registros a partir do atual"
            checked={opcao === 'apartir'}
            onChange={handleChange}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type="submit">
            Deletar
          </Button>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalDeletarReserva;