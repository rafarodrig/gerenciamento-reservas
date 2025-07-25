import { useEffect, useState, useRef } from "react";
import EditarTurmaModal from "./EditarTurmaModall";
import DeletarTurmaModal from "./DeletarTurmaModal";
import CadastrarReservaModal from "./CadastrarReservaModal";
import TurmaForm from "../Forms/TurmaForm";
import CadastrarTurmaModal from "./CadastrarTurmaModal";
import AlertPop from "../Alerts/Alert";
import { api } from "@/services/api";
export default function CadastrarReservaContainer({
  salaId,
  reserva,
  turmasDisponiveis,
  fetchTurmasDisponiveis,
  resetId,
  onResult

}) {

  const [showEditarTurmaModal, setShowEditarTurmaModal] = useState(false);
  const [editarTurma, setEditarTurma] = useState(false)


  const [deletarTurma, setDeletarTurma] = useState(false)

  const [showCadastrarTurmaModal, setShowCadastrarTurmaModal] = useState(false);


  const [showCadastrarReservaModal, setShowCadastrarReservaModal] = useState(false)
  const [formData, setFormData] = useState([]);
  const [sala, setSala] = useState(null);
  const [prevSala, setPrevSala] = useState(salaId);
  const [turmaCadastrada, setTurmaCadastrada] = useState(null);
  const [alert, setAlert] = useState('');

  if (prevSala !== salaId) {
    setPrevSala(salaId)
    setFormData((prev) => ({
      ...prev,
      cadastro_turma: 'cadastrada',
      nome: '',
      docente: '',
      curso: '',
      lotacao: '',
      turma: '',
      datas: reserva.datas,
      turno: reserva.turno,
      reserva_tipo: reserva.reserva_tipo,
      sala: salaId,
    }));
  }

  useEffect(() => {
    if (salaId) {
      api.get(`/salas/${salaId}`)
        .then((res) => {
          const sala = res.data
          setSala(sala);
          setShowCadastrarReservaModal(true);
        });
    }
  }, [salaId]);

  const fetchTurma = async (turma) => {
    if (!turma) {
      setTurmaCadastrada(null);
      return;
    }
    try {
      const res = await api.get(`/turmas/${turma}`);
      setTurmaCadastrada(res.data);
    } catch (error) {
      console.error("Erro ao buscar turma cadastrada:", error);
      setTurmaCadastrada(null);
    }
  };

  useEffect(() => {
    fetchTurma(formData.turma);
  }, [formData.turma]);



  const handleClose = () => {
    if (editarTurma) {
      setShowEditarTurmaModal(false);
      setEditarTurma(null)
    } else {
      setShowCadastrarTurmaModal(false);
    }
    setShowCadastrarReservaModal(true);
  }

  const renderFormulario = (isEditing = false) => (
    <TurmaForm
      isEditing={isEditing}
      turma={editarTurma}
      onCancel={handleClose}
      onEdited={() => { fetchTurma(editarTurma?.id); setShowEditarTurmaModal(false); }}
      onCreated={() => { fetchTurmasDisponiveis(); setShowEditarTurmaModal(false); }}
      onResult={(msg) => { setAlert(msg); setShowCadastrarReservaModal(true); }}
    />
  );

  const handleEditarTurma = (turma) => {
    setEditarTurma(turma);
    setShowCadastrarReservaModal(false);
    setShowEditarTurmaModal(true)
  }

  if (!reserva) return null;

  return (
    <>
      <CadastrarReservaModal
        show={showCadastrarReservaModal}
        turmaCadastrada={turmaCadastrada}
        sala={sala}
        reserva={reserva}
        turmas={turmasDisponiveis}
        formData={formData}
        setFormData={setFormData}
        onResult={(msg) => { setAlert(msg); setShowCadastrarReservaModal(false); onResult(false); resetId(); }}
        onCancel={() => { setShowCadastrarReservaModal(false); resetId(); }}
        setCadastrarTurma={() => { setShowCadastrarReservaModal(false); setShowCadastrarTurmaModal(true) }}
        setEditarTurma={(turma) => handleEditarTurma(turma)}
        setDeletarTurma={(id) => { setShowCadastrarReservaModal(false); setDeletarTurma(id) }}
        setAlert={setAlert}
      />

      <CadastrarTurmaModal
        onClose={() => { setShowCadastrarTurmaModal(false); setShowCadastrarReservaModal(true) }}
        showCadastrarTurmaModal={showCadastrarTurmaModal}
      >
        {renderFormulario()}
      </CadastrarTurmaModal>


      <EditarTurmaModal
        onExited={() => setEditarTurma(null)}
        onClose={() => { setShowEditarTurmaModal(false); setShowCadastrarReservaModal(true) }}
        showEditarTurmaModal={showEditarTurmaModal}
      >
        {renderFormulario(true)}
      </EditarTurmaModal>


      <DeletarTurmaModal
        turmaId={deletarTurma}
        onCancel={() => { setShowCadastrarReservaModal(true); }}
        onResult={(msg) => { setAlert(msg); fetchTurmasDisponiveis(); setShowCadastrarReservaModal(true); setFormData((prev) => ({ ...prev, turma: "" })); }}
        onExited={() => setDeletarTurma(null)}
      />

      <AlertPop alert={alert} setAlert={setAlert} />
    </>
  )

}