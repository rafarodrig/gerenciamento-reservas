import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import ReservaForm from '@/Components/Forms/ConsultarReservasForm';
import ModalEditarReserva from '@/Components/Modals/EditarReservaModalContainer';
import ModalDeletarReserva from '@/Components/Modals/DeletarReservaModal';
import { dataAtual } from '@/dates';
import TabelaReservas from '@/Components/Tables/ReservasTable';
import TituloData from '@/Components/TituloData';
import { Col, Row } from 'react-bootstrap';

export default function ConsultarReservas({ numeros }) {

  const title = "Consultar Reservas"

  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(null);

  const [editarReserva, setEditarReserva] = useState(null);
  const [deletarReserva, setDeletarReserva] = useState(null);

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

    // buscar(currentPage, true, currentTab);
  }

  const handleEditarReserva = (reserva) => {
    setEditarReserva(reserva);
    setShowEditarReservaModal(true)
    // abrir modal de edição aqui
  };

  const handleDeletarReserva = (reserva) => {
    setDeletarReserva(reserva);
    // abrir modal de confirmação aqui
  };

  return (
    <>
      <Head title={title} />
      <AuthenticatedLayout>
        <Row className='g-4 border h-100' >
          <Col xs={12} className=''>
            <TituloData
              className="page-component"
              titulo={title}
              descricao="Edite, exclua e gerencie as reservas do sistema"
            />
          </Col>
          <Col md={12} xl={3} >
            <ReservaForm
              className="page-component"
              formData={formData}
              setFormData={setFormData}
              numeros={numeros}
              onBuscar={() => setCurrentPage(1)}
            />
          </Col>

          <Col md={12} xl={9} >
            <div className="tabela-reservas h-100 page-component">
              <TabelaReservas
                unidade={formData.unidade}
                currentPage={currentPage}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                formData={formData}
                onEdit={handleEditarReserva}
                onDelete={handleDeletarReserva}
                onPageChange={setCurrentPage}
              />
            </div>

          </Col>
        </Row>

        {/*Container Reserva*/}
        <ModalEditarReserva
          showEditarReservaModal={showEditarReservaModal}
          setShowEditarReservaModal={setShowEditarReservaModal}
          reserva={editarReserva}
          onResult={handleResult}
        />

        <ModalDeletarReserva
          reservaId={deletarReserva}
          onResetId={() => setDeletarReserva(null)}
          onResult={handleResult}
        />

      </AuthenticatedLayout >
    </>
  )
}