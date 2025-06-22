import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import React, { useState, Suspense } from 'react';
import AlertaModal from '@/components/modals/AlertaModal';
import ReservaForm from '@/components/FormConsultarReservas';
import ModalEditarReserva from '@/components/containers/EditarReservaContainer';
import ModalDeletarReserva from '@/components/modals/DeletarReservaModal';

const TabelaReservas = React.lazy(() => import('../../components/tables/ReservasTable'));

export default function ConsultarReservas({dataAtual, pagina_titulo, dataAtualFormatada, numeros}) {

  const [reservas, setReservas] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [showTabela, setShowTabela] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editarReserva, setEditarReserva] = useState(null);
  const [deletarReserva, setDeletarReserva] = useState(null);
  const [alertaMsg, setAlertaMsg] = useState(null);

  const [formData, setFormData] = useState({
      turma: "",
      sala: "",
      docente: "",
      curso: "",
      data_inicio: dataAtual,
      data_fim: "",
      reserva_tipo: "",
      turno:"",
      reserva_status: "Ativa",
      unidade: "1"
    });

    const handleResult = (msg) => {
      setAlertaMsg(msg)
      buscar(currentPage,null);
    }

  const buscar = async (page = 1, customFormData = null) => {
    
    const finalFormData = customFormData || formData;

        try {
            const response = await axios.get('/reservas', {params: { ...finalFormData, page }});
            setReservas(response.data);
            setCurrentPage(page);
            setShowTabela(true);
            setIsActive(true);
            if (customFormData) setFormData(customFormData);
        } catch (error) {
            console.error('Error ', error);
        } 
    };

  const divStyle = {
        visibility: isActive ? "visible" : "hidden"
    }

return (
<>
<Head title="Consultar Reservas" />
<Layout>
  <ReservaForm
        formData={formData}
        currentPage={currentPage}
        numeros={numeros}
        onBuscar={(customData) => buscar(1, customData)}
        pagina_titulo={pagina_titulo}
        dataAtualFormatada={dataAtualFormatada}
      />
  
<div style={divStyle} className="container-fluid my-4 " id="container-tabela" >
  <br />
        {showTabela && (
          <Suspense >
                <TabelaReservas  
                onPageChange={(page) => buscar(page)} 
                data={reservas} 
                editarReserva={(id) => setEditarReserva(id)}
                deletarReserva={(id) => setDeletarReserva(id)}
                  />
          </Suspense>
        )}
  </div>

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
      <AlertaModal  msg={alertaMsg} onExited={() => setAlertaMsg(null)}  />
      )}

</Layout>
</>
)}