import { useEffect, useState, useRef } from "react";
import EditarTurmaModal from "./EditarTurmaModall";
import DeletarTurmaModal from "./DeletarTurmaModal";
import CadastrarReservaModal from "./CadastrarReservaModal";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import TurmaForm from "../Forms/TurmaForm";
import CadastrarTurmaModal from "./CadastrarTurmaModal";
export default function CadastrarReservaContainer({
  salaId,
  reserva,
  turmasDisponiveis,
  fetchTurmasDisponiveis,
  resetId,
  onResult

}) {

  const [editarTurma, setEditarTurma] = useState(false)
  const [deletarTurma, setDeletarTurma] = useState(false)

  const [showCadastrarTurmaModal, setShowCadastrarTurmaModal] = useState(false);
  const [showEditarTurmaModal, setShowEditarTurmaModal] = useState(false);


  const [showCadastrarReservaModal, setShowCadastrarReservaModal] = useState(false)
  const [formData, setFormData] = useState([]);
  const [sala, setSala] = useState(null);
  const [prevSala, setPrevSala] = useState(salaId);
  const [turmaCadastrada, setTurmaCadastrada] = useState(null);

  const [alert, setAlert] = useState('');
  const alertDivRef = useRef(null);

  if (prevSala !== salaId) {
    setPrevSala(salaId)
    setFormData((prev) => ({
      ...prev,
      cadastro_turma: 'cadastrada',
      nome: '',
      docente: '',
      curso: '',
      lotacao: '',
      responsavel_cadastro: '',
      turma: '',
      datas: reserva.datas,
      turno: reserva.turno,
      reserva_tipo: reserva.reserva_tipo,
      sala: salaId,
    }));
  }

  useEffect(() => {
    if (salaId) {
      axios.get(`/salas/${salaId}`)
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
      const res = await axios.get(`/turmas/${turma}`);
      setTurmaCadastrada(res.data);
    } catch (error) {
      console.error("Erro ao buscar turma cadastrada:", error);
      setTurmaCadastrada(null);
    }
  };

  useEffect(() => {
    fetchTurma(formData.turma);
  }, [formData.turma]);

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false })); // Trigger fade-out after 3 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleClose = (modal) => {
    if (modal == "cadastrar") {
      setShowCadastrarTurmaModal(false);
    } else {
      setShowEditarTurmaModal(false);
      setEditarTurma(null)
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


      {/* <EditarTurmaModal
        turma={editarTurma}
        onCancel={() => { setShowCadastrarReservaModal(true); }}
        onResult={(msg) => { setAlert(msg); fetchTurma(editarTurma); setShowCadastrarReservaModal(true); }}
        onExited={() => setEditarTurma(null)}
      /> */}

      <DeletarTurmaModal
        turmaId={deletarTurma}
        onCancel={() => { setShowCadastrarReservaModal(true); }}
        onResult={(msg) => { setAlert(msg); fetchTurmasDisponiveis(); setShowCadastrarReservaModal(true); setFormData((prev) => ({ ...prev, turma: "" })); }}
        onExited={() => setDeletarTurma(null)}
      />

      <CSSTransition
        in={!!alert.show}
        timeout={400}
        classNames="fade-alert"
        nodeRef={alertDivRef}
        unmountOnExit
      >
        <div ref={alertDivRef} className="alert-container">
          <Alert
            variant={alert?.type || "light"}
            dismissible
            onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
          >
            {alert?.message}
          </Alert>
        </div>
      </CSSTransition>
    </>
  )

}