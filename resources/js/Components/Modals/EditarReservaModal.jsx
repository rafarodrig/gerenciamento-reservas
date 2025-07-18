import { Modal, Form, Row, Col, Card } from 'react-bootstrap';
import { converterData, diaSemana } from '@/dates';
import { Clock, } from 'react-bootstrap-icons';
import CancelarButton from '../Buttons/CancelarButton';
import SalvarButton from '../Buttons/SalvarButton';
import SalaCard from '../Cards/SalaCard';
import TurmaCard from '../Cards/TurmaCard';
import { PenSquare } from 'lucide-react';


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
            <PenSquare className="me-2" />
            Editar Reserva
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">
            <Col md={12} >
              <div>
                {/* <span className="mx-2 fw-semibold text-uppercase small text-muted">Reserva</span> */}
                <Card className="container-style">
                  <Card.Body>
                    <Card.Title className="d-flex align-items-center justify-content-between mb-2">
                      {converterData(reserva.data)} ({diaSemana(reserva.data)})
                      <span className='tw-badge tw-badge--blue-lg'>Reserva</span>
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
                    {/* <span className="mx-2 fw-semibold text-uppercase small text-muted">Sala </span> */}
                    <SalaCard onTrocarSala={onTrocarSala} isEditing={true} sala={reserva.sala} badge={<span className='tw-badge tw-badge--blue-lg'>Sala</span>} />
                  </div>
                </Col>

                {/* Coluna Turma */}
                <Col xs={12} md={6} className="d-flex">
                  <div className="d-flex flex-column w-100">
                    {/* <span className=" mx-2 fw-semibold text-uppercase small text-muted">Turma</span> */}
                    <TurmaCard turma={reserva.turma} badge={<span className='tw-badge tw-badge--blue-lg'>Turma</span>} />
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
          <CancelarButton onClick={onCancel} />
          <SalvarButton onClick={onSubmit} />
        </Modal.Footer>
      </Modal>
    </>
  );
}
