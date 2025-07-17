import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import { PenSquare } from 'lucide-react';
import CancelarButton from '../Buttons/CancelarButton';
import SalvarButton from '../Buttons/SalvarButton';


export default function EditarTurmaModal({ turmaId, onCancel, onExited, onResult }) {
  const [formData, setFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState(false);

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
        onResult({ show: true, type: "danger", message: ("Erro ao carregar turma: ", err) });
        onCancel(); // Usar onCancel em vez de função inexistente
      });

    return () => { isMounted = false; };
  }, [turmaId]);

  const handleChange = (e) => {
    setErrors((prev) => { })
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/turmas/${turmaId}`, formData)
      .then((response) => {
        setShowModal(false);
        onResult({ show: true, type: "success", message: response.data.message });
      })
      .catch((err) => {
        setErrors(err.response.data.errors)
        // onResult({ show: true, type: "danger", message: "Erro ao atualizar turma: " + err });
      });
  };

  const handleCancel = () => {
    setShowModal(false);
    onCancel();
  };

  if (!turmaId || !formData) return null;

  return (
    <Modal
      show={showModal}
      onHide={handleCancel}
      onExited={onExited}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className='d-flex align-items-center' ><PenSquare className="me-2" />Editar Turma</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className='px-3'>
            <Col md={12} className='mb-4'>
              <Form.Group>
                <Form.Label >
                  Nome<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                  isInvalid={!!errors?.nome}
                  required
                />
                {errors?.nome ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.nome}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Text className="text-muted">
                    Informe o nome da disciplina, evento ou identificação da turma.
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={12} className='mb-4'>
              <Form.Group>
                <Form.Label >
                  Docente<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="docente"
                  placeholder="Docente"
                  value={formData.docente}
                  onChange={handleChange}
                  isInvalid={!!errors?.docente}
                  required
                />
                {errors?.docente ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.docente}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Text className="text-muted">
                    Nome do professor responsável pela turma ou disciplina.
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={12} className='mb-4'>
              <Form.Group>
                <Form.Label >
                  Curso<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="curso"
                  placeholder="Curso"
                  value={formData.curso}
                  onChange={handleChange}
                  isInvalid={!!errors?.curso}
                  required
                />
                {errors?.curso ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.curso}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Text className="text-muted">
                    Nome completo do curso associado à turma.
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={12} className='mb-4'>
              <Form.Group>
                <Form.Label >
                  Capacidade/Lotação<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="lotacao"
                  value={formData.lotacao}
                  onChange={handleChange}
                  isInvalid={!!errors?.lotacao}
                  required
                  min="1"
                />
                {errors?.lotacao ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.lotacao}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Text className="text-muted">
                    Quantidade total de alunos previstos para a turma.
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <CancelarButton onClick={handleCancel} />
          <SalvarButton onClick={handleSubmit} />
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
