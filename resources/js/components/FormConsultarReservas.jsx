import React, { useState } from 'react';
import {Nav, Form, Row, Col, Button } from 'react-bootstrap';
import TituloData from '@/components/TituloData';

export default function ReservaForm({ formData: initialData, onBuscar, numeros, pagina_titulo, dataAtualFormatada }) {

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(formData); // envia para o pai
  };
    return (
<>
    <Nav >
        <Form 
        className="row g-3 form-consulta m-auto mt-5" 
        id="form-consultar-reservas"
        method="get"
        onSubmit={handleSubmit}>
        <TituloData titulo={pagina_titulo} data={dataAtualFormatada} />
        
        {/* FILTRO turma */}
        <Row className="g-3">
            <Col md={6}>
                <Form.Label htmlFor="inp-consulta-turma">Turma</Form.Label>
                <Form.Control 
                type="text"
                id="inp-consulta-turma"
                name="turma"
                value={formData.turma || ""}
                onChange={handleChange} 
                />
            </Col>

        {/* Docente */}
            <Col md={6}>
                <Form.Label htmlFor="inp-consulta-docente">Docente</Form.Label>
                <Form.Control 
                type="text" 
                id="inp-consulta-docente" 
                name="docente"
                value={formData.docente || ""} 
                onChange={handleChange} 
                />
            </Col>

        {/* Curso */}
            <Col md={3}>
                <Form.Label htmlFor="inp-consulta-curso">Curso</Form.Label>
                <Form.Control 
                type="text" 
                id="inp-consulta-curso" 
                name="curso" 
                value={formData.curso || ""}
                onChange={handleChange} 
                />
            </Col>

        {/* Data Início */}
            <Col md={3}>
                <Form.Label htmlFor="inp-consulta-data-inicio">De</Form.Label>
                <Form.Control
                type="date"
                id="inp-consulta-data-inicio"
                name="data_inicio"
                value={formData.data_inicio} 
                onChange={handleChange}
                />
            </Col>

        {/* Data Fim */}
            <Col md={3}>
                <Form.Label htmlFor="inp-consulta-data-fim">Até</Form.Label>
                <Form.Control
                type="date"
                id="inp-consulta-data-fim"
                name="data_fim"
                value={formData.data_fim}
                onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                A data final não pode ser maior que a data inicial
                </Form.Control.Feedback>
            </Col>

        {/* Sala */}
            <Col md={3}>
                <Form.Label htmlFor="inp-consulta-sala">N.º da sala</Form.Label>
                <Form.Select 
                id="inp-consulta-sala" 
                name="sala"
                value={formData.sala} 
                onChange={handleChange}
                >
                <option value="">Qualquer</option>
                {/* Dynamically inject room options here */}
                {numeros.map((numero) => <option key={numero} value={numero}>{numero}</option>)}
                </Form.Select>
            </Col>

        {/* Turno */}
            <Col md={3}>
                <Form.Label htmlFor="inp-consulta-turno">Turno</Form.Label>
                <Form.Select 
                id="inp-consulta-turno" 
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


        {/* Tipo de Reserva */}
            <Col md={3}>
                <Form.Label htmlFor="inp-consulta-reserva-tipo">
                Tipo de reserva
                </Form.Label>
                <Form.Select
                id="inp-consulta-reserva-tipo"
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
        {/* Unidade */}
            <Col md={3}>
                <Form.Label htmlFor="inp-consulta-unidade">
                Unidade
                </Form.Label>
                <Form.Select
                id="inp-consulta-unidade"
                name="unidade"
                value={formData.unidade}
                onChange={handleChange}
                >
                <option value="1">Unidade 1</option>
                <option value="2">Unidade 2</option>
                <option value="">Todas</option>
                </Form.Select>
            </Col>

        {/* Reserva Status */}
            <Col md={3}>
                <Form.Label htmlFor="inp-reserva-status">Reservas status</Form.Label>
                <Form.Select
                id="inp-reserva-status"
                name="reserva_status"
                value={formData.reserva_status}
                onChange={handleChange}
                >
                <option value="Ativa">Ativa</option>
                <option value="Inativa">Inativa</option>
                </Form.Select>
            </Col>
            
        {/* Botão Buscar */}
            <Col xs={12} className="d-flex align-items-center gap-2">
                <Button
                type="submit"
                className="btn-buscar"
                value="consultar-reservas"
                id="btn-buscar"
                variant="primary"
                >Buscar
                </Button>
            </Col>
        </Row>
        </Form>
    </Nav>
  </>);
};
