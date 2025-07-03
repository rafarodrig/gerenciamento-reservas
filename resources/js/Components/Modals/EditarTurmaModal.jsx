import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

import styles from "@/Components/Form/Forms.module.scss";
import axios from 'axios';
import { SquarePen } from 'lucide-react';

export default function EditarTurmaModal({ turmaId, onCancel, onExited, onResult, errors }) {
  const [formData, setFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      .catch(err => {
        console.error;
        onResult({ show: true, type: "danger", message: "Erro ao atualizar turma: " + err });
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
        <Modal.Title><SquarePen size={28} className="me-2" />Editar Turma</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={12} className='mb-4'>
              <Form.Group>
                <Form.Label className={styles["form-section-title"]}>
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
                <Form.Control.Feedback type="invalid">
                  {errors?.nome}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12} className='mb-4'>
              <Form.Group>
                <Form.Label className={styles["form-section-title"]}>
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
                <Form.Control.Feedback type="invalid">
                  {errors?.docente}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12} className='mb-4'>
              <Form.Group>
                <Form.Label className={styles["form-section-title"]}>
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
                <Form.Control.Feedback type="invalid">
                  {errors?.curso}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12} className='mb-4'>
              <Form.Group>
                <Form.Label className={styles["form-section-title"]}>
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
                <Form.Control.Feedback type="invalid">
                  {errors?.lotacao}
                </Form.Control.Feedback>
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
