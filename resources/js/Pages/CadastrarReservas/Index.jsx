import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import "./Index.css"
import React, { useState, Suspense, useEffect, use } from 'react';
import AlertaModal from '@/components/modals/AlertaModal';
import CadastrarReservaForm from '@/components/CadastrarReservaForm';
import FiltrosBadge from '@/components/Filtros/Filtros';
import { filtrosSalasDisponiveis } from '@/components/Filtros/geradoresDatas';
import CadastrarReservaContainer from '@/components/containers/CadastrarReservaContainer';
const TabelaSalasDisponiveis = React.lazy(() => import('../../components/tables/SalasDisponiveisTable'));

export default function CadastrarReserva({dataAtual, pagina_titulo, dataAtualFormatada, numeros, maquinas_tipos, tipos }) {

  const [salasDisponiveis, setSalasDisponiveis] = useState([]);
  const [showTabela, setShowTabela] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertaMsg, setAlertaMsg] = useState(null);
  const [filtrosBadge, setFiltrosBadge] = useState(null);
  const [cadastrarReserva, setCadastrarReserva] = useState(null);
  const [reserva, setReserva] = useState(null);

  const [formData, setFormData] = useState({
      data_inicio: dataAtual,
      data_fim: "",
      semanas: "",
      dias_semana: [] ,  
      reserva_tipo: "Avulsa",
      turno: "Manhã",
      unidade: "1",
      numero: "",
      maquinas_qtd:"",
      disponiveis: true,
      datas: [dataAtual]
    });

    const handleResult = (msg) => {
      setAlertaMsg(msg)
      buscar(currentPage, null);
    }

    useEffect(() => {
    getFiltros(formData);
  }, []);


  const buscar = async (page = 1, customFormData = null) => {
    
    const finalFormData = customFormData || formData;

        try {
            const response = await axios.get('/salas', {params: { ...finalFormData, page }});
            const dados = response.data
            setSalasDisponiveis(dados);
            console.log(dados)
            setCurrentPage(page);
            setReserva({
              query: dados.query,
              turmas_disponiveis: dados.turmas_disponiveis 
            })
            setShowTabela(true);
            setIsActive(true);
            if (customFormData) setFormData(customFormData);
        } catch (error) {
            console.error('Error ', error);
        } 
    };

  const handleRemoverData = (newObjFiltros) => {
      setFormData(prev => ({
        ...prev,
        datas: newObjFiltros.datas
      }));
      setFiltrosBadge(newObjFiltros)
  };

  const divStyle = {
      visibility: isActive ? "visible" : "hidden"
    }
  
  const getFiltros = (formData) => {
    const objFiltros = filtrosSalasDisponiveis(formData);

    setFiltrosBadge(objFiltros);

    // Atualiza o formData incluindo as datas de objFiltros
    setFormData({
      ...formData,
      datas: objFiltros.datas,
    });
  };


return (
<>
<Head title="Cadastrar Reservas" />
<Layout>
  <CadastrarReservaForm
        formData={formData}
        currentPage={currentPage}
        numeros={numeros}
        onBuscar={() => buscar(1, formData)}
        pagina_titulo={pagina_titulo}
        dataAtualFormatada={dataAtualFormatada}
        tipos={tipos}
        maquinasTipos={maquinas_tipos}
        gerarfiltros={getFiltros}
      />

  <div className="container-fluid mt-4" id="container-filtros">
    <div className='collapse d-inline-flex flex-wrap' id='tabDatas'>
      {filtrosBadge && (
        <FiltrosBadge objFiltros={filtrosBadge} onRemoverData={handleRemoverData}/>
      )}
    </div>
  </div>
  
  <div style={divStyle} className="container-fluid my-4 " id="container-tabela" >
    <br />
      {showTabela && (
        <Suspense >
          <TabelaSalasDisponiveis  
          onPageChange={(page) => buscar(page)} 
          data={salasDisponiveis} 
          onReservar={(id) => setCadastrarReserva(id)}
          />
        </Suspense>
      )}
    </div>

      {/* {cadastrarReserva && ( */}
        <CadastrarReservaContainer
        salaId={cadastrarReserva} 
        reserva={reserva} 
        onResult={handleResult} 
        resetId={() => setCadastrarReserva(null)}
        />
      {/* )} */}

    {alertaMsg && (
      <AlertaModal msg={alertaMsg} onExited={() => setAlertaMsg(null)} />
    )}

</Layout>
</>
)}