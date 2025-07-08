import { Modal, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { PencilSquare, XCircle, ArrowRepeat } from 'react-bootstrap-icons';
import TableSalasDisponiveisTroca from '../Tables/TableSalasDisponiveisTroca';
import { useState } from 'react';
import axios from 'axios';

export default function ConfirmarEditarModal({ show, onConfirm, onCancel, salas, reserva, buscarSalasDisponiveisTroca }) {
  const [salaTroca, setSalaTroca] = useState(null);

  const handleChange = (e) => {
    buscarSalasDisponiveisTroca(e.target.value, null);
  };

  const handleCancel = () => {
    onCancel()
    setSalaTroca(null)
  }

  const salaSelecionada = async (salaId) => {
    try {
      // (Opcional) Ative um loading visual aqui, se quiser
      const res = await axios.get(`/salas/${salaId}`);

      if (res?.data) {
        setSalaTroca(res.data); // Define a nova sala selecionada
      } else {
        console.warn('Sala não encontrada');
      }
    } catch (error) {
      console.error('Erro ao buscar sala:', error);
      // (Opcional) Defina um alerta/toast de erro para o usuário
    } finally {
      // (Opcional) Desative loading
    }
  };


  return (
    <Modal show={show} onHide={handleCancel} size="xl" centered animation>
      <Modal.Header closeButton data-bs-theme="dark">
        <Modal.Title>
          <PencilSquare className="me-2" />
          Editar Reserva
        </Modal.Title>
      </Modal.Header>

      <Form>
        <Modal.Body>
          <Row className='g-3'>
            <Col md={6} className='bg-white border rounded-4 p-4 shadow-sm'>
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
            </Col>

            <Col md={6}>
              <Row className="g-3">
                <Col md={12}>
                  <Card className="shadow-sm rounded-4 h-100">
                    <Card.Body>
                      <Card.Title className="text-muted small text-uppercase">Sala atual</Card.Title>
                      {reserva?.sala ? (
                        <>
                          <p><strong>{reserva.sala.numero}</strong> - {reserva.sala.tipo}</p>
                          <p className='text-muted mb-0'>{reserva.sala.lotacao} pessoas, {reserva.sala.maquinas_qtd} máquinas</p>
                        </>
                      ) : (
                        <p className="text-muted">Nenhuma sala atual.</p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={12}>
                  <Card className="shadow-sm rounded-4 h-100 border-primary">
                    <Card.Body>
                      <Card.Title className="text-muted small text-uppercase">Nova sala</Card.Title>
                      {salaTroca ? (
                        <>
                          <p><strong>{salaTroca.numero}</strong> - {salaTroca.tipo}</p>
                          <p className='text-muted mb-0'>{salaTroca.lotacao} pessoas, {salaTroca.maquinas_qtd} máquinas</p>
                        </>
                      ) : (
                        <p className="text-muted">Nenhuma sala selecionada.</p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          <div className="mt-4">
            <TableSalasDisponiveisTroca
              data={salas}
              onPageChange={(page) => buscarSalasDisponiveisTroca(null, page)}
              onReservar={salaSelecionada}
            />
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleCancel}>
            <XCircle className="me-1" /> Cancelar
          </Button>
          <Button variant="primary" onClick={() => onConfirm(salaTroca)} disabled={!salaTroca}>
            <ArrowRepeat className="me-1" /> Aplicar Edição
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
