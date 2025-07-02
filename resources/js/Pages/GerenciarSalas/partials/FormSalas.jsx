import { Button, Col, Form, Row } from "react-bootstrap";
import { CheckCircle, PlusCircle, XCircle } from "react-bootstrap-icons";
import clsx from 'clsx';
import styles from '../GerenciarSalas.module.scss'
import formStyles from "@/components/Form/Forms.module.scss"


export default function FormSalas ({
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
}) {

    return(
        <Form onSubmit={isEditing ? handleSubmitEditar : handleSubmitCadastrar}>
            <div className={clsx(formStyles["form-section"], "shadow-sm")}>
                <div className={formStyles["form-section-title"]}>Informações Básicas</div>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Número da Sala <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                // className={styles["form-control"]}
                                type="number"
                                value={formData.numero}
                                onChange={(e) => setFormData({...formData, numero: e.target.value})}
                                required
                                min="1"
                                placeholder="Ex: 101"
                                />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Unidade <span className="text-danger">*</span></Form.Label>
                            <div className={clsx(styles["unidade-radio-group"], "mt-2")}>
                                <Form.Check
                                    type="radio"
                                    label="Unidade 1"
                                    name="unidade"
                                    value="1"
                                    checked={formData.unidade === '1'}
                                    onChange={(e) => setFormData({...formData, unidade: e.target.value})}
                                    />
                                <Form.Check
                                    type="radio"
                                    label="Unidade 2"
                                    name="unidade"
                                    value="2"
                                    checked={formData.unidade === '2'}
                                    onChange={(e) => setFormData({...formData, unidade: e.target.value})}
                                    />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                // className={styles["form-control"]}
                                type="text"
                                value={formData.tipo}
                                onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                                required
                                placeholder="Ex: Laboratório, Auditório, Sala de Aula"
                                />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Capacidade/Lotação <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                // className={styles["form-control"]}
                                type="number"
                                value={formData.lotacao}
                                onChange={(e) => setFormData({...formData, lotacao: e.target.value})}
                                required
                                min="1"
                                placeholder="Ex: 30"
                                />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            
            <div className={clsx(styles["form-section"], "shadow-sm")}>
                <div className={styles["form-section-title"]}>Equipamentos</div>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Número de Máquinas</Form.Label>
                            <Form.Control
                                // className={styles["form-control"]}
                                type="number"
                                value={formData.maquinas_qtd}
                                onChange={(e) => setFormData({...formData, maquinas_qtd: e.target.value})}
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
                            <Form.Label>Tipo de Máquinas</Form.Label>
                            <Form.Control
                                // className={styles["form-control"]}
                                type="text"
                                value={formData.maquinas_tipo}
                                onChange={(e) => setFormData({...formData, maquinas_tipo: e.target.value})}
                                placeholder="Ex: Desktop, Notebook, iMac"
                                />
                            <Form.Text className="text-muted">
                                Especifique o modelo ou tipo dos equipamentos
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            
            <div className={clsx(styles["form-section"], "shadow-sm")}>
                <div className={styles["form-section-title"]}>Informações Adicionais</div>
                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        // className={styles["form-control"]}
                        as="textarea"
                        rows={3}
                        value={formData.descricao}
                        onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                        placeholder="Descreva características especiais, equipamentos adicionais, observações..."
                        />
                    <Form.Text className="text-muted">
                        Informações complementares sobre a sala (opcional)
                    </Form.Text>
                </Form.Group>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button 
                    variant="secondary" 
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
                    >
                    <XCircle className="me-2" />
                    Cancelar
                </Button>
                <Button 
                    variant="primary" 
                    type="submit"
                    disabled={loading}
                    className={styles["btn-acao"]}
                    >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Salvando...
                        </>
                    ) : (
                        <>
                            {isEditing ? <CheckCircle className="me-2" /> : <PlusCircle className="me-2" />}
                            {isEditing ? 'Atualizar' : 'Cadastrar'}
                        </>
                    )}
                </Button>
            </div>
        </Form>
    )
};