import { useState, useEffect } from 'react';
import axios from 'axios';
import EditarReservaModal from './EditarReservaModal';
import TrocarTurmaModal from './TrocarSalaModal';


export default function EditarReservaContainer({ reservaId, onResetId, onResult, setAlert }) {
  const [formData, setFormData] = useState(null);
  const [reservaDados, setReservaDados] = useState(null);
  const [editarRegistro, setEditarRegistro] = useState("atual");
  const [salasDisponiveisTroca, setSalasDisponiveisTroca] = useState(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Fetch dos dados
  useEffect(() => {
    if (reservaId) {
      axios.get(`/reservas/${reservaId}`).then((res) => {
        const reserva = res.data
        setFormData({
          responsavel_cadastro: reserva.responsavel_cadastro,
          turma: reserva.turma.id,
          sala: reserva.sala.id,
        });
        setReservaDados(reserva);
        setShowFormModal(true);
        buscarSalasDisponiveisTroca("atual");
      });
    }
  }, [reservaId]);


  const buscarSalasDisponiveisTroca = async (CustomTrocarSala, page = null) => {
    const res = await axios.get(`/salas/disponiveis_troca`, { params: { reserva_id: reservaId, opcao: CustomTrocarSala || editarRegistro, page } });
    setSalasDisponiveisTroca(res.data);
  }


  // Ação ao clicar em "Salvar" no primeiro modal
  const handleSubmit = () => {
    setShowFormModal(false);
    setShowConfirmModal(true);
  };

  // Confirmação final
  const handleConfirm = (salaNova) => {
    axios.put(`/reservas/${reservaId}`, { sala_nova: salaNova, opcao: editarRegistro })
      .then((res) => {
        onResult({ show: true, type: "success", message: res.data.message })
      }).catch((err) => {
        onResult({ show: true, type: "danger", message: 'Erro ao cadastrar sala: ' + (err.response?.data?.message || err.message) })
      }).finally(() => {
        setShowConfirmModal(false);
        onResetId()
      })
  };

  return (
    <>
      <EditarReservaModal
        show={showFormModal}
        reserva={reservaDados}
        onCancel={() => { setShowFormModal(false); onResetId() }}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        reservaId={reservaId}
        onTrocarSala={handleSubmit}
        backdrop="static"
        animation
      />

      <TrocarTurmaModal
        show={showConfirmModal}
        reserva={reservaDados}
        salas={salasDisponiveisTroca}
        buscarSalasDisponiveisTroca={buscarSalasDisponiveisTroca}
        onConfirm={handleConfirm}
        setEditarRegistro={setEditarRegistro}
        setAlert={setAlert}
        onCancel={() => { setShowConfirmModal(false); setShowFormModal(true); }}
      />




    </>
  );
}
