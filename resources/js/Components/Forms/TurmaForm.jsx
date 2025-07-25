import { Col, Form, Row } from "react-bootstrap";
import CancelarButton from "../Buttons/CancelarButton";
import SalvarButton from "../Buttons/SalvarButton";
import { useState } from "react";
import { api } from "@/services/api";


export default function TurmaForm({
    turma,
    isEditing,
    loading,
    onResult,
    onEdited,
    onCreated,
    onCancel,

}) {

    const [formData, setFormData] = useState({
        nome: turma?.nome || "",
        docente: turma?.docente || "",
        curso: turma?.curso || "",
        lotacao: turma?.lotacao || "",
    });

    const [errors, setErrors] = useState({});

    // Manipulador para atualizar o estado do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Limpa o erro do campo específico ao ser alterado
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const resetForm = () => {
        setFormData({
            nome: "",
            docente: "",
            curso: "",
            lotacao: "",
        });
        setErrors({});
    };

    const handleSubmitEditar = (e) => {
        e.preventDefault();
        api.put(`/turmas/${turma?.id}`, formData)
            .then((response) => {
                onEdited();
                onResult({ show: true, type: "success", message: response.data.message });
            })
            .catch((err) => {
                setErrors(err.response?.data?.errors || {});
                // onResult({ show: true, type: "danger", message: "Erro ao atualizar turma: " + err });
            });
    };

    const handleSubmitCadastrar = (e) => {
        e.preventDefault();
        api.post(`/turmas`, formData)
            .then((response) => {
                onCreated();
                onResult({ show: true, type: "success", message: response.data.message });
            })
            .catch((err) => {
                setErrors(err.response?.data?.errors || {});
                // onResult({ show: true, type: "danger", message: "Erro ao atualizar turma: " + err });
            });
    };

    const handleCancel = () => {
        resetForm();
        onCancel();
    };

    return (
        <Form onSubmit={isEditing ? handleSubmitEditar : handleSubmitCadastrar}>
            <div className="form-section container-style">
                <div className="form-section-title">Informações Básicas</div>
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
                                value={formData?.nome || ""}
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
                                value={formData?.docente || ""}
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
                                value={formData?.curso || ""}
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
                                value={formData?.lotacao || ""}
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



            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
                <CancelarButton onClick={handleCancel} disabled={loading} />
                <SalvarButton
                    type="submit"
                    disabled={loading}
                    isEditing={isEditing}
                    loading={loading}>
                </SalvarButton>
            </div>
        </Form>
    )
};