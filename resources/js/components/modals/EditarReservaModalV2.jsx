import { Modal, Button, Form, Row, Col, Card} from 'react-bootstrap';
import { Building, People, Laptop, Calendar3, Pencil, Save, XCircle } from 'react-bootstrap-icons';
import OptionsTurmas from '../OptionsTurmas';
import OptionsSalas from '../OptionsSalas';
import { converterData } from '@/dates';

export default function EditarReservaModal({ 
  show, 
  onCancel, 
  reserva, 
  onSubmit, 
  formData, 
  setFormData, 
  // onExited
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
    // onExited={onExited}
    centered size="lg" animation>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <Pencil className="me-2" />
          Editar Reserva
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
            <Row className="g-3 mb-4">
              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title className="mb-3">
                      <Building className="me-2" /> Sala
                    </Card.Title>
                    <p><strong>Número:</strong> {reserva.sala.numero} - {reserva.sala.tipo}</p>
                    <p><strong>Unidade:</strong> {reserva.sala.unidade}</p>
                    <p><People className="me-1" /> {reserva.sala.lotacao} pessoas</p>
                    <p><Laptop className="me-1" /> {reserva.sala.maquinas_qtd} máquinas</p>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title className="mb-3">
                      <Calendar3 className="me-2" /> Reserva
                    </Card.Title>
                    <p><strong>Data:</strong> {converterData(reserva.data)}</p>
                    <p><strong>Turno:</strong> {reserva.turma.turno}</p>
                    <p><strong>Tipo:</strong> {reserva.turma.tipo}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Form id="form-editar-reserva">
              <Form.Group className="mb-3 form-floating">
                <Form.Control
                  type="text"
                  id="inp-responsavel-cadastro"
                  name="responsavel_cadastro"
                  placeholder="Responsável Cadastro"
                  value={formData.responsavel_cadastro}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
                <Form.Label htmlFor="inp-responsavel-cadastro">Responsável pelo Cadastro</Form.Label>
              </Form.Group>

              <Row className="g-3">
                <Col md={6}>
                  <Form.Group className="form-floating">
                    <Form.Select
                      id="sala-cadastrada"
                      name="sala"
                      onChange={handleChange}
                      value={formData.sala}
                      required
                    >
                      <option value={formData.sala.id}>
                        {reserva.sala.numero} - Unidade {reserva.sala.unidade}
                      </option>
                      <OptionsSalas id={reserva.id}  />
                    </Form.Select>
                    <Form.Label htmlFor="sala-cadastrada">Sala</Form.Label>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="form-floating">
                    <Form.Select
                      id="turma-cadastrada"
                      name="turma"
                      onChange={handleChange}
                      value={formData.turma}
                      required
                    >
                      <option value={reserva.turma.id}>{reserva.turma.nome}</option>
                      <OptionsTurmas id={reserva.id} />
                    </Form.Select>
                    <Form.Label htmlFor="turma-cadastrada">Turma</Form.Label>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          <XCircle className="me-1" /> Cancelar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          <Save className="me-1" /> Salvar Alterações
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  ); 
}
