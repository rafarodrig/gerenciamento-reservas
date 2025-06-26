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


  const buscar = async (page, animation, customFormData = null) => {
    
    const finalFormData = customFormData || formData;

    if(animation) setIsActive(false)

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

  return (
    <>
      <Head title={title} />
      <Layout>
        <CadastrarReservaForm
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
        <FiltrosContainer>
          <FiltrosBadge formData={formData} objFiltros={filtrosBadge} onRemoverData={handleRemoverData}/>
        </FiltrosContainer>
      
        {/* Tabela Salas Disponiveis */}
        <CSSTransition
          in={isActive}
          timeout={400}
          classNames="fade-table"
          nodeRef={tabelaRef}
          unmountOnExit
        >
          <div ref={tabelaRef} className="container-fluid rounded-4 my-4 shadow-sm"  id="container-tabela">
            <TableSalasDisponiveis
              onPageChange={(page) => buscar(page,false)}
              data={salasDisponiveis}
              onReservar={(id) => setCadastrarReserva(id)}
              isDisabledBtnReservar={isDisabledBtnReservar}
            />
          </div>
        </CSSTransition>      

        <CadastrarReservaContainer
          salaId={cadastrarReserva} 
          reserva={reserva} 
          onResult={(animation) => buscar(currentPage, animation)} 
          resetId={() => setCadastrarReserva(null)}
        />
      </Layout>
    </>
  )
}