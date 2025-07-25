import { api } from '@/services/api';
import { Modal, Form, Row, Col, Card, ToggleButton } from 'react-bootstrap';
import { converterData } from '@/dates'; // ajuste conforme seu projeto
import OptionsTurmasDisponiveis from '../OptionsTurmasDisponiveis';
import { useState } from 'react';
import CancelarButton from '../Buttons/CancelarButton';
import SalvarButton from '../Buttons/SalvarButton';
import SalaCard from '../Cards/SalaCard';
import { BookOpen, Clock1, Clock10, PenSquare, PlusCircle } from 'lucide-react';
import TurmaCard from '../Cards/TurmaCard';



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
  setCadastrarTurma,
  setAlert
}) {

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleCancel = () => {
    setErrors(null);
    onCancel()
  }


  const handleSubmit = (e) => {
    setLoading(true)

    e.preventDefault();
    setErrors(null)
    const payload = {
      sala: sala.id,
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
    api.post('/reservas', payload)
      .then((res) => {
        onResult({ show: true, type: "success", message: res.data.message });
      })
      .catch((error) => {

        setErrors(error.response.data.errors);
        setAlert({ show: true, type: "danger", message: error.response.data.message })
        console.log(error)
        //  onResult({ show: true, type: "danger", message: error.response.data.message });
      }).finally(() => {
        setLoading(false);
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
    <Modal show={show} onHide={handleCancel} centered size="lg" animation>
      <Modal.Header closeButton>
        <Modal.Title>
          <PlusCircle className="me-2" />
          Cadastrar Reserva
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="form-cadastrar-reserva" onSubmit={handleSubmit}>
          <Row className="g-3 align-items-stretch ">

            {/* Coluna Sala */}

            <Col xs={12} md={6} className="d-flex">
              <div className="d-flex flex-column w-100">
                {/* <span className="mx-2 fw-semibold text-uppercase small text-muted">Sala </span> */}
                <SalaCard sala={sala} badge={<span className='tw-badge tw-badge--blue-lg'>Sala</span>} />
              </div>
            </Col>

            {/* Coluna Reserva */}
            <Col xs={12} md={6} className="d-flex">
              <div className="d-flex flex-column w-100">
                {/* <span className="mx-2 fw-semibold text-uppercase small text-muted">Reserva</span> */}
                <Card className="container-style flex-grow-1">
                  <Card.Body className="d-flex justify-content-between">
                    <div className="text-truncate">
                      <Card.Title className="d-flex align-items-center justify-content-between mb-3">
                        <span>{converterData(reserva.data_inicio)}</span>
                      </Card.Title>
                      <p className="d-flex align-items-center mb-2">
                        <Clock10 size={18} className="me-2" /> {reserva.turno}
                      </p>
                      <p className="d-flex align-items-center mb-2">
                        <BookOpen size={18} className="me-2" /> {reserva.reserva_tipo}
                      </p>
                    </div>

                    <div className="d-flex flex-column justify-content-between align-items-end">
                      <div> <span className='tw-badge tw-badge--blue-lg'>Reserva</span></div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>

          <Row className=" mt-4 text-center mb-2">
            <Col>
              <ToggleButton
                type="radio"
                name="cadastro_turma"
                id="btn-buscar-turma"
                value="cadastrada"
                className='shadow-sm border-0 mb-4'
                checked={formData.cadastro_turma === 'cadastrada'}
                onChange={handleChange}

              >Buscar Turma</ToggleButton>

              <Form.Group className="form-floating">
                <Form.Select
                  id="turma-cadastrada"
                  name="turma"
                  onChange={handleChange}
                  value={formData.turma}
                  className='shadow-sm border-1'
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
                // onClick={setCadastrarTurma}
                onChange={handleChange}
                className='shadow-sm border-0 mb-4 '
              >Cadastrar Turma</ToggleButton>

              <Form.Group className="form-floating">
                <Form.Control
                  type="text"
                  className='shadow-sm border-1'
                  id="inp-cadastrar-nome"
                  name="nome"
                  placeholder="Nome"
                  autoComplete="off"
                  value={formData.nome}
                  onChange={handleChange}
                  isInvalid={!!errors?.nome}
                  disabled={formData.cadastro_turma !== 'nova'}
                  required
                />
                <Form.Label htmlFor="inp-cadastrar-nome">Nome</Form.Label>

                <Form.Control.Feedback type="invalid">
                  {errors?.nome}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6} >
              <TurmaCard
                turma={turmaCadastrada}
                setDeletarTurma={(turma) => setDeletarTurma(turma)}
                setEditarTurma={(turma) => setEditarTurma(turma)}
                badge={<span className='tw-badge tw-badge--blue-lg '>Turma</span>}
              />
            </Col>

            <Col md={6}>
              <Form.Group className="form-floating mb-2">
                <Form.Control
                  className='shadow-sm border-1'
                  type="text"
                  id="inp-cadastrar-docente"
                  name="docente"
                  placeholder="Docente"
                  value={formData.docente}
                  isInvalid={!!errors?.docente}
                  onChange={handleChange}
                  disabled={formData.cadastro_turma !== 'nova'}
                  required
                />
                <Form.Label htmlFor="inp-cadastrar-docente">Docente</Form.Label>

                <Form.Control.Feedback type="invalid">
                  {errors?.docente}
                </Form.Control.Feedback>

              </Form.Group>

              <Form.Group className="form-floating mb-2">
                <Form.Control
                  className='shadow-sm border-1'
                  type="text"
                  id="inp-cadastrar-curso"
                  name="curso"
                  placeholder="Curso"
                  value={formData.curso}
                  onChange={handleChange}
                  isInvalid={!!errors?.curso}
                  disabled={formData.cadastro_turma !== 'nova'}
                // required
                />
                <Form.Label htmlFor="inp-cadastrar-curso">Curso</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors?.curso}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form-floating mb-2">
                <Form.Control
                  type="number"
                  className='shadow-sm border-1'
                  id="inp-cadastrar-lotacao"
                  name="lotacao"
                  placeholder="Lotação"
                  min="1"
                  value={formData.lotacao}
                  isInvalid={!!errors?.lotacao}
                  onChange={handleChange}
                  disabled={formData.cadastro_turma !== 'nova'}
                  required
                />
                <Form.Label htmlFor="inp-cadastrar-lotacao">Lotação</Form.Label>

                <Form.Control.Feedback type="invalid">
                  {errors?.lotacao}
                </Form.Control.Feedback>

              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <CancelarButton onClick={handleCancel} />
        <SalvarButton loading={loading} form="form-cadastrar-reserva" type='submit' />
      </Modal.Footer>
    </Modal>
  );
}
