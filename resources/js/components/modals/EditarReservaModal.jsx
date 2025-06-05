import { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import OptionsTurmas from '../OptionsTurmas';

export default function EditarReservaModal({ show, reserva, handleClose}) {

  

const [formData, setFormData] = useState({
  responsavel_cadastro: reserva.responsavel_cadastro,
  turma: reserva.turma.id,
  sala: reserva.sala.id
})

const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="modal-principal">
      <Modal.Header closeButton id="modal-header-editar">
        <Modal.Title className="fs-4">Editar Reserva</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* DADOS */}
        <Row className="mb-3 row-cols-2">
          <Col>
            <div className="modal-dados" id="sala-dados" >
              <h6>{reserva.sala.numero} - {reserva.sala.tipo}</h6>
              <h6>{reserva.sala.lotacao} pessoas</h6>
              <h6>{reserva.sala.maquinas_qtd} máquinas</h6>
            </div>
            
          </Col>
          <Col>
            <div className="modal-dados" id="reserva-dados" >
              <h6>{reserva.data}</h6>
              <h6>{reserva.turma.tipo}</h6>
              <h6>{reserva.turma.turno}</h6>
            </div>
          </Col>
        </Row>

        <Form id="form-editar-reserva">
          <Form.Group className="mb-3 form-floating">
            <Form.Control
              type="text"
              id="inp-responsavel-cadastro"
              name="responsavel_cadastro"
              placeholder="Responsável Cadastro"
              autoComplete="off"
              value={formData.responsavel_cadastro}
              onChange={handleChange}
            />
            <Form.Label htmlFor="inp-responsavel-cadastro">Responsável Cadastro</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 form-floating">
            <Form.Select id="sala-cadastrada" name="sala" onChange={handleChange} required>
            {/* {reserva && ( */}
            <option value={reserva.sala.id}> {reserva.sala.numero} - Unidade {reserva.sala.unidade}</option>
                {/* <OptionsTurmas id={reserva.id} show={show} /> */}
              {/* )} */}
            </Form.Select>
            <Form.Label htmlFor="sala-cadastrada">Sala</Form.Label>
          </Form.Group>

          <Form.Group className="mb-3 form-floating">
            <Form.Select id="turma-cadastrada" name="turma" onChange={handleChange} required>
            {/* {reserva && ( */}
            <option value={reserva.turma.id}> {reserva.turma.nome}</option>
                <OptionsTurmas id={reserva.id} show={show} />
              {/* )} */}
            </Form.Select>
            <Form.Label htmlFor="turma-cadastrada">Turma</Form.Label>
          </Form.Group>

          {/* BOX DE DADOS TURMA */}
          <div className="turma-dados" id="turmas-dados-editar">
            {/* Componente opcional de dados adicionais pode ir aqui */}
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" variant="primary">
          Salvar
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}