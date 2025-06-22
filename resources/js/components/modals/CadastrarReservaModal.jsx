import { useEffect, useState} from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col, Card, ToggleButton } from 'react-bootstrap';
import {
  Pencil,
  Save,
  XCircle,
  Building,
  People,
  Laptop,
  Calendar3
} from 'react-bootstrap-icons';
import { converterData } from '@/dates'; // ajuste conforme seu projeto
import OptionsTurmasDisponiveis from '../OptionsTurmasDisponiveis';

export default function CadastrarReservaModal({
  show,
  sala,
  reserva,
  turmas,
  formData,
  setFormData,
  setEditarTurma,
  onSubmit,
  onCancel,
  turmaCadastrada,
}) {
  


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
    <Modal show={show} onHide={onCancel} centered size="lg" animation>
      <Modal.Header closeButton className="bg-primary text-white" data-bs-theme="dark">
        <Modal.Title>
          <Pencil className="me-2" />
          Cadastrar Reserva
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="form-cadastrar-reserva" onSubmit={(e) => { onSubmit(e);}}>
          <Row className="g-4 mb-4">
            <Col md={6}>
              <Card className="shadow border-1 h-100">
                <Card.Body>
                  <Card.Title className="mb-3">
                    <Building className="me-2" /> Sala
                  </Card.Title>
                  <p><strong>Número:</strong> {sala.numero} - {sala.tipo}</p>
                  <p><strong>Unidade:</strong> {sala.unidade}</p>
                  <p><People className="me-1" /> {sala.lotacao} pessoas</p>
                  <p><Laptop className="me-1" /> {sala.maquinas_qtd} máquinas</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow border-1 h-100">
                <Card.Body>
                  <Card.Title className="mb-3">
                    <Calendar3 className="me-2" /> Reserva
                  </Card.Title>
                  <p><strong>Data:</strong> {converterData(reserva.data_inicio)}</p>
                  <p><strong>Turno:</strong> {reserva.turno}</p>
                  <p><strong>Tipo:</strong> {reserva.reserva_tipo}</p>
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

                {turmaCadastrada && (
                <Card className=" shadow border-1 h-100 ">
                    <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                    <span className='me-2'><strong>{turmaCadastrada.nome || <em className="text-muted">--</em>}</strong></span>
                    <div className='d-inline-flex gap-2'>
                        <Button variant="outline-light" size="sm" onClick={() => { setEditarTurma(turmaCadastrada.id)}}>
                        <Pencil className="me-1"  /> Editar
                        </Button>
                        <Button variant="outline-light" size="sm" onClick={() => console.log("Excluir turma")}>
                        <XCircle className="me-1" /> Excluir
                        </Button>
                    </div>
                    </Card.Header>

                    <Card.Body>
                      <div>
                        <Row className="mb-2">
                            <Col md={6}>
                            <p className="mb-1"><strong>Docente:</strong> {turmaCadastrada.docente || <em className="text-muted">--</em>}</p>
                            </Col>
                            <Col md={6}>
                            <p className="mb-1"><strong>Turno:</strong> {turmaCadastrada.turno || <em className="text-muted">--</em>}</p>
                            </Col>
                            {/* <Col md={6}>
                            <p className="mb-1"><strong>Tipo:</strong> {turmaCadastrada.tipo || <em className="text-muted">--</em>}</p>
                            </Col> */}
                        </Row>
                        <Row className="mb-2">
                            <Col md={6}>
                            <p className="mb-1"><strong>Curso:</strong> {turmaCadastrada.curso || <em className="text-muted">--</em>}</p>
                            </Col>
                            <Col md={6}>
                            <p className="mb-1"><strong>Lotação:</strong> {turmaCadastrada.lotacao || <em className="text-muted">--</em>}</p>
                            </Col>
                        </Row>
                        </div>  
                    </Card.Body>
                </Card>
                )}
              
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
