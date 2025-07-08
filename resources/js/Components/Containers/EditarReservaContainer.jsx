import { useState, useEffect } from 'react';
import axios from 'axios';
import EditarReservaModal from '../Modals/EditarReservaModal';
import ConfirmarEditarModal from '../Modals/ConfirmarEditarReservaModal';


export default function EditarReservaContainer({ reservaId, onResetId, onResult }) {
  const [formData, setFormData] = useState(null);
  const [reservaDados, setReservaDados] = useState(null);
  const [trocarSala, setTrocarSala] = useState("atual");
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
      });
    }
  }, [reservaId]);


  const buscarSalasDisponiveisTroca = async (CustomTrocarSala, page = null) => {
    const res = await axios.get(`/salas/disponiveis_troca`, { params: { reserva_id: reservaId, opcao: CustomTrocarSala || trocarSala, page } });
    setSalasDisponiveisTroca(res.data);
  }


  // Ação ao clicar em "Salvar" no primeiro modal
  const handleSubmit = () => {
    buscarSalasDisponiveisTroca("atual");
    setShowFormModal(false);
    setShowConfirmModal(true);
  };

  // Confirmação final
  const handleConfirm = () => {
    axios.patch(`/reservas/${reservaId}`, formData)
      .then((res) => {
        setShowConfirmModal(false);
        onResult({
          prevModal: false,
          msg: res.data.msg
        })
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

      <ConfirmarEditarModal
        show={showConfirmModal}
        reserva={reservaDados}
        salas={salasDisponiveisTroca}
        buscarSalasDisponiveisTroca={buscarSalasDisponiveisTroca}
        onConfirm={handleConfirm}
        onCancel={() => { setShowConfirmModal(false); setShowFormModal(true); }}
      // formData={formData}
      // setFormData={setFormData}
      />




    </>
  );
}
