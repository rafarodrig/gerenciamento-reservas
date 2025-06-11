import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import EditarReservaModal from '../modals/EditarReservaModalV2';
import ConfirmarEditarModal from '../modals/ConfirmarEditarReservaModal';
import AlertaModal from '../modals/AlertaModal';

export default function EditarReservaContainer({ reservaId, onResetId, onResult }) {
  const [formData, setFormData] = useState(null);
  const [reservaDados, setReservaDados] = useState(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAlertaModal, setShowAlertaModal] = useState(false);
  
  const [alertaMsg, setAlertaMsg] = useState(null);

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
        setReservaDados(res.data);
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
    console.log('Enviando dados:', formData);
    axios.patch(`/reservas/${reservaId}`, formData)
    .then((res) => { 
      setShowConfirmModal(false);
      setAlertaMsg(res.data.msg)
      setShowAlertaModal(true);
      onResult()
    })
  };

  return (
    <>
      <EditarReservaModal
        show={showFormModal}
        reserva={reservaDados}
        onCancel={() => {setShowFormModal(false); onResetId()}}
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
        onCancel={() => {setShowConfirmModal(false); setShowFormModal(true);}}
        formData={formData}
        setFormData={setFormData}
      />
      {alertaMsg && (
        <AlertaModal show={showAlertaModal} msg={alertaMsg} onClose={ () => setShowAlertaModal(false) } onExited={onResetId}  />
      )}
    </>
  );
}
