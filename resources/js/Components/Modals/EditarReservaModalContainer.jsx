import { useState } from 'react';
import EditarReservaModal from './EditarReservaModal';
import TurmaForm from '../Forms/TurmaForm';
import TrocarSalaModal from './TrocarSalaModal';
import EditarModal from './EditarModal';


export default function EditarReservaContainer({
  showEditarReservaModal,
  setShowEditarReservaModal,
  reserva,
  onResult,
}) {
  const [showTrocarSalaModal, setShowTrocarSalaModal] = useState(false);
  const [showEditarTurmaModal, setShowEditarTurmaModal] = useState(false);
  const [editarTurma, setEditarTurma] = useState(false)

  const renderTurmaForm = (isEditing = false) => (
    <TurmaForm
      isEditing={isEditing}
      turma={editarTurma}
      onClose={() => {
        if (editarTurma) {
          setShowEditarTurmaModal(false);
          setEditarTurma(null)
        }
        setShowEditarReservaModal(true);
      }}
      onEdited={() => { onResult(false); setShowEditarTurmaModal(false); }}
    />
  );

  return (
    <>
      <EditarReservaModal
        reserva={reserva}
        show={showEditarReservaModal}
        onClose={() => { setShowEditarReservaModal(false); }}
        onTrocarSala={() => {
          setShowEditarReservaModal(false);
          setShowTrocarSalaModal(true);
        }}
        setEditarTurma={(turma) => {
          setEditarTurma(turma);
          setShowEditarReservaModal(false);
          setShowEditarTurmaModal(true)
        }}
        backdrop="static"
        animation
      />

      <TrocarSalaModal
        show={showTrocarSalaModal}
        reserva={reserva}
        onClose={() => { setShowTrocarSalaModal(false); setShowEditarReservaModal(true); }}
      />

      <EditarModal
        title='Editar Turma'
        show={showEditarTurmaModal}
        onExited={() => setEditarTurma(null)}
        onClose={() => { setShowEditarTurmaModal(false); setShowEditarReservaModal(true) }}
      >
        {renderTurmaForm(true)}
      </EditarModal>



    </>
  );
}
