import { Modal, Form, Col, Row, Card } from 'react-bootstrap';
import TableSalasDisponiveisTroca from '../Tables/SalasDisponiveisTrocaTable';
import { useState } from 'react';
import axios from 'axios';
import FiltrosContainer from '../Filtros/FiltrosContainer';
import DatasBadge from '../Filtros/DatasBadge';
import { PenSquare } from 'lucide-react';
import CancelarButton from '../Buttons/CancelarButton';
import SalvarButton from '../Buttons/SalvarButton';
import SalaCard from '../Cards/SalaCard';

export default function TrocarSalaModal({
  show,
  onConfirm,
  onCancel,
  salas,
  reserva,
  buscarSalasDisponiveisTroca,
  setEditarRegistro
}) {
  const [salaTroca, setSalaTroca] = useState(null);

  const handleChange = (e) => {
    setEditarRegistro(e.target.value);
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

  if (!salas) return null;

  return (
    <Modal show={show} onHide={handleCancel} size="xl" centered animation>
      <Modal.Header closeButton >
        <Modal.Title>
          <PenSquare className="me-2" />
          Editar Reserva
        </Modal.Title>
      </Modal.Header>

      <Form>
        <Modal.Body>

          <Row className="g-3 d-flex ">
            {/* Coluna de opções */}
            <Col xs={12} lg={6} className="d-flex">
              <div className="container-style p-4 w-100">
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
              </div>
            </Col>

            <Col xs={12} lg={6} className="d-flex flex-column gap-3">
              <SalaCard className='h-100 flex-fill p-2' sala={reserva.sala} />
              {/* <Card className="container-style h-100 flex-fill">
                <Card.Body>
                  <Card.Title className="text-muted small text-uppercase">Sala atual</Card.Title>
                  {reserva?.sala ? (
                    <>
                      <p><strong>{reserva.sala.numero}</strong> - {reserva.sala.tipo}</p>
                      <p className="text-muted mb-0">{reserva.sala.lotacao} pessoas, {reserva.sala.maquinas_qtd} máquinas</p>
                    </>
                  ) : (
                    <p className="text-muted">Nenhuma sala atual.</p>
                  )}
                </Card.Body>
              </Card> */}

              <Card className="container-style h-100 flex-fill">
                <Card.Body>
                  <Card.Title className="text-muted small text-uppercase">Nova sala</Card.Title>
                  {salaTroca ? (
                    <>
                      <p><strong>{salaTroca.numero}</strong> - {salaTroca.tipo}</p>
                      <p className="text-muted mb-0">{salaTroca.lotacao} pessoas, {salaTroca.maquinas_qtd} máquinas</p>
                    </>
                  ) : (
                    <p className="text-muted">Nenhuma sala selecionada.</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col md={12}>
              <FiltrosContainer title='Datas' className="container-style p-3" ><DatasBadge dataAtual={reserva.data} datas={salas?.datas} /></FiltrosContainer>
            </Col>
            <Col>
              <TableSalasDisponiveisTroca
                data={salas}
                onPageChange={(page) => buscarSalasDisponiveisTroca(null, page)}
                onReservar={salaSelecionada}
              />
            </Col>

          </Row>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <CancelarButton onClick={handleCancel} />
          <SalvarButton onClick={() => onConfirm(salaTroca.id)} disabled={!salaTroca} >Aplicar Edição</SalvarButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
