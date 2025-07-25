import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useRef } from 'react';
import ReservaForm from '@/Components/Forms/ConsultarReservasForm';
import ModalEditarReserva from '@/Components/Modals/EditarReservaModalContainer';
import ModalDeletarReserva from '@/Components/Modals/DeletarReservaModal';
import { dataAtual } from '@/dates';
import TabelaReservas from '@/Components/Tables/ReservasTable';
import TabDatas from '@/Components/TabDatas';
import { CSSTransition } from 'react-transition-group';
import TituloData from '@/Components/TituloData';
import AlertPop from '@/Components/Alerts/Alert';
import { api } from '@/services/api';

export default function ConsultarReservas({ numeros }) {

  const title = "Consultar Reservas"

  const tabelaRef = useRef(null);
  const [reservasTabela, setReservasTabela] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editarReserva, setEditarReserva] = useState(null);
  const [deletarReserva, setDeletarReserva] = useState(null);
  const [tabDados, setTabDados] = useState({
    currentTab: null,
    datas: []
  })

  const [alert, setAlert] = useState({ show: false, type: null, message: null })

  const [showEditarReservaModal, setShowEditarReservaModal] = useState(false);


  const [formData, setFormData] = useState({
    turma: "",
    sala: "",
    docente: "",
    curso: "",
    data_inicio: dataAtual("ISO"),
    data_fim: "",
    reserva_tipo: "",
    turno: "",
    reserva_status: "Ativa",
    unidade: "todas",
  });

  const handleResult = (msg) => {
    setAlert(msg)
    buscar(currentPage, true, tabDados.currentTab);
  }


  const buscar = async (page, animation, tabData, customFormData = null) => {

    const finalFormData = customFormData || formData;

    if (animation) setIsActive(false);

    api.get('/reservas', { params: { ...finalFormData, page, tabData } })
      .then((res) => {
        const dados = res.data
        setReservasTabela(dados);
        setTabDados((prev) => ({ ...prev, datas: dados.datas, currentTab: dados.currentTab }))
        setCurrentPage(page);
      })
      .catch((err) => {
        setAlert({ show: true, type: "danger", message: err.response?.data?.message })
      })
      .finally(() => {
        setIsActive(true);
      });
  };

  const fetchTab = (tabData) => {
    api.get('/reservas/tabData', { params: { ...formData, tabData } })
      .then((res) => {
        const dados = res.data
        setReservasTabela(dados);
        setTabDados((prev) => ({ ...prev, currentTab: tabData }))
        console.log(dados)
      }).catch((err) => {
        setAlert({ show: true, type: "danger", message: err.response?.data?.message })
      });
  }

  const handleEditarReserva = (reservaId) => {
    const reservas = reservasTabela?.reservas?.data;

    const reserva = reservas.find(r => r.id === reservaId);
    console.log(reserva)
    if (reserva) {
      setEditarReserva(reserva);
      setShowEditarReservaModal(true)
    }
  };

  return (
    <>
      <Head title={title} />
      <AuthenticatedLayout>
        <TituloData className='page-component' titulo={title} descricao={"Edite, exclua e gerencie as reservas do sistema"} />
        <ReservaForm
          className='page-component'
          formData={formData}
          setFormData={(formData) => setFormData(formData)}
          numeros={numeros}
          onBuscar={() => buscar(null, true)}
        />


        <CSSTransition
          in={isActive}
          timeout={400}
          classNames="fade-table"
          nodeRef={tabelaRef}
          unmountOnExit
        >
          <div ref={tabelaRef} className="tabela-reservas page-component" >
            <TabDatas
              datas={tabDados.datas}
              currentTab={tabDados.currentTab}
              setCurrentData={(data) => { fetchTab(data) }}
            />
            <TabelaReservas
              onPageChange={(page) => buscar(page, false)}
              data={reservasTabela}
              editarReserva={handleEditarReserva}
              deletarReserva={(id) => setDeletarReserva(id)}
            />
          </div>
        </CSSTransition>

        {/*Container Reserva*/}
        <ModalEditarReserva
          showEditarReservaModal={showEditarReservaModal}
          setShowEditarReservaModal={setShowEditarReservaModal}
          reserva={editarReserva}
          onResetId={() => setEditarReserva(null)}
          onResult={handleResult}
          setAlert={setAlert}
        />

        <ModalDeletarReserva
          reservaId={deletarReserva}
          onResetId={() => setDeletarReserva(null)}
          onResult={handleResult}
        />
        {/* Alert Popup */}
        <AlertPop
          alert={alert} setAlert={setAlert}
        />

      </AuthenticatedLayout>
    </>
  )
}