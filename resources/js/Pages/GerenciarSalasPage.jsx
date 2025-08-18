import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SalasTable from '@/Components/Tables/SalasTable';
import FormSalas from '@/Components/Forms/SalaForm';
import ModalDeletarSala from '@/Components/Modals/DeletarSalaModal';
import ModalCadastrarSala from '@/Components/Modals/CadastrarSalaModal';
import TituloData from '@/Components/TituloData';
import GerenciarSalasForm from '@/Components/Forms/GerenciarSalasForm';
import GerenciarTiposModal from '@/Components/Modals/GerenciarTiposModal';
import AlertPop from '@/Components/Alerts/Alert';
import { api } from '@/services/api';
import { useQueryClient } from '@tanstack/react-query';
import EditarModal from '@/Components/Modals/EditarModal';
export default function GerenciarSalas() {
    const title = "Gerenciar Salas"
    const [unidadeFiltro, setUnidadeFiltro] = useState('todas');
    const [currentPage, setCurrentPage] = useState(1);

    const [alert, setAlert] = useState('');

    const [tiposSala, setTiposSala] = useState([]);
    const [tiposMaquina, setTiposMaquina] = useState([]);

    const [editarSala, setEditarSala] = useState(null);

    // Estados dos modais
    const [showCadastrarModal, setShowCadastrarModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showDeletarModal, setShowDeletarModal] = useState(false);
    const [deletarSala, setDeletarSala] = useState(null);
    const [showGereciarTiposModal, setShowGerenciarTiposModal] = useState(false);

    const fetchTiposSala = () => {
        api.get('/tipos-sala')
            .then(res => { setTiposSala(res.data); })
            .catch(err => console.error('Erro ao buscar tipos de sala:', err));
    }
    const fetchTiposMaquina = () => {
        api.get('/tipos-maquina')
            .then(res => { setTiposMaquina(res.data); })
            .catch(err => console.error('Erro ao buscar tipos de máquina:', err));
    }

    useEffect(() => {
        fetchTiposSala();
        fetchTiposMaquina();
    }, []);

    // Novo estado
    const queryClient = useQueryClient();
    const queryKey = ['salas', unidadeFiltro, currentPage];

    // Chamando refetch manualmente:
    const refreshSalas = () => {
        queryClient.invalidateQueries({ queryKey });
    };


    const renderFormSala = (isEditing = false) => (
        <FormSalas
            sala={editarSala}
            isEditing={isEditing}
            tiposMaquina={tiposMaquina}
            tiposSala={tiposSala}
            onClose={() => {
                if (editarSala) {
                    setShowEditarModal(false);
                } else {
                    setShowCadastrarModal(false);
                }
            }}
            onResult={refreshSalas}
        />
    );

    return (
        <>
            <Head title={title} />
            <AuthenticatedLayout >
                <TituloData
                    className='page-component'
                    titulo={title}
                    descricao={"Cadastre, edite e gerencie as salas do sistema"}
                />

                <AlertPop alert={alert} setAlert={setAlert} />
                {/* Alert message */}

                <div className='page-component'>
                    <GerenciarSalasForm
                        unidadeFiltro={unidadeFiltro}
                        handleUnidadeChange={(unidade) => {
                            setUnidadeFiltro(unidade);
                            setCurrentPage(1);
                        }}
                        onCadastrar={() => setShowCadastrarModal(true)}
                        onGerenciarTipos={setShowGerenciarTiposModal}
                    />
                </div>


                <div className="tabela-salas page-component">
                    <div className="table-container">
                        <SalasTable
                            unidade={unidadeFiltro}
                            currentPage={currentPage}
                            onEdit={(sala) => {
                                setEditarSala(sala);
                                setShowEditarModal(true);
                            }}
                            onDelete={(sala) => {
                                setDeletarSala(sala);
                                setShowDeletarModal(true);
                            }}
                            onPageChange={(page) =>
                                setCurrentPage(page)
                            }
                        />
                    </div>
                </div>

                {/* Modal Cadastrar Sala */}
                <ModalCadastrarSala
                    show={showCadastrarModal}
                    onClose={() => {
                        setShowCadastrarModal(false);
                    }}
                >{renderFormSala()}
                </ModalCadastrarSala>


                {/* Modal Editar Sala */}
                <EditarModal
                    title='Editar Sala'
                    show={showEditarModal}
                    onExit={() => {
                        setEditarSala(null);
                    }}
                    onClose={() => {
                        setShowEditarModal(false);
                    }}
                >{renderFormSala(true)}
                </EditarModal>


                <GerenciarTiposModal
                    tiposSala={tiposSala}
                    fetchTiposSala={fetchTiposSala}
                    fetchTiposMaquina={fetchTiposMaquina}
                    tiposMaquina={tiposMaquina}
                    show={showGereciarTiposModal}
                    onHide={() => setShowGerenciarTiposModal(false)}
                    setAlert={setAlert}

                />

                {/* Modal Confirmar Deletar */}
                <ModalDeletarSala
                    sala={deletarSala}
                    show={showDeletarModal}
                    onClose={() => { setShowDeletarModal(false); }}
                    onResult={refreshSalas}
                    onExited={() => { setDeletarSala(null); }}
                />
            </AuthenticatedLayout>
        </>
    );
}