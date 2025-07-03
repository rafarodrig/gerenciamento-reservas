import React, { useState } from 'react';
import { Form, Row, Col, Button, Accordion } from 'react-bootstrap';
import { PeopleFill, CalendarEvent, ListCheck } from 'react-bootstrap-icons';
import TituloData from '@/Components/TituloData';

export default function ReservaForm({ onBuscar, numeros, pagina_titulo, dataAtualFormatada }) {
  // const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(formData);
  };

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <TituloData titulo={pagina_titulo} data={dataAtualFormatada} />

      <Accordion defaultActiveKey="0" className="mb-4">
        {/* Seção 1: Identificação */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <PeopleFill className="me-2" />
            Identificação
          </Accordion.Header>
          <Accordion.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Turma</Form.Label>
                <Form.Control
                  type="text"
                  name="turma"
                  value={formData.turma || ''}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Docente</Form.Label>
                <Form.Control
                  type="text"
                  name="docente"
                  value={formData.docente || ''}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Curso</Form.Label>
                <Form.Control
                  type="text"
                  name="curso"
                  value={formData.curso || ''}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* Seção 2: Período e Sala */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <CalendarEvent className="me-2" />
            Período e Sala
          </Accordion.Header>
          <Accordion.Body>
            <Row className="g-3">
              <Col md={4}>
                <Form.Label>De</Form.Label>
                <Form.Control
                  type="date"
                  name="data_inicio"
                  value={formData.data_inicio}
                  onChange={handleChange}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Até</Form.Label>
                <Form.Control
                  type="date"
                  name="data_fim"
                  value={formData.data_fim}
                  onChange={handleChange}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Sala</Form.Label>
                <Form.Select
                  name="sala"
                  value={formData.sala}
                  onChange={handleChange}
                >
                  <option value="">Qualquer</option>
                  {numeros.map((numero) => (
                    <option key={numero} value={numero}>
                      {numero}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* Seção 3: Filtros adicionais */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <ListCheck className="me-2" />
            Detalhes da Reserva
          </Accordion.Header>
          <Accordion.Body>
            <Row className="g-3">
              <Col md={4}>
                <Form.Label>Turno</Form.Label>
                <Form.Select
                  name="turno"
                  value={formData.turno}
                  onChange={handleChange}
                >
                  <option value="">Qualquer</option>
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label>Tipo de Reserva</Form.Label>
                <Form.Select
                  name="reserva_tipo"
                  value={formData.reserva_tipo}
                  onChange={handleChange}
                >
                  <option value="">Qualquer</option>
                  <option value="Avulsa">Avulsa</option>
                  <option value="Graduação">Graduação</option>
                  <option value="Pos-graducao">Pós-graduação</option>
                  <option value="FIC">FIC</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label>Unidade</Form.Label>
                <Form.Select
                  name="unidade"
                  value={formData.unidade}
                  onChange={handleChange}
                >
                  <option value="">Todas</option>
                  <option value="1">Unidade 1</option>
                  <option value="2">Unidade 2</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="reserva_status"
                  value={formData.reserva_status}
                  onChange={handleChange}
                >
                  <option value="Ativa">Ativa</option>
                  <option value="Inativa">Inativa</option>
                </Form.Select>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="text-center">
        <Button type="submit" variant="primary" size="lg" className="px-5">
          🔍 Buscar Reservas
        </Button>
      </div>
    </Form>
  );
}
