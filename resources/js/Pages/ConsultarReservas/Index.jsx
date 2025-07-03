import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import React, { useState, useRef, useEffect } from 'react';
import ReservaForm from '@/Components/ConsultarReservasForm';
import ModalEditarReserva from '@/Components/Containers/EditarReservaContainer';
import ModalDeletarReserva from '@/Components/Modals/DeletarReservaModal';
import { dataAtual } from '@/dates';
import TabelaReservas from '@/Components/Tables/ReservasTable';
import { CSSTransition } from 'react-transition-group';
import { Alert } from 'react-bootstrap';

export default function ConsultarReservas({ numeros }) {

  const title = "Consultar Reserva"

  const tabelaRef = useRef(null);
  const [reservas, setReservas] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editarReserva, setEditarReserva] = useState(null);
  const [deletarReserva, setDeletarReserva] = useState(null);

  const [alert, setAlert] = useState('')
  const alertDivRef = useRef(null);

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
    unidade: "1"
  });

  const handleResult = (msg) => {
    setAlert(msg)
    buscar(currentPage, true);
  }

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false })); // Trigger fade-out after 3 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const buscar = async (page, animation, customFormData = null) => {

    const finalFormData = customFormData || formData;

    if (animation) setIsActive(false);

    try {
      const response = await axios.get('/reservas', { params: { ...finalFormData, page } });
      setReservas(response.data);
      setCurrentPage(page);
      setIsActive(true);
    } catch (error) {
      console.error('Error ', error);
    }
  };

  return (
    <>
      <Head title={title} />
      <Layout>
        <ReservaForm
          formData={formData}
          setFormData={(formData) => setFormData(formData)}
          numeros={numeros}
          onBuscar={() => buscar(null, true, formData)}
          paginaTitulo={title}
        />


        <CSSTransition
          in={isActive}
          timeout={400}
          classNames="fade-table"
          nodeRef={tabelaRef}
          unmountOnExit
        >
          <div ref={tabelaRef} className="container-fluid rounded-4 my-4 shadow-sm" id="container-tabela">
            <TabelaReservas
              onPageChange={(page) => buscar(page, false)}
              data={reservas}
              editarReserva={(id) => setEditarReserva(id)}
              deletarReserva={(id) => setDeletarReserva(id)}
            />
          </div>
        </CSSTransition>

        <ModalEditarReserva
          reservaId={editarReserva}
          onResetId={() => setEditarReserva(null)}
          onResult={handleResult}
        />


        <ModalDeletarReserva
          reservaId={deletarReserva}
          onResetId={() => setDeletarReserva(null)}
          onResult={handleResult}
        />

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

      </Layout>
    </>
  )
}