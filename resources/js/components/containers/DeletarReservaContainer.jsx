import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AlertaModal from '../modals/AlertaModal';
import ModalDeletarReserva from '../modals/DeletarReservaModal';

export default function EditarReservaContainer({ reservaId, onClose, onResult }) {
  const [formData, setFormData] = useState(null);
  const [reservaDados, setReservaDados] = useState(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAlertaModal, setShowAlertaModal] = useState(false);
  
  const [alertaMsg, setAlertaMsg] = useState(null);

  const [isMounted, setIsMounted] = useState(false); // controle de desmontagem

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
        setIsMounted(true);
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

  // Quando o primeiro modal termina de fechar (caso o usuário cancele)
  const handleFormExited = () => {
    if (!showConfirmModal) {
      setIsMounted(false); // desmonta tudo
      onClose();
    }
  };

  // Quando o modal de confirmação termina de fechar
  const handleConfirmExited = () => {
    if (!showFormModal) {
      setIsMounted(false);
      onClose();
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <ModalDeletarReserva />

      {alertaMsg && (
        <AlertaModal show={showAlertaModal} msg={alertaMsg} onClose={ () => setShowAlertaModal(false) } onExited={handleConfirmExited}  />
      )}
    </>
  );
}
