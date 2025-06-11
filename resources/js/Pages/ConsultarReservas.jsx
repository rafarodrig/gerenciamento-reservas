import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import React, { useState, Suspense } from 'react';

import ReservaForm from '@/components/FormConsultarReservas';
import EditarReservaModal from '@/components/containers/EditarReservaContainer';
const TabelaReservas = React.lazy(() => import('../components/tables/TableReservasGrouByDatesV3'));

export default function ConsultarReserva({dataAtual, pagina_titulo, dataAtualFormatada, numeros}) {

  const [reservas, setReservas] = useState([]);
  const [showTabela, setShowTabela] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);

  const [formData, setFormData] = useState({
      turma: "",
      sala: "",
      docente: "",
      curso: "",
      data_inicio: dataAtual,
      data_fim: "",
      reserva_tipo: "",
      reserva_status: "Ativa",
      unidade: "1"
    });

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
        } finally {
            // setLoading(false);
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
                <TabelaReservas  onPageChange={(page) => buscar(page)} data={reservas} setReservaSelecionada={(id) => setReservaSelecionada(id)} />
          </Suspense>
        )}
  </div>
    <EditarReservaModal
              reservaId={reservaSelecionada}
              onResetId={() => setReservaSelecionada(null)}
              onResult={() => buscar(currentPage,null)}
            />
</Layout>
</>
)}