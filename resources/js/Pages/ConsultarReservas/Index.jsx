import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import React, { useState, useRef } from 'react';
import AlertaModal from '@/components/modals/AlertaModal';
import ReservaForm from '@/components/ConsultarReservasForm';
import ModalEditarReserva from '@/components/Containers/EditarReservaContainer';
import ModalDeletarReserva from '@/components/modals/DeletarReservaModal';
import { dataAtual } from '@/dates';
import TabelaReservas from '@/components/tables/ReservasTable';
import { CSSTransition } from 'react-transition-group';

export default function ConsultarReservas({ numeros }) {

  const title = "Consultar Reserva"
  
  const tabelaRef = useRef(null);
  const [reservas, setReservas] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editarReserva, setEditarReserva] = useState(null);
  const [deletarReserva, setDeletarReserva] = useState(null);
  const [alertaMsg, setAlertaMsg] = useState(null);

  const [formData, setFormData] = useState({
      turma: "",
      sala: "",
      docente: "",
      curso: "",
      data_inicio: dataAtual("ISO"),
      data_fim: "",
      reserva_tipo: "",
      turno:"",
      reserva_status: "Ativa",
      unidade: "1"
    });

    const handleResult = (msg) => {
      setAlertaMsg(msg)
      buscar(currentPage,true);
    }

  const buscar = async (page, animation, customFormData = null) => {
    
    const finalFormData = customFormData || formData;

        if(animation) setIsActive(false);

        try {
            const response = await axios.get('/reservas', {params: { ...finalFormData, page }});
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
    
  {deletarReserva && (
    <ModalDeletarReserva 
      reservaId={deletarReserva}
      onResetId={() => setDeletarReserva(null)}
      onResult={handleResult}
    />
    )}

    {alertaMsg && (
      <AlertaModal  result={alertaMsg} onExited={() => setAlertaMsg(null)}  />
      )}

</Layout>
</>
)}