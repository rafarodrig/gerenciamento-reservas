import { Modal, Button, Form, Row, Col, Card} from 'react-bootstrap';
import {
  Building,
  Users,
  LaptopMinimal,
  UserRound,
  Clock,
  BookOpen,
  SquarePen,
  Calendar,
} from 'lucide-react';
import OptionsTurmas from '../OptionsTurmasTroca';
import OptionsSalas from '../OptionsSalas';
import { converterData, diaSemana } from '@/dates';
import CardTurmaCadastrada from '../Card/CardTurmaCadastrada';


export default function EditarReservaModal({ 
  show, 
  onCancel, 
  reserva, 
  onSubmit, 
  formData, 
  setFormData,
}) {
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!reserva) return null;

  console.log(reserva)

  return (
      <>
    <Modal 
    show={show} 
    onHide={onCancel} 
    centered size="lg" animation>
      <Modal.Header closeButton className="bg-primary text-white" data-bs-theme="dark">
        <Modal.Title>
          <SquarePen className="me-2" />
          Editar Reserva
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
            <Row className="g-3 mb-4">
              <Col md={12}>
                <Card className="shadow h-100 rounded-4">
                  <Card.Body>
                    <span className="text-secondary">Reserva</span>
                    <Card.Title className="mb-3"><Calendar className="me-2" />{converterData(reserva.data)} ({diaSemana(reserva.data)}) </Card.Title>
                    <p className='fs-5'><Clock className="me-2" />{reserva.turma.turno}</p>
                    <p></p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="shadow h-100 rounded-4">
                  <Card.Body>
                    <span className="text-secondary">Sala</span>
                    <Card.Title className="mb-3">{reserva.sala.numero} - {reserva.sala.tipo}</Card.Title>
                    <p><Building size={18} className="me-2" /> {reserva.sala.unidade} unidade</p>
                    <p><Users size={18} className="me-2" /> {reserva.sala.lotacao} pessoas</p>
                    <p><LaptopMinimal size={18} className="me-2" /> {reserva.sala.maquinas_qtd} máquinas</p>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="shadow h-100 rounded-4">
                  <Card.Body>
                    <span className="text-secondary ">Turma</span>
                    <Card.Title className="mb-3">{reserva.turma.nome}</Card.Title>
                    <p><UserRound size={18} className="me-2" /> {reserva.turma.docente}</p>
                    <p><BookOpen size={18} className="me-2" />{reserva.turma.tipo}</p>
                    <p><Users size={18} className="me-2" /> {reserva.turma.lotacao} alunos</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Form id="form-editar-reserva">
              <Form.Group className="mb-3 form-floating ">
                <Form.Control
                  type="text"
                  id="inp-responsavel-cadastro"
                  name="responsavel_cadastro"
                  placeholder="Responsável Cadastro"
                  className='shadow rounded-3'
                  value={formData.responsavel_cadastro}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
                <Form.Label htmlFor="inp-responsavel-cadastro">Responsável pelo Cadastro</Form.Label>
              </Form.Group>

              <Row className="g-3">
                {/* <CardTurmaCadastrada 
                turmaCadastrada={reserva.turma_id} 
                setEditarTurma 
                setDeletarTurma
                /> */}
                {/* <Col md={6}>
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
                </Col> */}

                {/* <Col md={6}>
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
                </Col> */}
              </Row>
            </Form>
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
