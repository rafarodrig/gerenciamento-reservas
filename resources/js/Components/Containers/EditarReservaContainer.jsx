import { useState, useEffect } from 'react';
import axios from 'axios';
import EditarReservaModal from '../Modals/EditarReservaModal';
import ConfirmarEditarModal from '../Modals/ConfirmarEditarReservaModal';


export default function EditarReservaContainer({ reservaId, onResetId, onResult }) {
  const [formData, setFormData] = useState(null);
  const [reservaDados, setReservaDados] = useState(null);

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
          editar_reserva: null
        });
        setReservaDados(reserva);
        setShowFormModal(true);
      });
    }
  }, [reservaId]);




  // Ação ao clicar em "Salvar" no primeiro modal
  const handleSubmit = () => {
    setFormData((formData) => ({
      ...formData,
      editar_reserva: 'atual',
    }));
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
        backdrop="static"
        animation
      />

      <ConfirmarEditarModal
        show={showConfirmModal}
        reserva={reservaDados}
        onConfirm={handleConfirm}
        onCancel={() => { setShowConfirmModal(false); setShowFormModal(true); }}
        formData={formData}
        setFormData={setFormData}
      />




    </>
  );
}
