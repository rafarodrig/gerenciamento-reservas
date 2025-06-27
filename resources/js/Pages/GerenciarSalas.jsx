import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Modal, Form, Table, Pagination } from 'react-bootstrap';
import Layout from '@/Layouts/Layout';
import SalaTable from '@/Pages/Salas/TableSalas';
import axios from 'axios';
import './GerenciarSalas.css';
import { 
    PlusCircle, 
    PencilSquare, 
    Trash, 
    Building, 
    XCircle, 
    CheckCircle,
    ExclamationTriangle
} from 'react-bootstrap-icons';

export default function GerenciarSalas() {
    const [salas, setSalas] = useState([]);
    const [filteredSalas, setFilteredSalas] = useState([]);
    const [unidadeFiltro, setUnidadeFiltro] = useState('todas');
    const [paginationData, setPaginationData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // Estados dos modais
    const [showCadastrarModal, setShowCadastrarModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showDeletarModal, setShowDeletarModal] = useState(false);
    const [salaEditando, setSalaEditando] = useState(null);
    const [salaDeletando, setSalaDeletando] = useState(null);
    
    // Estados do formulário
    const [formData, setFormData] = useState({
        numero: '',
        tipo: '',
        unidade: '1',
        lotacao: '',
        maquinas_qtd: '',
        maquinas_tipo: '',
        descricao: ''
    });

    const resetForm = () => {
        setFormData({
            numero: '',
            tipo: '',
            unidade: '1',
            lotacao: '',
            maquinas_qtd: '',
            maquinas_tipo: '',
            descricao: ''
        });
    };

    const fetchSalas = async (unidade = unidadeFiltro, page = 1) => {
        setLoading(true);
        setError('');
        try {
            // Constrói a URL com paginação
            let url = `/salas?page=${page}`;
            if (unidade !== 'todas') {
                url += `&unidade=${unidade}`;
            }
            
            const response = await axios.get(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            // Tratamento dos dados da resposta paginada
            let salasData = [];
            let paginationInfo = null;
            
            if (response.data && response.data.salas) {
                const salasResponse = response.data.salas;
                
                if (salasResponse.data && Array.isArray(salasResponse.data)) {
                    // Resposta paginada do Laravel
                    salasData = salasResponse.data;
                    paginationInfo = {
                        current_page: salasResponse.current_page,
                        last_page: salasResponse.last_page,
                        per_page: salasResponse.per_page,
                        total: salasResponse.total,
                        from: salasResponse.from,
                        to: salasResponse.to,
                        prev_page_url: salasResponse.prev_page_url,
                        next_page_url: salasResponse.next_page_url
                    };
                }
            }
            
            setSalas(salasData);
            setFilteredSalas(salasData);
            setPaginationData(paginationInfo);
            setCurrentPage(page);
            
        } catch (err) {
            console.error('Erro ao carregar salas:', err);
            const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'Erro desconhecido';
            setError('Erro ao carregar salas: ' + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalas(unidadeFiltro, 1);
    }, [unidadeFiltro]);

    const handleUnidadeChange = (unidade) => {
        setUnidadeFiltro(unidade);
        setCurrentPage(1);
        // fetchSalas será chamado pelo useEffect
    };

    const handlePageChange = (page) => {
        fetchSalas(unidadeFiltro, page);
    };

    const handleCadastrar = () => {
        resetForm();
        setShowCadastrarModal(true);
    };

    const handleSubmitCadastrar = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await axios.post('/salas', {
                ...formData,
                'maquinas-qtd': formData.maquinas_qtd,
                'maquinas-tipo': formData.maquinas_tipo
            });
            
            setSuccess('Sala cadastrada com sucesso!');
            setShowCadastrarModal(false);
            resetForm();
            fetchSalas(unidadeFiltro, currentPage);
        } catch (err) {
            setError('Erro ao cadastrar sala: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleEditar = (salaId) => {
        const sala = salas.find(s => s.id === salaId);
        if (sala) {
            setSalaEditando(sala);
            setFormData({
                numero: sala.numero,
                tipo: sala.tipo,
                unidade: sala.unidade,
                lotacao: sala.lotacao,
                maquinas_qtd: sala.maquinas_qtd,
                maquinas_tipo: sala.maquinas_tipo,
                descricao: sala.descricao || ''
            });
            setShowEditarModal(true);
        }
    };

    const handleSubmitEditar = async (e) => {
        e.preventDefault();
        if (!salaEditando) return;
        
        setLoading(true);
        setError('');
        
        try {
            await axios.put(`/salas/${salaEditando.id}`, {
                ...formData,
                'maquinas-qtd': formData.maquinas_qtd,
                'maquinas-tipo': formData.maquinas_tipo
            });
            
            setSuccess('Sala atualizada com sucesso!');
            setShowEditarModal(false);
            setSalaEditando(null);
            resetForm();
            fetchSalas(unidadeFiltro, currentPage);
        } catch (err) {
            setError('Erro ao atualizar sala: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleDeletar = (salaId) => {
        const sala = salas.find(s => s.id === salaId);
        if (sala) {
            setSalaDeletando(sala);
            setShowDeletarModal(true);
        }
    };

    const confirmarDeletar = async () => {
        if (!salaDeletando) return;
        
        setLoading(true);
        setError('');
        
        try {
            await axios.delete(`/salas/${salaDeletando.id}`);
            setSuccess('Sala deletada com sucesso!');
            setShowDeletarModal(false);
            setSalaDeletando(null);
            // Se estamos na última página e só tem um item, volta para a página anterior
            const shouldGoToPrevPage = paginationData && 
                                     filteredSalas.length === 1 && 
                                     currentPage > 1;
            fetchSalas(unidadeFiltro, shouldGoToPrevPage ? currentPage - 1 : currentPage);
        } catch (err) {
            setError('Erro ao deletar sala: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const renderFiltroUnidades = () => (
        <div className="filtro-unidades">
            <span className="me-3">Filtrar por unidade:</span>
            <Button
                variant={unidadeFiltro === 'todas' ? 'primary' : 'outline-primary'}
                onClick={() => handleUnidadeChange('todas')}
                size="sm"
                className="btn-acao"
            >
                Todas as Unidades
            </Button>
            <Button
                variant={unidadeFiltro === '1' ? 'primary' : 'outline-primary'}
                onClick={() => handleUnidadeChange('1')}
                size="sm"
                className="btn-acao"
            >
                <Building className="me-1" />
                Unidade 1
            </Button>
            <Button
                variant={unidadeFiltro === '2' ? 'primary' : 'outline-primary'}
                onClick={() => handleUnidadeChange('2')}
                size="sm"
                className="btn-acao"
            >
                <Building className="me-1" />
                Unidade 2
            </Button>
        </div>
    );

    const renderPaginacao = () => {
        if (!paginationData || paginationData.last_page <= 1) return null;

        const items = [];
        const currentPage = paginationData.current_page;
        const lastPage = paginationData.last_page;
        
        // Botão anterior
        items.push(
            <Pagination.Prev 
                key="prev"
                disabled={currentPage === 1}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            />
        );

        // Páginas
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(lastPage, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            items.push(<Pagination.Item key={1} onClick={() => handlePageChange(1)}>1</Pagination.Item>);
            if (startPage > 2) {
                items.push(<Pagination.Ellipsis key="ellipsis1" />);
            }
        }

        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }

        if (endPage < lastPage) {
            if (endPage < lastPage - 1) {
                items.push(<Pagination.Ellipsis key="ellipsis2" />);
            }
            items.push(
                <Pagination.Item key={lastPage} onClick={() => handlePageChange(lastPage)}>
                    {lastPage}
                </Pagination.Item>
            );
        }

        // Botão próximo
        items.push(
            <Pagination.Next
                key="next"
                disabled={currentPage === lastPage}
                onClick={() => currentPage < lastPage && handlePageChange(currentPage + 1)}
            />
        );

        return (
            <div className="d-flex justify-content-center mt-3">
                <Pagination>{items}</Pagination>
            </div>
        );
    };

    const renderFormulario = (isEditing = false) => (
        <Form onSubmit={isEditing ? handleSubmitEditar : handleSubmitCadastrar}>
            <div className="form-section">
                <div className="form-section-title">Informações Básicas</div>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Número da Sala <span className="text-danger">*</span></Form.Label>
                            <Form.Control
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
                            <div className="unidade-radio-group mt-2">
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
            
            <div className="form-section">
                <div className="form-section-title">Equipamentos</div>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Número de Máquinas</Form.Label>
                            <Form.Control
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
            
            <div className="form-section">
                <div className="form-section-title">Informações Adicionais</div>
                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
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
                    className="btn-acao"
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
    );

    return (
        <>
            <Head title="Gerenciar Salas" />
            <Layout>
                <div className="gerenciar-salas-container">
                    <Container fluid>
                        <div className="page-header">
                            <Row>
                                <Col>
                                    <h2 className="page-title">Gerenciamento de Salas</h2>
                                    <p className="text-muted mb-0">Cadastre, edite e gerencie as salas do sistema</p>
                                </Col>
                            </Row>
                        </div>

                        {error && (
                            <div className="alert-container">
                                <Alert variant="danger" dismissible onClose={() => setError('')}>
                                    {error}
                                </Alert>
                            </div>
                        )}

                        {success && (
                            <div className="alert-container">
                                <Alert variant="success" dismissible onClose={() => setSuccess('')}>
                                    {success}
                                </Alert>
                            </div>
                        )}

                        <div className="tabela-salas">
                            <div className="table-container">
                                {loading && (
                                    <div className="loading-overlay">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Carregando...</span>
                                        </div>
                                    </div>
                                )}
                                <SalaTable
                                    salas={filteredSalas}
                                    unidade={unidadeFiltro}
                                    paginationData={paginationData}
                                    onCadastrar={handleCadastrar}
                                    onEdit={handleEditar}
                                    onDelete={handleDeletar}
                                    renderUnidades={renderFiltroUnidades}
                                />
                                {renderPaginacao()}
                            </div>
                        </div>

                        <Modal show={showCadastrarModal} onHide={() => setShowCadastrarModal(false)} size="lg" centered>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    <PlusCircle className="me-2" />
                                    Cadastrar Nova Sala
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {renderFormulario()}
                            </Modal.Body>
                        </Modal>

                        {/* Modal Editar Sala */}
                        <Modal show={showEditarModal} onHide={() => setShowEditarModal(false)} size="lg" centered>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    <PencilSquare className="me-2" />
                                    Editar Sala
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {renderFormulario(true)}
                            </Modal.Body>
                        </Modal>

                        {/* Modal Confirmar Deletar */}
                        <Modal show={showDeletarModal} onHide={() => setShowDeletarModal(false)} centered>
                            <Modal.Header closeButton>
                                <Modal.Title className="text-danger">
                                    <ExclamationTriangle className="me-2" />
                                    Confirmar Exclusão
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="text-center">
                                    <Trash className="text-danger" style={{fontSize: '3rem'}} />
                                    <p className="mt-3 mb-2">Tem certeza que deseja deletar a sala <strong>{salaDeletando?.numero}</strong> da unidade <strong>{salaDeletando?.unidade}</strong>?</p>
                                    <p className="text-muted">Esta ação não pode ser desfeita.</p>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowDeletarModal(false)}>
                                    Cancelar
                                </Button>
                                <Button 
                                    variant="danger" 
                                    onClick={confirmarDeletar}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Deletando...
                                        </>
                                    ) : (
                                        <>
                                            <Trash className="me-2" />
                                            Deletar
                                        </>
                                    )}
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Container>
                </div>
            </Layout>
        </>
    );
}