import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import React, { useState, Suspense } from 'react';

import ReservaForm from '@/components/FormConsultarReservas';
const TabelaReservas = React.lazy(() => import('../Components/TableReservas'));

export default function ConsultarReserva({dataAtual, pagina_titulo, dataAtualFormatada, numeros}) {

  const [reservas, setReservas] = useState([]);
  const [showTabela, setShowTabela] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
            // if (customFormData) setFormData(customFormData);
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
  
<div style={divStyle} class="container-fluid my-4 " id="container-tabela" >
  <br />
      {/* {loading && <p className="mt-4">Fetching data...</p>} */}
        {showTabela && (

          <Suspense >
                    <TabelaReservas  onPageChange={(page) => buscar(page)} data={reservas} />
                </Suspense>
            )}
  </div>
</Layout>
</>
)}