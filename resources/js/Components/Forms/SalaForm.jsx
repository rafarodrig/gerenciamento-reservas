import { Col, Form, Row } from "react-bootstrap";
import CancelarButton from "../Buttons/CancelarButton";
import SalvarButton from "../Buttons/SalvarButton";
import { CheckCircleIcon, PlusCircleIcon } from "lucide-react";


export default function FormSalas({
    isEditing,
    formData,
    setFormData,
    setSalaEditando,
    resetForm,
    loading,
    handleSubmitCadastrar,
    handleSubmitEditar,
    setShowEditarModal,
    setShowCadastrarModal,
    tiposSala,
    tiposMaquina,
}) {

    return (
        <Form onSubmit={isEditing ? handleSubmitEditar : handleSubmitCadastrar}>
            <div className="form-section container-style">
                <div className="form-section-title">Informações Básicas</div>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Número da Sala <span className="text-danger">*</span></Form.Label>
                            <Form.Control

                                type="number"
                                value={formData.numero}
                                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                                required
                                min="1"
                                placeholder="Ex: 101"
                            />
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
                                    checked={formData.unidade === '1'}
                                    onChange={(e) => setFormData({ ...formData, unidade: e.target.value })}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Unidade 2"
                                    name="unidade"
                                    value="2"
                                    checked={formData.unidade === '2'}
                                    onChange={(e) => setFormData({ ...formData, unidade: e.target.value })}
                                />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Tipo <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                                name="tipo_sala_id"
                                value={formData.tipo_sala_id || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, tipo_sala_id: e.target.value })
                                }
                                required
                            >
                                <option value="">Selecione</option>
                                {tiposSala.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>
                                        {tipo.nome}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Capacidade/Lotação <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.lotacao}
                                onChange={(e) => setFormData({ ...formData, lotacao: e.target.value })}
                                required
                                min="1"
                                placeholder="Ex: 30"
                            />
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
                                value={formData.maquinas_qtd}
                                onChange={(e) => setFormData({ ...formData, maquinas_qtd: e.target.value })}
                                min="0"
                                placeholder="Ex: 25"
                            />
                            <Form.Text className="text-muted">
                                Deixe em branco se não houver máquinas
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="tipo_maquina_id">Tipo de Máquinas</Form.Label>
                            <Form.Select
                                id="tipo_maquina_id"
                                name="tipo_maquina_id"
                                value={formData.tipo_maquina_id || ""}
                                onChange={(e) => setFormData({ ...formData, tipo_maquina_id: e.target.value })}
                            >
                                <option value="">Selecione</option>
                                {tiposMaquina.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>
                                        {tipo.nome}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Text className="text-muted">
                                Selecione o tipo de equipamento desejado
                            </Form.Text>
                        </Form.Group>
                    </Col>

                </Row>
            </div>

            <div className="form-section container-style">
                <div className="form-section-title">Informações Adicionais</div>
                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.descricao}
                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                        placeholder="Descreva características especiais, equipamentos adicionais, observações..."
                    />
                    <Form.Text className="text-muted">
                        Informações complementares sobre a sala (opcional)
                    </Form.Text>
                </Form.Group>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
                <CancelarButton
                    onClick={() => {
                        if (isEditing) {
                            setShowEditarModal(false);
                            setSalaEditando(null);
                        } else {
                            setShowCadastrarModal(false);
                        }
                        resetForm();
                    }}
                    disabled={loading}
                ></CancelarButton>
                <SalvarButton
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Salvando...
                        </>
                    ) : (
                        <>
                            {isEditing ? <CheckCircleIcon size={20} /> : <PlusCircleIcon size={20} />}
                            {isEditing ? 'Atualizar' : 'Cadastrar'}
                        </>
                    )}
                </SalvarButton>
            </div>
        </Form>
    )
};