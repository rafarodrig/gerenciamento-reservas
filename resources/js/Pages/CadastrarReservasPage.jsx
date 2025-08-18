import { Head } from '@inertiajs/react';
import { CSSTransition } from 'react-transition-group';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useRef } from 'react';
import CadastrarReservaForm from '@/Components/Forms/CadastrarReservaForm';
import FiltrosBadge from '@/Components/Filtros/Filtros';
import { filtrosSalasDisponiveis } from '@/Components/Filtros/geradoresDatas';
import CadastrarReservaContainer from '@/Components/Modals/CadastrarReservaModalContainer';
import TableSalasDisponiveis from '@/Components/Tables/SalasDisponiveisTable';
import { dataAtual } from '@/dates';
import FiltrosContainer from '@/Components/Filtros/FiltrosContainer';
import TituloData from '@/Components/TituloData';
import { api } from '@/services/api';
import { Button } from 'react-bootstrap';
import CalendarioReservaModal from '@/Components/Modals/CalendarioReservaModal';

export default function CadastrarReserva({ numeros, maquinas_tipos, tipos }) {
  const dataAtualISO = dataAtual("ISO")
  const title = "Cadastrar Reserva"
  const tabelaRef = useRef(null);

  const [showCalendarioModal, setShowCalendarioModal] = useState(false);

  const [salasDisponiveis, setSalasDisponiveis] = useState([]);
  const [turmasDisponiveis, setTurmasDisponiveis] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtrosBadge, setFiltrosBadge] = useState(null);
  const [cadastrarReserva, setCadastrarReserva] = useState(null);
  const [reserva, setReserva] = useState(null);
  const [isDisabledBtnReservar, setIsDisabledBtnReservar] = useState(false);

  const [showCadastrarReservaModal, setShowCadastrarReservaModal] = useState(false)

  const [formData, setFormData] = useState({
    data_inicio: dataAtualISO,
    data_fim: "",
    semanas: "",
    dias_semana: [],
    reserva_tipo: "Avulsa",
    turno: "Manhã",
    unidade: "todas",
    numero: "",
    maquinas_qtd: "",
    disponiveis: true,
    datas: [dataAtualISO]
  });


  const fetchSalasDisponiveis = async (customFormData = null, page = null) => {
    const finalFormData = { ...(customFormData || formData) };
    const response = await api.get('/salas/disponiveis', { params: { ...finalFormData, page } });
    return response.data;
  };

  const fetchTurmasDisponiveis = async (customFormData = null) => {
    const finalFormData = { ...(customFormData || formData) };

    try {
      const response = await api.get('/turmas/disponiveis', { params: finalFormData });
      setTurmasDisponiveis(response.data.turmas);
    } catch (error) {
      console.error('Erro ao buscar turmas disponíveis:', error);
    }
  };

  const buscar = async (page = null, animation = true, customFormData = null) => {
    const finalFormData = { ...(customFormData || formData) };

    if (animation) setIsActive(false);

    try {
      const salasData = await fetchSalasDisponiveis(finalFormData, page);

      if (!page) {
        fetchTurmasDisponiveis(finalFormData);
      }

      setSalasDisponiveis(salasData);
      setCurrentPage(page);
      setReserva({
        turno: finalFormData.turno,
        data_inicio: finalFormData.data_inicio,
        datas: finalFormData.datas,
        reserva_tipo: finalFormData.reserva_tipo,
      });
    } catch (error) {
      console.error('Erro ao buscar salas disponíveis:', error);
    } finally {
      if (animation) setIsActive(true);
    }
  };

  const handleRemoverData = (newObjFiltros) => {
    let updatedFormData = {
      ...formData,
      datas: newObjFiltros.datas
    };
    setFormData(updatedFormData)
    setFiltrosBadge(newObjFiltros)
    setIsDisabledBtnReservar(false)
    buscar(null, true, updatedFormData)
  };

  const getFiltros = (formData) => {
    const objFiltros = filtrosSalasDisponiveis(formData);
    setFiltrosBadge(objFiltros);
    // Atualiza o formData incluindo as datas de objFiltros
    setFormData({
      ...formData,
      datas: objFiltros.datas,
    });
  };


  const handleCadastrarReserva = (salaId) => {
    const sala = salasDisponiveis.salas.data.find(s => s.id === salaId);
    setCadastrarReserva(sala);
    setShowCadastrarReservaModal(true);
    console.log(sala)
  }

  return (
    <>
      <Head title={title} />
      <AuthenticatedLayout >

        <TituloData className='page-component' titulo={title} descricao={"Cadastre as reservas do sistema"} />

        <CadastrarReservaForm
          className='page-component'
          formData={formData}
          setFormData={getFiltros}
          numeros={numeros}
          onBuscar={() => buscar(null, true, formData)}
          paginaTitulo={title}
          tipos={tipos}
          maquinasTipos={maquinas_tipos}
          setIsDisabledBtnReservar={setIsDisabledBtnReservar}
        />

        {/* Filtros Aplicados */}
        <FiltrosContainer title='Filtros Aplicados' className={"filtros-aplicados page-component py-3"} >
          <FiltrosBadge formData={formData} objFiltros={filtrosBadge} onRemoverData={handleRemoverData} />
          <Button onClick={() => setShowCalendarioModal(true)}>Ver Calendário</Button>
        </FiltrosContainer>

        {/* Tabela Salas Disponiveis */}
        <CSSTransition
          in={isActive}
          timeout={400}
          classNames="fade-table"
          nodeRef={tabelaRef}
          unmountOnExit
        >
          <div ref={tabelaRef} className="tabela-salas page-component">
            <TableSalasDisponiveis
              onPageChange={(page) => buscar(page, false)}
              data={salasDisponiveis}
              onReservar={handleCadastrarReserva}
              isDisabledBtnReservar={isDisabledBtnReservar}
            />
          </div>
        </CSSTransition>

        <CalendarioReservaModal
          show={showCalendarioModal}
          onHide={() => setShowCalendarioModal(false)}
          datasReserva={reserva?.datas || []}
        />

        <CadastrarReservaContainer
          fetchTurmasDisponiveis={fetchTurmasDisponiveis}
          turmasDisponiveis={turmasDisponiveis}
          sala={cadastrarReserva}
          reserva={reserva}
          showCadastrarReservaModal={showCadastrarReservaModal}
          setShowCadastrarReservaModal={setShowCadastrarReservaModal}
          onResult={(animation) => buscar(currentPage, animation)}
        />
      </AuthenticatedLayout>
    </>
  )
}