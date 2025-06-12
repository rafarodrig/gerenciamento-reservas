import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import React, { useState, Suspense } from 'react';
import AlertaModal from '@/components/modals/AlertaModal';
import CadastrarReservaForm from '@/components/CadastrarReservaForm';
const TabelaReservas = React.lazy(() => import('../components/tables/TableReservasGrouByDatesV3'));

export default function ConsultarReserva({dataAtual, pagina_titulo, dataAtualFormatada, numeros, maquinas_tipos, tipos }) {

  const [salasDisponiveis, setSalasDisponiveis] = useState([]);
  const [showTabela, setShowTabela] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertaMsg, setAlertaMsg] = useState(null);

  const [formData, setFormData] = useState({
      data_inicio: dataAtual,
      data_fim: "",
      semanas: "",
      dias_semana: [] ,  
      reserva_tipo: "Avulsa",
      turno: "Manhã",
      unidade: "1"
    });

    const handleResult = (msg) => {
      setAlertaMsg(msg)
      buscar(currentPage,null);
    }

  const buscar = async (page = 1, customFormData = null) => {
    
    const finalFormData = customFormData || formData;

        try {
            const response = await axios.get('/salas', {params: { ...finalFormData, page }});
            setSalasDisponiveis(response.data);
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
<Head title="Cadastrar Reservas" />
<Layout>
  <CadastrarReservaForm
        formData={formData}
        currentPage={currentPage}
        numeros={numeros}
        onBuscar={(customData) => buscar(1, customData)}
        pagina_titulo={pagina_titulo}
        dataAtualFormatada={dataAtualFormatada}
        tipos={tipos}
        maquinasTipos={maquinas_tipos}
      />
  
<div style={divStyle} className="container-fluid my-4 " id="container-tabela" >
  <br />
        {showTabela && (
          <Suspense >
                <TabelaReservas  
                onPageChange={(page) => buscar(page)} 
                data={salasDisponiveis} 
                editarReserva={(id) => setEditarReserva(id)}
                deletarReserva={(id) => setDeletarReserva(id)}
                  />
          </Suspense>
        )}
  </div>

    {alertaMsg && (
      <AlertaModal  msg={alertaMsg} onExited={() => setAlertaMsg(null)}  />
      )}

</Layout>
</>
)}