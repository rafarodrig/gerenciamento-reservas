import { useState, useEffect } from 'react';
import EditarReservaModal from './EditarReservaModal';
import TurmaForm from '../Forms/TurmaForm';
import EditarTurmaModal from './EditarTurmaModall';
import TrocarSalaModal from './TrocarSalaModal';
import { api } from '@/services/api';


export default function EditarReservaContainer({ showEditarReservaModal, setShowEditarReservaModal, reserva, onResetId, onResult, setAlert }) {
  const [editarRegistro, setEditarRegistro] = useState("atual");
  const [salasDisponiveisTroca, setSalasDisponiveisTroca] = useState(null);

  const [formData, setFormData] = useState({
    turma: reserva?.turma.id || "",
    sala: reserva?.sala.id || "",
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [showEditarTurmaModal, setShowEditarTurmaModal] = useState(false);
  const [editarTurma, setEditarTurma] = useState(false)

  // Fetch dos dados
  useEffect(() => {
    if (reserva) {
      setFormData({
        turma: reserva.turma.id,
        sala: reserva.sala.id,
      });
      buscarSalasDisponiveisTroca("atual");
    }
  }, [reserva]);


  const buscarSalasDisponiveisTroca = async (CustomTrocarSala, page = null) => {
    const res = await api.get(`/salas/disponiveis_troca`, { params: { reserva_id: reserva?.id, opcao: CustomTrocarSala || editarRegistro, page } });
    setSalasDisponiveisTroca(res.data);
  }


  // Ação ao clicar em "Salvar" no primeiro modal
  const handleSubmit = () => {
    setShowEditarReservaModal(false);
    setShowConfirmModal(true);
  };

  // Confirmação final
  const handleConfirm = (salaNova) => {
    api.put(`/reservas/${reserva?.id}`, { sala_nova: salaNova, opcao: editarRegistro })
      .then((res) => {
        onResult({ show: true, type: "success", message: res.data.message })
      }).catch((err) => {
        onResult({ show: true, type: "danger", message: 'Erro ao cadastrar sala: ' + (err.response?.data?.message || err.message) })
      }).finally(() => {
        setShowConfirmModal(false);
        onResetId()
      })
  };

  const handleClose = () => {
    if (editarTurma) {
      setShowEditarTurmaModal(false);
      setEditarTurma(null)
    }
    setShowEditarReservaModal(true);
  }

  const handleEditarTurma = (turma) => {
    setEditarTurma(turma);
    setShowEditarReservaModal(false);
    setShowEditarTurmaModal(true)
  }

  const renderTurmaForm = (isEditing = false) => (
    <TurmaForm
      isEditing={isEditing}
      turma={editarTurma}
      onCancel={handleClose}
      onEdited={() => { fetchTurma(editarTurma); setShowEditarTurmaModal(false); }}
      onResult={(msg) => { setAlert(msg); setShowEditarReservaModal(true); }}
    />
  );

  return (
    <>
      <EditarReservaModal
        show={showEditarReservaModal}
        reserva={reserva}
        onCancel={() => { setShowEditarReservaModal(false); }}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onTrocarSala={handleSubmit}
        setEditarTurma={handleEditarTurma}
        backdrop="static"
        animation
      />

      <TrocarSalaModal
        show={showConfirmModal}
        reserva={reserva}
        salas={salasDisponiveisTroca}
        onConfirm={handleConfirm}
        setEditarRegistro={setEditarRegistro}
        setAlert={setAlert}
        onCancel={() => { setShowConfirmModal(false); setShowEditarReservaModal(true); }}
      />

      <EditarTurmaModal
        onExited={() => setEditarTurma(null)}
        onClose={() => { setShowEditarTurmaModal(false); setShowEditarReservaModal(true) }}
        showEditarTurmaModal={showEditarTurmaModal}
      >
        {renderTurmaForm(true)}
      </EditarTurmaModal>



    </>
  );
}
