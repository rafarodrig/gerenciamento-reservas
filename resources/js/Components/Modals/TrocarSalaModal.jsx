import { Modal, Form, Col, Row, Card, ListGroup, Container } from 'react-bootstrap';
import TableSalasDisponiveisTroca from '../Tables/SalasDisponiveisTrocaTable';
import { useState } from 'react';
import FiltrosContainer from '../Filtros/FiltrosContainer';
import DatasBadge from '../Filtros/DatasBadge';
import { DoorOpen, PenSquare } from 'lucide-react';
import CancelarButton from '../Buttons/CancelarButton';
import SalvarButton from '../Buttons/SalvarButton';
import SalaCard from '../Cards/SalaCard';
import PaginationControlls from '../Pagination/PaginationControlls';
import { api } from '@/services/api';

export default function TrocarSalaModal({
  show,
  onConfirm,
  onCancel,
  reserva,
  setAlert,
}) {
  const [salaTroca, setSalaTroca] = useState(null);
  const [paginationData, setPaginationData] = useState(null);
  const [editarRegistro, setEditarRegistro] = useState('atual');
  const [currentPage, setCurrentPage] = useState(1);
  const [datas, setDatas] = useState([])


  const handleChange = (e) => {
    setEditarRegistro(e.target.value);
    setCurrentPage(1)
  };

  const handleCancel = () => {
    onCancel()
    setSalaTroca(null)
  }

  const salaSelecionada = async (salaId) => {
    try {
      // (Opcional) Ative um loading visual aqui, se quiser
      const res = await api.get(`/salas/${salaId}`);

      if (res?.data) {
        setSalaTroca(res.data); // Define a nova sala selecionada
        setAlert({ show: true, type: "primary", message: `Sala ${res.data.numero} da unidade ${res.data.unidade} foi selecionada` })
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

  // if (!salas) return null;

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
              <Container className="container-style p-3 p-md-3 d-flex flex-column flex-md-row gap-4 align-items-center justify-content-center">
                <div className="list-group list-group-radio d-grid  gap-2 border-0">
                  {/* Item 1 */}
                  <div className="position-relative">
                    <input
                      type="radio"
                      name="editar_reserva"
                      id="editar-atual"
                      value="atual"
                      className="form-check-input list-group-item-check position-absolute top-50 end-0 me-3 fs-5"
                      style={{ zIndex: 1 }}
                      defaultChecked
                      onChange={handleChange}
                    />
                    <Form.Check.Label
                      htmlFor="editar-atual"
                      className="list-group-item py-3 pe-5"
                    >
                      <strong className="fw-semibold">Editar somente este registro</strong>
                      <span className="d-block small opacity-75">
                        Altere apenas esta reserva individualmente.
                      </span>
                    </Form.Check.Label>
                  </div>

                  {/* Item 2 */}
                  <div className="position-relative">
                    <input
                      type="radio"
                      name="editar_reserva"
                      id="editar-todos"
                      value="todos"
                      className="form-check-input list-group-item-check position-absolute top-50 end-0 me-3 fs-5"
                      style={{ zIndex: 1 }}
                      onChange={handleChange}
                    />
                    <Form.Check.Label
                      htmlFor="editar-todos"
                      className="list-group-item py-3 pe-5"
                    >
                      <strong className="fw-semibold">Editar todos os registros relacionados</strong>
                      <span className="d-block small opacity-75">
                        Todos os registros relacionados (mesma turma e sala) serão modificados.
                      </span>
                    </Form.Check.Label>
                  </div>

                  {/* Item 3 */}
                  <div className="position-relative">
                    <input
                      type="radio"
                      name="editar_reserva"
                      id="editar-apatir"
                      value="apartir"
                      className="form-check-input list-group-item-check position-absolute top-50 end-0 me-3 fs-5"
                      style={{ zIndex: 1 }}
                      onChange={handleChange}
                    />
                    <Form.Check.Label
                      htmlFor="editar-apatir"
                      className="list-group-item py-3 pe-5"
                    >
                      <strong className="fw-semibold">Editar registros a partir deste</strong>
                      <span className="d-block small opacity-75">
                        Edita este e os futuros registros relacionados.
                      </span>
                    </Form.Check.Label>
                  </div>

                </div>
              </Container>

            </Col>

            <Col xs={12} lg={6} className="d-flex flex-column gap-3">
              {/* <Col> */}
              <div className="d-flex flex-column w-100">
                {/* <span className="mx-2 fw-semibold text-uppercase small text-muted">Sala Atual</span> */}
                <SalaCard className='h-100 flex-fill p-2' sala={reserva?.sala} badge={<span className='tw-bage tw-badge--blue-lg' >Sala Atual</span>} />
              </div>
              {/* </Col> */}

              {/* <Col> */}
              <div className="d-flex flex-fill flex-column w-100">
                {/* <span className="mx-2 fw-semibold text-uppercase small text-muted">Nova Sala</span> */}
                {salaTroca ? (

                  <SalaCard className='p-2 flex-fill' sala={salaTroca} badge={<span className='tw-bage tw-badge--blue-lg' >Sala Nova</span>} />

                ) : (
                  <Card className=' flex-fill container-style ' >
                    <Card.Body className='d-flex align-items-center justify-content-center' >
                      <span className="text-muted">Nenhuma sala selecionada.</span>
                    </Card.Body>
                  </Card>
                )}
              </div>
              {/* </Col> */}
            </Col>
            <Col md={12}>
              <FiltrosContainer title='Datas' className="container-style p-3" >
                <DatasBadge dataAtual={reserva?.data} datas={datas} />
              </FiltrosContainer>

            </Col>
            <Col>

              <Container className='tabela-salas-troca container-style p-3'>
                <Card className="border-0">
                  <Card.Header className="d-flex align-items-center">
                    <DoorOpen className="me-2 text-primary" />
                    <strong>Salas disponíveis </strong>
                  </Card.Header>
                  <Card.Body className="border-bottom scrollable-container p-0 " style={{ height: '400px' }}>

                    <TableSalasDisponiveisTroca
                      reserva={reserva}
                      editarRegistro={editarRegistro}
                      currentPage={currentPage}
                      onReservar={salaSelecionada}
                      setPaginationData={setPaginationData}
                      setDatas={setDatas}
                    />
                  </Card.Body>
                </Card>
                <PaginationControlls
                  className={"d-flex  mt-3 justify-content-center "}
                  paginationData={paginationData}
                  handlePageChange={(page) => setCurrentPage(page)}
                />
              </Container>

            </Col>

          </Row>
        </Modal.Body>

      </Form>
      <Modal.Footer className="justify-content-end">
        <CancelarButton onClick={handleCancel} />
        <SalvarButton isEditing={true} onClick={() => onConfirm(salaTroca.id)} disabled={!salaTroca}></SalvarButton>
      </Modal.Footer>
    </Modal >
  );
}
