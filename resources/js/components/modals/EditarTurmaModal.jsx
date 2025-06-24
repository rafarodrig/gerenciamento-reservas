import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Pencil} from 'react-bootstrap-icons';
import axios from 'axios';

export default function EditarTurmaModal({ turmaId, onCancel, onExited, onResult}) {
    
  const [formData, setFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
  if (!turmaId) return;

  let isMounted = true;

  axios.get(`/turmas/${turmaId}`)
    .then(res => {
      if (isMounted) {
        setFormData({
          nome: res.data.nome || "",
          docente: res.data.docente || "",
          curso: res.data.curso || "",
          lotacao: res.data.lotacao || "",
        });
        setShowModal(true);
      }
    })
    .catch(err => {
      console.error("Erro ao carregar turma:", err);
      onResult("Erro ao carregar dados da turma");
      onResetId();
    });

  return () => { isMounted = false; };
}, [turmaId]);


  const handleCancel = () => {
    setShowModal(false)
    onCancel()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`/turmas/${turmaId}`, formData)
    .then((res) => { 
      setShowModal(false);
      onResult({
            prevModal: true,
            msg: res.data.msg})

    })
  };

  if (!turmaId || !formData) return null;

  return (
    <Modal 
    show={showModal} 
    onHide={handleCancel} 
    onExited={onExited}  
    centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title><Pencil className="me-2" />Editar Turma</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={12}>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="text"
                  id="inp-editar-nome"
                  name="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
                <Form.Label htmlFor="inp-editar-nome">Nome</Form.Label>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="text"
                  id="inp-editar-docente"
                  name="docente"
                  placeholder="Docente"
                  value={formData.docente}
                  onChange={handleChange}
                  required
                />
                <Form.Label htmlFor="inp-editar-docente">Docente</Form.Label>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="text"
                  id="inp-editar-curso"
                  name="curso"
                  placeholder="Curso"
                  value={formData.curso}
                  onChange={handleChange}
                  required
                />
                <Form.Label htmlFor="inp-editar-curso">Curso</Form.Label>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="number"
                  id="inp-editar-lotacao"
                  name="lotacao"
                  placeholder="Lotação"
                  min="1"
                  value={formData.lotacao}
                  onChange={handleChange}
                  required
                />
                <Form.Label htmlFor="inp-editar-lotacao">Lotação</Form.Label>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
             Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
