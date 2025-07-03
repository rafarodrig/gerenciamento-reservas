import { Modal, Button, Form, Accordion } from 'react-bootstrap';
import { PencilSquare, XCircle, ArrowRepeat } from 'react-bootstrap-icons';

export default function ConfirmarEditarModal({ show, onConfirm, onCancel, formData, setFormData}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal show={show} onHide={onCancel} animation>
      <Modal.Header closeButton className="bg-primary text-white" data-bs-theme="dark">
        <Modal.Title>
          <PencilSquare className="me-2" />
          Editar Reserva
        </Modal.Title>
      </Modal.Header>

      <Form >
        <Modal.Body>
          <p className="text-muted mb-3">
            Selecione como deseja aplicar a edição desta reserva:
          </p>

          <Form.Check
            type="radio"
            id="editar-atual"
            name="editar_reserva"
            value="atual"
            label="Editar somente este registro"
            defaultChecked
            className="mb-2"
            onChange={handleChange}
          />
          <Form.Text className="text-muted ms-4">
            Altere apenas esta reserva individualmente.
          </Form.Text>

          <Form.Check
            type="radio"
            id="editar-todos"
            name="editar_reserva"
            value="todos"
            label="Editar todos os registros relacionados"
            className="mt-3 mb-2"
            onChange={handleChange}
          />
          <Form.Text className="text-muted ms-4">
            Todos os registros relacionados (mesma turma e sala) serão modificados.
          </Form.Text>

          <Form.Check
            type="radio"
            id="editar-apartir"
            name="editar_reserva"
            value="apartir"
            label="Editar registros a partir deste"
            className="mt-3 mb-2"
            onChange={handleChange}
          />
          <Form.Text className="text-muted ms-4">
            Edita este e os futuros registros relacionados.
          </Form.Text>

          <Accordion className="mt-4">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Visualizar detalhes atuais da reserva</Accordion.Header>
              <Accordion.Body>
                {/* <ul className="mb-0">
                  <li><strong>Sala:</strong> 202 - Laboratório</li>
                  <li><strong>Data:</strong> 10/06/2025</li>
                  <li><strong>Turno:</strong> Matutino</li>
                  <li><strong>Turma:</strong> INF-3A</li>
                  <li><strong>Docente:</strong> Prof. João Silva</li>
                </ul> */}
                <pre>{JSON.stringify(formData, null, 2)}</pre>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={onCancel}>
            <XCircle className="me-1" /> Cancelar
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            <ArrowRepeat className="me-1" /> Aplicar Edição
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
