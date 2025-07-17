import { Head } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-bootstrap';
import Layout from '@/Layouts/Layout';
import SalasTable from '@/Components/Tables/SalasTable';
import FormSalas from '@/Components/Forms/SalaForm';
import ModalDeletarSala from '@/Components/Modals/DeletarSalaModal';
import ModalEditarSala from '@/Components/Modals/EditarSalaModal';
import ModalCadastrarSala from '@/Components/Modals/CadastrarSalaModal';
import { CSSTransition } from 'react-transition-group';
import TituloData from '@/Components/TituloData';
import axios from 'axios';
import GerenciarSalasForm from '@/Components/Forms/GerenciarSalasForm';

export default function GerenciarSalas() {
    const title = "Gerenciar Salas"
    const [salas, setSalas] = useState([]);
    const [filteredSalas, setFilteredSalas] = useState([]);
    const [unidadeFiltro, setUnidadeFiltro] = useState('todas');
    const [paginationData, setPaginationData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');
    const alertDivRef = useRef(null);


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

    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert((prev) => ({ ...prev, show: false }));
                // Trigger fade-out after 3 seconds
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const fetchSalas = async (unidade = unidadeFiltro, page = 1) => {
        setLoading(true);
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
            setAlert({ show: true, type: "danger", message: 'Erro ao carregar salas: ' + errorMessage });
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

        try {
            const response = await axios.post('/salas', formData);
            setAlert({ show: true, type: "success", message: response.data.message });
            setShowCadastrarModal(false);
            resetForm();
            fetchSalas(unidadeFiltro, currentPage);
        } catch (err) {
            setAlert({ show: true, type: "danger", message: 'Erro ao cadastrar sala: ' + (err.response?.data?.message || err.message) });
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

        try {
            const response = await axios.put(`/salas/${salaEditando.id}`, { formData });

            setAlert({ show: true, type: "success", message: response.data.message });
            setShowEditarModal(false);
            setSalaEditando(null);
            resetForm();
            fetchSalas(unidadeFiltro, currentPage);
        } catch (err) {
            setAlert({ show: true, type: "danger", message: 'Erro ao atualizar sala: ' + (err.response?.data?.message || err.message) });
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

        try {
            const response = await axios.delete(`/salas/${salaDeletando.id}`);

            setAlert({ show: true, type: "success", message: response.data.message });
            setShowDeletarModal(false);
            setSalaDeletando(null);
            // Se estamos na última página e só tem um item, volta para a página anterior
            const shouldGoToPrevPage = paginationData &&
                filteredSalas.length === 1 &&
                currentPage > 1;
            fetchSalas(unidadeFiltro, shouldGoToPrevPage ? currentPage - 1 : currentPage);
        } catch (err) {
            setAlert({ show: true, type: "danger", message: 'Erro ao deletar sala: ' + (err.response?.data?.message || err.message) });
        } finally {
            setLoading(false);
        }
    };


    const renderFormulario = (isEditing = false) => (
        <FormSalas
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
            loading={loading}
            resetForm={resetForm}
            setShowEditarModal={setShowEditarModal}
            setShowCadastrarModal={setShowCadastrarModal}
            setSalaEditando={setSalaEditando}
            handleSubmitCadastrar={handleSubmitCadastrar}
            handleSubmitEditar={handleSubmitEditar}
        />
    );

    return (
        <>
            <Head title={title} />
            <Layout>
                <TituloData className='page-component' titulo={title} descricao={"Cadastre, edite e gerencie as salas do sistema"} />

                {/* Alert message */}
                <CSSTransition
                    in={!!alert.show}
                    timeout={400}
                    classNames="fade-alert"
                    nodeRef={alertDivRef}
                    unmountOnExit
                >
                    <div ref={alertDivRef} className="alert-container">
                        <Alert
                            variant={alert?.type || "light"}
                            dismissible
                            onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
                        >
                            {alert?.message}
                        </Alert>
                    </div>
                </CSSTransition>

                <div className='page-component'>
                    <GerenciarSalasForm
                        unidadeFiltro={unidadeFiltro}
                        handleUnidadeChange={handleUnidadeChange}
                        onCadastrar={handleCadastrar}
                    />
                </div>


                <div className="tabela-salas page-component">
                    <div className="table-container">
                        {loading && (
                            <div className="loading-overlay">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Carregando...</span>
                                </div>
                            </div>
                        )}



                        <SalasTable
                            salas={filteredSalas}
                            unidade={unidadeFiltro}
                            paginationData={paginationData}
                            onEdit={handleEditar}
                            onDelete={handleDeletar}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>

                {/* Modal Cadastrar Sala */}
                <ModalCadastrarSala
                    setShowCadastrarModal={setShowCadastrarModal}
                    showCadastrarModal={showCadastrarModal}
                >{renderFormulario()}
                </ModalCadastrarSala>


                {/* Modal Editar Sala */}
                <ModalEditarSala
                    setShowEditarModal={setShowEditarModal}
                    showEditarModal={showEditarModal}
                >{renderFormulario(true)}
                </ModalEditarSala>

                {/* Modal Confirmar Deletar */}
                <ModalDeletarSala
                    loading={loading}
                    showDeletarModal={showDeletarModal}
                    confirmarDeletar={confirmarDeletar}
                    salaDeletando={salaDeletando}
                    setShowDeletarModal={setShowDeletarModal}
                />
            </Layout>
        </>
    );
}