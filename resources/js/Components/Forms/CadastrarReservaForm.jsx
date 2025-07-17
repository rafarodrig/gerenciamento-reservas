import { useState } from 'react';
import { Form, Col, Nav, Row } from 'react-bootstrap';
import BuscarButton from '../Buttons/BuscarButton';
import { dataAtual } from '@/dates';

const DIAS_SEMANA = [
  ['Seg', '1'],
  ['Ter', '2'],
  ['Qua', '3'],
  ['Qui', '4'],
  ['Sex', '5'],
  ['Sáb', '6'],
  ['Dom', '7'],
];

export default function CadastrarReservaForm({
  className = "",
  formData,
  onBuscar,
  numeros,
  tipos,
  maquinasTipos,
  setFormData,
  setIsDisabledBtnReservar
}) {
  const [isActive, setIsActive] = useState(false);

  const [disabledFields, setDisabledFields] = useState({
    dataFim: true,
    semanas: true,
    diasSemana: true,
  });


  const atualizarCamposDinamicos = (tipo) => {
    const config = {
      Avulsa: { dataFim: true, semanas: true, diasSemana: true },
      Graduação: { dataFim: false, semanas: false, diasSemana: true },
      'Pos-graduacao': { dataFim: true, semanas: false, diasSemana: false },
      FIC: { dataFim: true, semanas: false, diasSemana: true },
    };
    setDisabledFields(config[tipo] || config['Avulsa']);
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === 'checkbox') {
      const dias = new Set(formData.dias_semana);
      checked ? dias.add(value) : dias.delete(value);

      const novoFormData = {
        ...formData,
        dias_semana: Array.from(dias),
      };
      setFormData(novoFormData);

    } else {
      let updatedFormData = {
        ...formData,
        [name]: value,
      };

      if (name === "reserva_tipo") {
        atualizarCamposDinamicos(value);
        updatedFormData = {
          ...updatedFormData,
          data_fim: '',
          semanas: '',
          dias_semana: [],
        };
      }
      setFormData(updatedFormData);
    }

    setIsActive(true);
    setIsDisabledBtnReservar(true)

  };
  const handleChangeData = (e) => {
    const { name, value } = e.target
    let updatedDisabledFields = { ...disabledFields };
    if (formData.reserva_tipo === "Graduação") {

      if (name === 'semanas' && value !== '') {
        updatedDisabledFields.dataFim = true;
      } else if (name === 'data_fim' && value !== '') {
        updatedDisabledFields.semanas = true;
      } else {
        updatedDisabledFields.semanas = false;
        updatedDisabledFields.dataFim = false;
      }
      setDisabledFields(updatedDisabledFields)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsActive(false)
    setIsDisabledBtnReservar(false)
    onBuscar();
  };

  return (
    <Nav>
      <Form className={`${className}`} >
        <Row className='g-3'>
          {/* Data Início */}
          <Col md={3}>
            <Form.Label htmlFor="data_inicio">De</Form.Label>
            <Form.Control
              type="date"
              name="data_inicio"
              id="data_inicio"
              value={formData.data_inicio}
              min={dataAtual("ISO")}
              onChange={handleChange}
              required
            />
          </Col>

          {/* Data Fim */}
          <Col md={3}>
            <Form.Label htmlFor="data_fim">Até</Form.Label>
            <Form.Control
              type="date"
              name="data_fim"
              id="data_fim"
              value={formData.data_fim || ""}
              min={dataAtual("ISO")}
              onChange={(e) => { handleChange(e); handleChangeData(e); }}
              required
              disabled={disabledFields.dataFim}
            />
            <Form.Control.Feedback type="invalid">
              A data final não pode ser maior que a inicial.
            </Form.Control.Feedback>
          </Col>

          {/* Semanas */}
          <Col md={3}>
            <Form.Label htmlFor="semanas">N.º de Semanas</Form.Label>
            <Form.Control
              type="number"
              name="semanas"
              id="semanas"
              value={formData.semanas}
              min={1}
              onChange={(e) => { handleChange(e); handleChangeData(e); }}
              required
              disabled={disabledFields.semanas}
            />
          </Col>

          {/* Dias da Semana */}
          <Col md={3}>
            <Form.Label>Dias da Semana</Form.Label>
            <div className="d-flex flex-wrap gap-2 align-items-center">
              {DIAS_SEMANA.map(([label, value]) => (
                <Form.Check
                  key={value}
                  label={label}
                  id={`dia_${value}`}
                  name="dias_semana"
                  value={value}
                  type="checkbox"
                  checked={formData.dias_semana?.includes(value)}
                  onChange={handleChange}
                  disabled={disabledFields.diasSemana}
                />
              ))}
            </div>
          </Col>

          {/* Tipo de Reserva */}
          <Col md={3}>
            <Form.Label htmlFor="reserva_tipo">Tipo de Reserva</Form.Label>
            <Form.Select
              name="reserva_tipo"
              id="reserva_tipo"
              value={formData.reserva_tipo || ""}
              onChange={(e) => { handleChange(e); }}
            >
              <option value="Avulsa">Avulsa</option>
              <option value="Graduação">Graduação</option>
              <option value="Pos-graduacao">Pós-graduação</option>
              <option value="FIC">FIC</option>
            </Form.Select>
          </Col>

          {/* Turno */}
          <Col md={3}>
            <Form.Label htmlFor="turno">Turno</Form.Label>
            <Form.Select
              name="turno"
              id="turno"
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
            <Form.Label htmlFor="numero">N.º da Sala</Form.Label>
            <Form.Select
              name="numero"
              id="numero"
              value={formData.numero || ""}
              onChange={handleChange}
            >
              <option value="">Qualquer</option>
              {numeros.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </Form.Select>
          </Col>
          {/* Unidade */}
          <Col md={3}>
            <Form.Label>Unidade</Form.Label>
            <Form.Select
              name="unidade"
              value={formData.unidade}
              onChange={handleChange}
            >
              <option value="todas">Todas</option>
              <option value="1">Unidade 1</option>
              <option value="2">Unidade 2</option>
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Label htmlFor="tipo_sala_id">Tipo de Sala</Form.Label>
            <Form.Select
              name="tipo_sala_id"
              id="tipo_sala_id"
              value={formData.tipo_sala_id || ""}
              onChange={handleChange}
            >
              <option value="">Qualquer</option>
              {Object.entries(tipos).map(([id, nome]) => (
                <option key={id} value={id}>{nome}</option>
              ))}
            </Form.Select>
          </Col>


          {/* Lotação */}
          <Col md={3}>
            <Form.Label htmlFor="lotacao">Lotação</Form.Label>
            <Form.Control
              type="number"
              name="lotacao"
              id="lotacao"
              placeholder="Qualquer"
              min={1}
              value={formData.lotacao || ""}
              onChange={handleChange}
            />
          </Col>

          {/* Nº Máquinas */}
          <Col md={3}>
            <Form.Label htmlFor="maquinas_qtd">N.º de Máquinas</Form.Label>
            <Form.Control
              type="number"
              name="maquinas_qtd"
              id="maquinas_qtd"
              placeholder="Qualquer"
              min={0}
              value={formData.maquinas_qtd || ""}
              onChange={handleChange}
            />
          </Col>

          <Col md={3}>
            <Form.Label htmlFor="tipo_maquina_id">Tipo de Máquinas</Form.Label>
            <Form.Select
              name="tipo_maquina_id"
              id="tipo_maquina_id"
              value={formData.tipo_maquina_id || ""}
              onChange={handleChange}
            >
              <option value="">Qualquer</option>
              {Object.entries(maquinasTipos).map(([id, nome]) => (
                <option key={id} value={id}>{nome}</option>
              ))}
            </Form.Select>
          </Col>


          {/* Botão Buscar */}
          <Col xs={12} className="d-flex align-items-center gap-2">
            <BuscarButton onClick={handleSubmit} isActive={isActive} />
          </Col>
        </Row>
      </Form>
    </Nav>
  );
}
