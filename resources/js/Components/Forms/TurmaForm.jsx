import { Col, Form, Row } from "react-bootstrap";
import CancelarButton from "../Buttons/CancelarButton";
import SalvarButton from "../Buttons/SalvarButton";
import { api } from "@/services/api";
import { useSimpleForm } from "@/hooks/useSimpleForm";
import { useAlert } from '@/contexts/AlertContext';
import { useSaveTurma } from "@/hooks/useSaveTurma";

export default function TurmaForm({
    turma,
    isEditing,
    onEdited,
    onCreated,
    onClose,
}) {
    const { showAlert } = useAlert();
    const saveTurma = useSaveTurma({
        onSuccess: (data) => {
            showAlert("Turma salva com sucesso!", "success");
            onClose?.();
        }
    });


    const {
        formData,
        loading,
        errors,
        handleChange,
        handleSubmit,
        resetForm,
    } = useSimpleForm({
        initialValues: {
            nome: turma?.nome || "",
            docente: turma?.docente || "",
            curso: turma?.curso || "",
            lotacao: turma?.lotacao || "",
            turno: turma?.turno || "",
            tipo: turma?.tipo || "",
        },
        onSubmit: async (data) => {
            if (isEditing) {
                const res = await api.put(`/turmas/${turma?.id}`, data);
                showAlert(res.data.message, 'success');
                onEdited?.();
            } else {
                const res = await api.post(`/turmas`, data);
                showAlert(res.data.message, 'success');
                onCreated?.();
            }
            onClose?.();
            resetForm();
        },
    });

    const handleCancel = () => {
        resetForm();
        onClose?.();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className='px-3'>
                {/* Campo Nome */}
                <Col md={12} className='mb-4'>
                    <Form.Group>
                        <Form.Label>Nome<span className="text-danger">*</span></Form.Label>
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
                {/* Campo Turno */}
                <Col md={6} className='mb-4'>
                    <Form.Group>
                        <Form.Label>Turno<span className="text-danger">*</span></Form.Label>
                        <Form.Select
                            name="turno"
                            value={formData.turno}
                            onChange={handleChange}
                            isInvalid={!!errors?.turno}
                            required
                        >
                            <option value="">Selecione o turno</option>
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                        </Form.Select>
                        {errors?.turno && (
                            <Form.Control.Feedback type="invalid">
                                {errors.turno}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>

                {/* Campo Tipo */}
                <Col md={6} className='mb-4'>
                    <Form.Group>
                        <Form.Label>Tipo<span className="text-danger">*</span></Form.Label>
                        <Form.Select
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            isInvalid={!!errors?.tipo}
                            required
                        >
                            <option value="">Selecione o tipo</option>
                            <option value="Graduação">Graduação</option>
                            <option value="FIC">FIC</option>
                            <option value="Pós-graduação">Pós-graduação</option>
                            <option value="Avulsa">Avulsa</option>
                        </Form.Select>
                        {errors?.tipo && (
                            <Form.Control.Feedback type="invalid">
                                {errors.tipo}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>

                {/* Campo Docente */}
                <Col md={12} className='mb-4'>
                    <Form.Group>
                        <Form.Label>Docente<span className="text-danger">*</span></Form.Label>
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

                {/* Campo Curso */}
                <Col md={12} className='mb-4'>
                    <Form.Group>
                        <Form.Label>Curso<span className="text-danger">*</span></Form.Label>
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

                {/* Campo Lotação */}
                <Col md={12} className='mb-4'>
                    <Form.Group>
                        <Form.Label>Capacidade/Lotação<span className="text-danger">*</span></Form.Label>
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

            <div className="d-flex justify-content-end gap-2 mt-4">
                <CancelarButton onClick={handleCancel} disabled={loading} />
                <SalvarButton
                    type="submit"
                    disabled={loading}
                    isEditing={isEditing}
                    loading={loading}
                />
            </div>
        </Form>
    );
}
