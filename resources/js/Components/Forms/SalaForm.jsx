import { Col, Form, Row } from "react-bootstrap";
import CancelarButton from "../Buttons/CancelarButton";
import SalvarButton from "../Buttons/SalvarButton";
import { useAlert } from "@/contexts/AlertContext";
import { useSimpleForm } from "@/hooks/useSimpleForm";
import { api } from "@/services/api";
import SelectInput from "../Inputs/SelectInput";


export default function FormSalas({
    sala,
    isEditing,
    tiposSala,
    tiposMaquina,
    onClose,
    onResult,
}) {

    const { showAlert } = useAlert();
    const {
        formData,
        loading,
        errors,
        handleChange,
        handleSubmit,
        resetForm,
    } = useSimpleForm({
        initialValues: {
            numero: sala?.numero || '',
            tipo_sala_id: sala?.tipo_sala_id || '',
            unidade: sala?.unidade || '1',
            lotacao: sala?.lotacao || '',
            maquinas_qtd: sala?.maquinas_qtd || '',
            tipo_maquina_id: sala?.tipo_maquina_id || '',
            descricao: sala?.descricao || '',
        },
        onSubmit: async (data) => {
            if (isEditing) {
                const res = await api.put(`/salas/${sala?.id}`, data);
                showAlert(res.data.message, 'success');
            } else {
                const res = await api.post(`/salas`, data);
                showAlert(res.data.message, 'success');
            }
            onResult();
            onClose();
            resetForm();
        },
    });

    const handleCancel = () => {
        resetForm();
        onClose?.();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="form-section container-style">
                <div className="form-section-title">Informações Básicas</div>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Número da Sala <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="number"
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange}
                                min="1"
                                placeholder="Ex: 101"
                                isInvalid={!!errors?.numero}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.numero}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Unidade <span className="text-danger">*</span></Form.Label>
                            <div className="unidade-radio-group mt-2">
                                <Form.Check
                                    type="radio"
                                    label="Unidade 1"
                                    name="unidade"
                                    value="1"
                                    checked={formData.unidade == '1'}
                                    onChange={handleChange}
                                    isInvalid={!!errors?.unidade}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Unidade 2"
                                    name="unidade"
                                    value="2"
                                    checked={formData.unidade == '2'}
                                    onChange={handleChange}
                                    isInvalid={!!errors?.unidade}
                                />
                            </div>
                            <Form.Control.Feedback type="invalid">
                                {errors?.unidade}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label >
                                Tipo <span className="text-danger">*</span>
                            </Form.Label>
                            <SelectInput
                                id="tipo_sala_id"
                                name="tipo_sala_id"
                                value={formData.tipo_sala_id}
                                onChange={handleChange}
                                error={errors?.tipo_sala_id}
                                options={[
                                    { value: "", label: "Selecione" },
                                    ...tiposSala.map(tipo => ({
                                        value: tipo.id,
                                        label: tipo.nome,
                                    }))
                                ]
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.tipo_sala_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Capacidade/Lotação <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="number"
                                name="lotacao"
                                value={formData.lotacao}
                                onChange={handleChange}
                                required
                                min="1"
                                placeholder="Ex: 30"
                                isInvalid={!!errors?.lotacao}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.lotacao}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
            </div>

            <div className="form-section container-style">
                <div className="form-section-title">Equipamentos</div>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Número de Máquinas</Form.Label>
                            <Form.Control
                                type="number"
                                name="maquinas_qtd"
                                value={formData.maquinas_qtd}
                                onChange={handleChange}
                                min="0"
                                placeholder="Ex: 25"
                                isInvalid={!!errors?.maquinas_qtd}
                            />
                            {errors?.maquinas_qtd ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.maquinas_qtd}
                                </Form.Control.Feedback>
                            ) : (
                                <Form.Text className="text-muted">
                                    Deixe em branco se não houver máquinas
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="tipo_maquina_id">Tipo de Máquinas</Form.Label>
                            <SelectInput
                                id="tipo_maquina_id"
                                name="tipo_maquina_id"
                                value={formData.tipo_maquina_id}
                                onChange={handleChange}
                                error={errors?.tipo_maquina_id}
                                options={[
                                    { value: "", label: "Selecione" },
                                    ...tiposMaquina.map(tipo => ({
                                        value: tipo.id,
                                        label: tipo.nome,
                                    }))
                                ]}
                            />
                            {errors?.tipo_maquina_id ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.tipo_maquina_id}
                                </Form.Control.Feedback>
                            ) : (
                                <Form.Text className="text-muted">
                                    Selecione o tipo de equipamento desejado
                                </Form.Text>
                            )}

                        </Form.Group>
                    </Col>

                </Row>
            </div>

            <div className="form-section container-style">
                <div className="form-section-title">Informações Adicionais</div>
                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        name="descricao"
                        as="textarea"
                        rows={3}
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Descreva características especiais, equipamentos adicionais, observações..."
                        isInvalid={!!errors?.descricao}
                    />
                    {errors?.descricao ? (
                        <Form.Control.Feedback type="invalid">
                            {errors.descricao}
                        </Form.Control.Feedback>
                    ) : (
                        <Form.Text className="text-muted">
                            Informações complementares sobre a sala (opcional)
                        </Form.Text>
                    )}

                </Form.Group>
            </div>

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
    )
};