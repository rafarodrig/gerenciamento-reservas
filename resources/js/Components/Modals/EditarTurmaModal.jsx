import { useState, useEffect } from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import { PenSquare } from 'lucide-react';
import CancelarButton from '../Buttons/CancelarButton';
import SalvarButton from '../Buttons/SalvarButton';
import { api } from '@/services/api';

/**
 * Modal para editar uma turma.
 * Este componente é "controlado", ou seja, sua visibilidade e os dados
 * são gerenciados pelo componente pai.
 *
 * @param {object} turma - O objeto completo da turma a ser editada.
 * @param {function} onCancel - Função chamada ao fechar ou cancelar.
 * @param {function} onExited - Função chamada após o modal ser fechado.
 * @param {function} onResult - Função para retornar mensagens de sucesso/erro.
 */
export default function EditarTurmaModal({ turma, onCancel, onExited, onResult }) {


  // Inicializa o estado do formulário com um objeto vazio ou com os dados da turma
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  // Efeito para atualizar o formulário sempre que uma nova 'turma' for passada como prop.
  // Isso garante que se o usuário fechar e abrir o modal para outra turma, os dados estarão corretos.
  useEffect(() => {
    if (turma) {
      setFormData({
        nome: turma.nome || "",
        docente: turma.docente || "",
        curso: turma.curso || "",
        lotacao: turma.lotacao || "",
      });
      // Limpa os erros ao receber uma nova turma
      setShowModal(true);
      setErrors({});

    }
  }, [turma]);

  // Manipulador para atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpa o erro do campo específico ao ser alterado
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    onCancel();
  }

  // Manipulador para submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // A requisição PUT agora usa o ID do objeto 'turma' recebido via props
    api.put(`/turmas/${turma.id}`, formData)
      .then((response) => {
        onResult({ show: true, type: "success", message: response.data.message });
        onCancel(); // Fecha o modal via função do pai
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          onResult({ show: true, type: "danger", message: "Ocorreu um erro inesperado." });
        }
      });
  };

  // Se nenhuma turma for fornecida, não renderiza nada para evitar erros.
  if (!turma) {
    return null;
  }

  return (
    <Modal
      show={showModal} // A visibilidade é controlada pelo pai
      onHide={handleCancel} // A função de fechar vem do pai
      onExited={onExited}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className='d-flex align-items-center'>
          <PenSquare className="me-2" />Editar Turma
        </Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className='px-3'>
            {/* Campo Nome */}
            <Col md={12} className='mb-4'>
              <Form.Group>
                <Form.Label>
                  Nome<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  placeholder="Nome da disciplina ou evento"
                  value={formData.nome || ''}
                  onChange={handleChange}
                  isInvalid={!!errors?.nome}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
                {!errors.nome && (
                  <Form.Text className="text-muted">
                    Identificação da turma.
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            {/* Campo Docente */}
            <Col md={12} className='mb-4'>
              <Form.Group>
                <Form.Label>
                  Docente<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="docente"
                  placeholder="Professor responsável"
                  value={formData.docente || ''}
                  onChange={handleChange}
                  isInvalid={!!errors?.docente}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.docente}
                </Form.Control.Feedback>
                {!errors.docente && (
                  <Form.Text className="text-muted">
                    Nome do professor responsável.
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            {/* Campo Curso */}
            <Col md={12} className='mb-4'>
              <Form.Group>
                <Form.Label>
                  Curso<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="curso"
                  placeholder="Curso associado"
                  value={formData.curso || ''}
                  onChange={handleChange}
                  isInvalid={!!errors?.curso}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.curso}
                </Form.Control.Feedback>
                {!errors.curso && (
                  <Form.Text className="text-muted">
                    Nome completo do curso.
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            {/* Campo Lotação */}
            <Col md={12} className='mb-4'>
              <Form.Group>
                <Form.Label>
                  Capacidade/Lotação<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="lotacao"
                  value={formData.lotacao || ''}
                  onChange={handleChange}
                  isInvalid={!!errors?.lotacao}
                  required
                  min="1"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lotacao}
                </Form.Control.Feedback>
                {!errors.lotacao && (
                  <Form.Text className="text-muted">
                    Quantidade total de alunos previstos.
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <CancelarButton onClick={handleCancel} />
          {/* O botão de salvar agora aciona o submit do formulário */}
          <SalvarButton type="submit" />
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
