import { Head } from '@inertiajs/react';
import { CSSTransition } from 'react-transition-group';
import Layout from '@/Layouts/Layout';
import "./Index.css"
import React, { useState, useRef } from 'react';
import CadastrarReservaForm from '@/components/CadastrarReservaForm';
import FiltrosBadge from '@/components/Filtros/Filtros';
import { filtrosSalasDisponiveis } from '@/components/Filtros/geradoresDatas';
import CadastrarReservaContainer from '@/components/Containers/CadastrarReservaContainer';
import TableSalasDisponiveis from '@/components/tables/SalasDisponiveisTable';
import { dataAtual } from '@/dates';
import FiltrosContainer from '@/components/Filtros/FiltrosContainer';

export default function CadastrarReserva({ numeros, maquinas_tipos, tipos }) {
  const dataAtualISO = dataAtual("ISO")
  const title = "Cadastrar Reserva"
  const tabelaRef = useRef(null);
  
  const [salasDisponiveis, setSalasDisponiveis] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtrosBadge, setFiltrosBadge] = useState(null);
  const [cadastrarReserva, setCadastrarReserva] = useState(null);
  const [reserva, setReserva] = useState(null);
  const [isDisabledBtnReservar,setIsDisabledBtnReservar] = useState(false);

  const [formData, setFormData] = useState({
      data_inicio: dataAtualISO,
      data_fim: "",
      semanas: "",
      dias_semana: [] ,  
      reserva_tipo: "Avulsa",
      turno: "Manhã",
      unidade: "1",
      numero: "",
      maquinas_qtd:"",
      disponiveis: true,
      datas: [dataAtualISO]
    });


  const buscar = async (page, customFormData = null) => {
    
    const finalFormData = customFormData || formData;

    if(!page) setIsActive(false);

        try {
            const response = await axios.get('/salas', {params: { ...finalFormData, page }});
            const dados = response.data
            setSalasDisponiveis(dados);
            setCurrentPage(page);
            setReserva({
              query: dados.query,
              turmas_disponiveis: dados.turmas_disponiveis 
            })
            setIsActive(true);

        } catch (error) {
            console.error('Error ', error);
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
      buscar(null, updatedFormData)
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

  return (
    <>
      <Head title={title} />

      <Layout>
        <CadastrarReservaForm
              formData={formData}
              currentPage={currentPage}
              numeros={numeros}
              onBuscar={() => buscar(null, formData)}
              paginaTitulo={title}
              tipos={tipos}
              maquinasTipos={maquinas_tipos}
              gerarfiltros={getFiltros}
              setIsDisabledBtnReservar={setIsDisabledBtnReservar}
            />

          <FiltrosContainer>
            <FiltrosBadge formData={formData} objFiltros={filtrosBadge} onRemoverData={handleRemoverData}/>
          </FiltrosContainer>
        
          {/* <div  className="container-fluid my-4 shadow-sm" id="container-tabela"> */}
            <CSSTransition
              in={isActive}
              timeout={400}
              classNames="fade-table"
              nodeRef={tabelaRef}
              unmountOnExit
            >
              <div ref={tabelaRef} className="container-fluid my-4 shadow-sm" id="container-tabela">
                <TableSalasDisponiveis
                  onPageChange={(page) => buscar(page)}
                  data={salasDisponiveis}
                  onReservar={(id) => setCadastrarReserva(id)}
                  isDisabledBtnReservar={isDisabledBtnReservar}
                />
              </div>
            </CSSTransition>      
          {/* </div> */}

            <CadastrarReservaContainer
              salaId={cadastrarReserva} 
              reserva={reserva} 
              onResult={() => buscar(page=currentPage, null)} 
              resetId={() => setCadastrarReserva(null)}
            />
      </Layout>
    </>
  )
}