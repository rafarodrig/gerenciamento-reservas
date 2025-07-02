import axios from 'axios';
import { Modal, Button, Form, Row, Col, Card, ToggleButton } from 'react-bootstrap';
import {
  Save,
  XCircle,
} from 'react-bootstrap-icons';
import CardTurmaCadastrada from '../Card/CardTurmaCadastrada';
import { converterData } from '@/dates'; // ajuste conforme seu projeto
import OptionsTurmasDisponiveis from '../OptionsTurmasDisponiveis';
import { 
  Building, 
  LaptopMinimal, 
  Users, 
  SquarePen, 
  BookOpen,
  Clock 
} from 'lucide-react';


export default function CadastrarReservaModal({
  show,
  sala,
  reserva,
  turmas,
  formData,
  setFormData,
  setEditarTurma,
  setDeletarTurma,
  onResult,
  onCancel,
  turmaCadastrada,
}) {

    const handleSubmit = (e) => {
    e.preventDefault();
  
    const payload = {
      sala: sala.id,
      responsavel_cadastro: formData.responsavel_cadastro,
      turma: formData.turma || null,
      datas: formData.datas
    };
  
    if (!formData.turma) {
      // Nova turma: incluir dados obrigatórios
      Object.assign(payload, {
        nome: formData.nome,
        curso: formData.curso,
        turno: formData.turno,
        docente: formData.docente,
        reserva_tipo: formData.reserva_tipo,
        lotacao: parseInt(formData.lotacao, 10),
      });
    }
    axios.post('/reservas', payload)
    .then((res) => {
      onResult({ show: true, type: "success", message: res.data.message });
    })
    .catch((error) => {
      if (error.response?.data?.errors) onResult({ show: true, type: "danger", message: error });
      });
    };


const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'radio' ? value : value,
    }));

    if (name === 'cadastro_turma' && value === 'nova') {
      setFormData((prev) => ({
        ...prev,
        turma: ""
      }));
    }

  };  

  if (!sala || !reserva) return null;

  return (
    <Modal show={show} className='modal-custom' onHide={onCancel} centered size="lg" animation>
      <Modal.Header closeButton>
        <Modal.Title>
          <SquarePen size={28} className="me-2" />
          Cadastrar Reserva
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="form-cadastrar-reserva"  onSubmit={handleSubmit}>
          <Row className="g-4 mb-4">
            <Col md={6}>
                <Card className="shadow h-100 rounded-4" >
                  <Card.Body>
                    <span className="text-secondary">Sala</span>
                    <Card.Title className="mb-3 fs-">{sala.numero} - {sala.tipo}</Card.Title>
                    <p className='d-flex align-items-center mb-2'><Building size={18} className="me-2" /> {sala.unidade} unidade</p>
                    <p className='d-flex align-items-center mb-2'><Users size={18} className="me-2" /> {sala.lotacao} pessoas</p>
                    <p className='d-flex align-items-center mb-2'><LaptopMinimal size={18} className="me-2" /> {sala.maquinas_qtd} máquinas</p>
                  </Card.Body>
                </Card>
              </Col>

            <Col md={6}>
              <Card className="shadow h-100 rounded-4">
                <Card.Body>
                  <span className="text-secondary ">Reserva</span>
                  <Card.Title className="mb-3">
                    {converterData(reserva.data_inicio)}
                  </Card.Title>
                  <p className='d-flex align-items-center mb-2'><Clock size={18} className="me-2" />{reserva.turno}</p>
                  <p className='d-flex align-items-center mb-2'><BookOpen size={18} className="me-2" />{reserva.reserva_tipo}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="text-center mb-2">
            <Col>
              <ToggleButton
                type="radio"
                name="cadastro_turma"
                id="btn-buscar-turma"
                value="cadastrada"
                className='shadow border-0 mb-4'
                checked={formData.cadastro_turma === 'cadastrada'}
                onChange={handleChange}
              >Buscar Turma</ToggleButton>

              <Form.Group className="form-floating">
                <Form.Select
                    id="turma-cadastrada"
                    name="turma"
                    onChange={handleChange}
                    value={formData.turma}
                    className='shadow border-1'
                    disabled={formData.cadastro_turma !== 'cadastrada'}
                    required
                    >
                    <option value="">Selecione a turma</option>
                    <OptionsTurmasDisponiveis turmas={turmas} />
                </Form.Select>
                <Form.Label htmlFor="turma-cadastrada">Turma</Form.Label>
                    </Form.Group>
                  
            </Col>

            <Col>
              <ToggleButton
                type="radio"
                name="cadastro_turma"
                id="btn-cadastro-turma"
                value="nova"
                checked={formData.cadastro_turma === 'nova'}
                onChange={handleChange}
                className='shadow border-0 mb-4 '
              >Cadastrar Turma</ToggleButton>
              <Form.Group className="form-floating">
                <Form.Control
                  type="text"
                  className='shadow border-1'
                  id="inp-cadastrar-nome"
                  name="nome"
                  placeholder="Nome"
                  autoComplete="off"
                  value={formData.nome}
                  onChange={handleChange}
                  disabled={formData.cadastro_turma !== 'nova'}
                  required
                />
                <Form.Label htmlFor="inp-cadastrar-nome">Nome</Form.Label>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
                <CardTurmaCadastrada 
                  setDeletarTurma={(id)=> setDeletarTurma(id)} 
                  setEditarTurma={(id)=> setEditarTurma(id)} 
                  turmaCadastrada={turmaCadastrada}
                />
            </Col>
            
            <Col>
              <Form.Group className="form-floating mb-2">
                <Form.Control
                  className='shadow border-1'
                  type="text"
                  id="inp-cadastrar-docente"
                  name="docente"
                  placeholder="Docente"
                  value={formData.docente}
                  onChange={handleChange}
                  disabled={formData.cadastro_turma !== 'nova'}
                  required
                />
                <Form.Label htmlFor="inp-cadastrar-docente">Docente</Form.Label>
              </Form.Group>

              <Form.Group className="form-floating mb-2">
                <Form.Control
                  className='shadow border-1'
                  type="text"
                  id="inp-cadastrar-curso"
                  name="curso"
                  placeholder="Curso"
                  value={formData.curso}
                  onChange={handleChange}
                  disabled={formData.cadastro_turma !== 'nova'}
                  required
                />
                <Form.Label htmlFor="inp-cadastrar-curso">Curso</Form.Label>
              </Form.Group>

              <Form.Group className="form-floating mb-2">
                <Form.Control
                  type="number"
                  className='shadow border-1'
                  id="inp-cadastrar-lotacao"
                  name="lotacao"
                  placeholder="Lotação"
                  min="1"
                  value={formData.lotacao}
                  onChange={handleChange}
                  disabled={formData.cadastro_turma !== 'nova'}
                  required
                />
                <Form.Label htmlFor="inp-cadastrar-lotacao">Lotação</Form.Label>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="form-floating mt-3">
            <Form.Control
              type="text"
              id="inp-cadastrar-responsavel-cadastro"
              name="responsavel_cadastro"
              placeholder="Responsável Cadastro"
              autoComplete="off"
              className='shadow border-1'
              value={formData.responsavel_cadastro}
              onChange={handleChange}
              required
            />
            <Form.Label htmlFor="inp-cadastrar-responsavel-cadastro">Responsável Cadastro</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          <XCircle className="me-1" /> Cancelar
        </Button>
        <Button type="submit" form="form-cadastrar-reserva" variant="primary" >
          <Save className="me-1" /> Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
