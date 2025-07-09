import { Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { converterData, diaSemana } from '@/dates';
import { PencilSquare, Laptop, Clock, People, Person, Building, Book } from 'react-bootstrap-icons';


export default function EditarReservaModal({
  show,
  onCancel,
  reserva,
  onSubmit,
  formData,
  setFormData,
  onTrocarSala,
}) {

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!reserva) return null;

  return (
    <>
      <Modal
        show={show}
        onHide={onCancel}
        centered
        size="lg"
        animation
      >
        <Modal.Header closeButton className='pb-1' >
          <Modal.Title>
            <PencilSquare className="me-2" />
            Editar Reserva
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">
            <Col md={12} >
              <div>
                <span className="mx-2 fw-semibold text-uppercase small text-muted">Reserva</span>
                <Card className="shadow-sm  rounded-4">
                  <Card.Body>
                    <Card.Title className="mb-3">
                      {converterData(reserva.data)} ({diaSemana(reserva.data)})
                    </Card.Title>
                    <p className="d-flex mb-0 align-items-center">
                      <Clock size={18} className="me-2" />
                      {reserva.turma.turno}
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </Col>
            <Col lg={12} >
              <Row className="g-3 d-flex align-items-stretch">
                <Col xs={12} md={6} className="d-flex">
                  <div className="d-flex flex-column w-100">
                    <span className="mx-2 fw-semibold text-uppercase small text-muted">Sala </span>
                    <Card className="shadow-sm rounded-4 flex-grow-1">
                      <Card.Body>

                        <Card.Title className="d-flex align-items-center justify-content-between mb-3">
                          <span>{reserva.sala.numero} - {reserva.sala.tipo}</span>
                          <Button variant="outline-primary" className="btn-sm" onClick={onTrocarSala}>
                            Trocar Sala
                          </Button>
                        </Card.Title>
                        <p className="d-flex align-items-center mb-2">
                          <Building size={18} className="me-2" /> {reserva.sala.unidade} unidade
                        </p>
                        <p className="d-flex align-items-center mb-2">
                          <People size={18} className="me-2" /> {reserva.sala.lotacao} pessoas
                        </p>
                        <p className="d-flex align-items-center mb-0">
                          <Laptop size={18} className="me-2" /> {reserva.sala.maquinas_qtd} máquinas
                        </p>

                      </Card.Body>
                    </Card>
                  </div>
                </Col>

                {/* Coluna Turma */}
                <Col xs={12} md={6} className="d-flex">
                  <div className="d-flex flex-column w-100">
                    <span className=" mx-2 fw-semibold text-uppercase small text-muted">Turma</span>
                    <Card className="shadow-sm rounded-4 flex-grow-1">
                      <Card.Body>
                        <Card.Title className="d-flex align-items-center justify-content-between mb-3">
                          <span title={reserva.turma.nome} className="text-truncate me-2 " >{reserva.turma.nome}</span>
                          <Button variant="outline-primary" className="btn-sm">
                            Editar Turma
                          </Button>
                        </Card.Title>
                        <p className="d-flex align-items-center mb-2 text-truncate" >
                          <Person size={18} className="me-2" /> {reserva.turma.docente}
                        </p>
                        <p className="d-flex align-items-center mb-2">
                          <Book size={18} className="me-2" /> {reserva.turma.tipo}
                        </p>
                        <p className="d-flex align-items-center mb-0">
                          <People size={18} className="me-2" /> {reserva.turma.lotacao} alunos
                        </p>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col md={12} >
              <Form id="form-editar-reserva">
                <Form.Group className="form-floating">
                  <Form.Control
                    type="text"
                    id="inp-responsavel-cadastro"
                    name="responsavel_cadastro"
                    placeholder="Responsável Cadastro"
                    className="shadow-sm rounded-3"
                    value={formData.responsavel_cadastro}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                  <Form.Label htmlFor="inp-responsavel-cadastro">Responsável pelo Cadastro</Form.Label>
                </Form.Group>
              </Form>
            </Col>
          </Row>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" className='shadow rounded-3' onClick={onCancel}>
            {/* <XCircle className="me-1" />  */}
            Cancelar
          </Button>
          <Button variant="primary" className='shadow rounded-3' onClick={onSubmit}>
            {/* <Save className="me-1" />  */}
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
