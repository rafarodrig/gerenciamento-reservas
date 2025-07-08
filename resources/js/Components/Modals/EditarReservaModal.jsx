import { Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';
import {
  Building,
  Users,
  LaptopMinimal,
  UserRound,
  Clock,
  BookOpen,
  SquarePen,
} from 'lucide-react';
import { converterData, diaSemana } from '@/dates';


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
            <SquarePen className="me-2" />
            Editar Reserva
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className=" row-cols-md-2 g-3 ">
            <Col md={12} >
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
            </Col>
            <Col md={6} >
              <span className="mx-2 fw-semibold text-uppercase small text-muted">Sala </span>
              <Card className="shadow-sm h-100 rounded-4">
                <Card.Body>
                  <div>
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
                      <Users size={18} className="me-2" /> {reserva.sala.lotacao} pessoas
                    </p>
                    <p className="d-flex align-items-center mb-0">
                      <LaptopMinimal size={18} className="me-2" /> {reserva.sala.maquinas_qtd} máquinas
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} >
              <span className=" mx-2 fw-semibold text-uppercase small text-muted">Turma</span>
              <Card className="shadow-sm h-100 rounded-4">
                <Card.Body >
                  <div>
                    <Card.Title className="d-flex align-items-center justify-content-between mb-3">
                      <span title={reserva.turma.nome} className="text-truncate me-2 " style={{ maxWidth: '220px' }}>{reserva.turma.nome}</span>
                      <Button variant="outline-primary" className="btn-sm">
                        Editar Turma
                      </Button>
                    </Card.Title>
                    <p className="d-flex align-items-center mb-2 text-truncate" style={{ maxWidth: '200px' }}>
                      <UserRound size={18} className="me-2" /> {reserva.turma.docente}
                    </p>
                    <p className="d-flex align-items-center mb-2">
                      <BookOpen size={18} className="me-2" /> {reserva.turma.tipo}
                    </p>
                    <p className="d-flex align-items-center mb-0">
                      <Users size={18} className="me-2" /> {reserva.turma.lotacao} alunos
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} className='mt-5'>
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
