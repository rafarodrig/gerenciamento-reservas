import React, { useState } from 'react';
import { Form, Row, Col, Button, Nav } from 'react-bootstrap';
import TituloData from '@/components/TituloData';

export default function CadastrarReservaForm({ 
  formData: initialData, 
  onBuscar, 
  numeros, 
  tipos, 
  maquinasTipos, 
  pagina_titulo, 
  dataAtualFormatada, 
  dataAtual 
}) {

  const [formData, setFormData] = useState(initialData);
  const [dataFimState, setDataFimState] = useState(true);
  const [semanasState, setSemanasState] = useState(true);
  const [diasSemanaState, setDiasSemanaState] = useState(true);


  const inputState = (value) => {
    setDataFimState(true)
    setDiasSemanaState(true)
    setSemanasState(true)
    if(value === "Graduação"){
       setDataFimState(false)
       setSemanasState(false)
      } else if (value === "Pos-graduacao" ){
        setSemanasState(false)
        setDiasSemanaState(false)
    } else if (value === "FIC"){
      setSemanasState(false)
    }
  }



  const handleChange = (e) => {
    
    const { name, type, value, checked } = e.target;
    
    console.log(`name: ${name}`)
    console.log(`type: ${type}`)
    console.log(`value: ${value}`)
    console.log(`checker: ${checked}`)

    if(name === 'reserva_tipo'){
      inputState(value)
    }

    if (type === 'checkbox') {
      setFormData((formData) => {
        const dias = new Set(formData.dias_semana);
        checked ? dias.add(value) : dias.delete(value);
        return { ...formData, dias_semana: Array.from(dias) };
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    console.log(formData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(formData);
  };

  return (
    <Nav>
      <Form className="row g-3 form-consulta m-auto mt-5" onSubmit={handleSubmit}>
        <TituloData titulo={pagina_titulo} data={dataAtualFormatada} />

        {/* Data Início */}
        <Col md={3}>
          <Form.Label htmlFor="inp-consulta-data-inicio">De</Form.Label>
          <Form.Control
            type="date"
            name="data_inicio"
            id="inp-consulta-data-inicio"
            value={formData.data_inicio}
            min={dataAtual}
            onChange={handleChange}
            required
          />
        </Col>

        {/* Data Fim */}
        <Col md={3}>
          <Form.Label htmlFor="inp-consulta-data-fim">Até</Form.Label>
          <Form.Control
            type="date"
            name="data_fim"
            id="inp-consulta-data-fim"
            value={formData.data_fim || ""}
            min={dataAtual}
            onChange={handleChange}
            required
            disabled={dataFimState}
          />
          <Form.Control.Feedback type="invalid">
            A data final não pode ser maior que a inicial.
          </Form.Control.Feedback>
        </Col>

        {/* Semanas */}
        <Col md={3}>
          <Form.Label htmlFor="inp-semanas">N.º de Semanas</Form.Label>
          <Form.Control
            type="number"
            name="semanas"
            id="inp-semanas"
            value={formData.semanas}
            min={1}
            onChange={handleChange}
            required
            disabled={semanasState}
          />
        </Col>

        {/* Dias da Semana */}
        <Col md={3}>
          <Form.Label>Dias da Semana</Form.Label>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            {[
              ['Seg', '1'],
              ['Ter', '2'],
              ['Qua', '3'],
              ['Qui', '4'],
              ['Sex', '5'],
              ['Sáb', '6'],
              ['Dom', '0'],
            ].map(([label, value]) => (
              <Form.Check
                key={value}
                label={label}
                id={`inp-${label.toLowerCase()}`}
                name="dias_semana"
                value={value}
                type="checkbox"
                checked={(formData.dias_semana).includes(value)}
                onChange={handleChange}
                disabled={diasSemanaState}
              />
            ))}
          </div>
        </Col>

        {/* Tipo de Reserva */}
        <Col md={3}>
          <Form.Label htmlFor="inp-consulta-reserva-tipo">Tipo de Reserva</Form.Label>
          <Form.Select
            name="reserva_tipo"
            id="inp-consulta-reserva-tipo"
            value={formData.reserva_tipo || ""}
            onChange={handleChange}
          >
            <option value="Avulsa">Avulsa</option>
            <option value="Graduação">Graduação</option>
            <option value="Pos-graduacao">Pós-graduação</option>
            <option value="FIC">FIC</option>
          </Form.Select>
        </Col>

        {/* Turno */}
        <Col md={3}>
          <Form.Label htmlFor="inp-consulta-turno">Turno</Form.Label>
          <Form.Select
            name="turno"
            id="inp-consulta-turno"
            value={formData.turno || ""}
            onChange={handleChange}
          >
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
          </Form.Select>
        </Col>

        {/* Número da Sala */}
        <Col md={3}>
          <Form.Label htmlFor="inp-consulta-sala">N.º da Sala</Form.Label>
          <Form.Select
            name="numero"
            id="inp-consulta-sala"
            value={formData.numero || ""}
            onChange={handleChange}
          >
            <option value="">Qualquer</option>
            {numeros.map((n) => (<option key={n} value={n}>{n}</option>))}
          </Form.Select>
        </Col>

        {/* Tipo de Sala */}
        <Col md={3}>
          <Form.Label htmlFor="inp-consulta-sala-tipo">Tipo de Sala</Form.Label>
          <Form.Select
            name="tipo"
            id="inp-consulta-sala-tipo"
            value={formData.tipo || ""}
            onChange={handleChange}
          >
            <option value="">Qualquer</option>
            {tipos.map((tipo) => (<option key={tipo} value={tipo}>{tipo}</option>))}
          </Form.Select>
        </Col>

        {/* Lotação */}
        <Col md={3}>
          <Form.Label htmlFor="inp-consulta-lotacao">Lotação</Form.Label>
          <Form.Control
            type="number"
            name="lotacao"
            id="inp-consulta-lotacao"
            placeholder="Qualquer"
            min={1}
            value={formData.lotacao || ""}
            onChange={handleChange}
          />
        </Col>

        {/* Nº Máquinas */}
        <Col md={3}>
          <Form.Label htmlFor="inp-consulta-maquinas-qtd">N.º de Máquinas</Form.Label>
          <Form.Control
            type="number"
            name="maquinas_qtd"
            id="inp-consulta-maquinas-qtd"
            placeholder="Qualquer"
            min={0}
            value={formData.maquinas_qtd || ""}
            onChange={handleChange}
          />
        </Col>

        {/* Tipo de Máquinas */}
        <Col md={3}>
          <Form.Label htmlFor="inp-consulta-maquinas-tipo">Tipo de Máquinas</Form.Label>
          <Form.Select
            name="maquinas_tipo"
            id="inp-consulta-maquinas-tipo"
            value={formData.maquinas_tipo || ""}
            onChange={handleChange}
          >
            <option value="">Qualquer</option>
            {maquinasTipos.map((tipo) => (<option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </Form.Select>
        </Col>

        {/* Botão Buscar */}
        <Col xs={12} className="d-flex align-items-center gap-2">
          <Button type="submit" variant="primary" id="btn-buscar-sala-disponivel">
            Buscar
          </Button>
        </Col>
      </Form>
    </Nav>
  );
}
