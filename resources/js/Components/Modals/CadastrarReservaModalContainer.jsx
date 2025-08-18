import { useState } from "react";
import DeletarTurmaModal from "./DeletarTurmaModal";
import CadastrarReservaModal from "./CadastrarReservaModal";
import TurmaForm from "../Forms/TurmaForm";
import CadastrarTurmaModal from "./CadastrarTurmaModal";
import EditarModal from "./EditarModal";

export default function CadastrarReservaContainer({
  sala,
  reserva,
  turmasDisponiveis,
  fetchTurmasDisponiveis,
  onResult,
  setShowCadastrarReservaModal,
  showCadastrarReservaModal,
}) {

  const [showCadastrarTurmaModal, setShowCadastrarTurmaModal] = useState(false);
  const [showEditarTurmaModal, setShowEditarTurmaModal] = useState(false);
  const [showDeletarTurmaModal, setShowDeletarTurmaModal] = useState(false);

  const [editarTurma, setEditarTurma] = useState(false)
  const [deletarTurma, setDeletarTurma] = useState(null)
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);


  const handleDeletarTurma = (turma) => {
    setDeletarTurma(turma);
    setShowDeletarTurmaModal(true);
  }

  const renderFormTurma = (isEditing = false) => (
    <TurmaForm
      isEditing={isEditing}
      turma={editarTurma}
      onClose={() => {
        if (editarTurma) {
          setShowEditarTurmaModal(false);
        } else {
          setShowCadastrarTurmaModal(false);
        }
      }}
      onEdited={() => { setTurmaSelecionada(editarTurma?.id) }}
      onCreated={() => { fetchTurmasDisponiveis(); }}
    />
  );

  const handleEditarTurma = (turma) => {
    setEditarTurma(turma)
    setShowEditarTurmaModal(true)
  }

  if (!reserva) return null;

  return (
    <>
      <CadastrarReservaModal
        show={showCadastrarReservaModal}
        turmaSelecionada={turmaSelecionada}
        setTurmaSelecionada={setTurmaSelecionada}
        sala={sala}
        reserva={reserva}
        turmas={turmasDisponiveis}
        onResult={() => { onResult(false); }}
        onClose={() => { setShowCadastrarReservaModal(false); setTurmaSelecionada(null) }}
        setCadastrarTurma={() => { setShowCadastrarTurmaModal(true) }}
        setEditarTurma={handleEditarTurma}
        setDeletarTurma={handleDeletarTurma}
      />

      <CadastrarTurmaModal
        show={showCadastrarTurmaModal}
        onShow={() => setShowCadastrarReservaModal(false)}
        onExit={() => setShowCadastrarReservaModal(true)}
        onClose={() => { setShowCadastrarTurmaModal(false) }}
      >
        {renderFormTurma()}
      </CadastrarTurmaModal>


      <EditarModal
        title="Editar Turma"
        show={showEditarTurmaModal}
        onShow={() => setShowCadastrarReservaModal(false)}
        onExit={() => { setEditarTurma(null); setShowCadastrarReservaModal(true) }}
        onClose={() => { setShowEditarTurmaModal(false); }}
      >
        {renderFormTurma(true)}
      </EditarModal>


      <DeletarTurmaModal
        turma={deletarTurma}
        show={showDeletarTurmaModal}
        onShow={() => setShowCadastrarReservaModal(false)}
        onClose={() => { setShowCadastrarReservaModal(true); setShowDeletarTurmaModal(false); }}
        onResult={() => { fetchTurmasDisponiveis(); setTurmaSelecionada(null) }}
        onExited={() => { setDeletarTurma(null); }}
      />


    </>
  )

}