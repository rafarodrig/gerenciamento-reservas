import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function AlertaModal({ 
  msg, 
  onExited 
}) {
  const [showAlertaModal, setShowAlertaModal] = useState(true);

  if(!msg) return null;
  
  return (
    <>
      <Modal 
      show={showAlertaModal} 
      onHide={() => setShowAlertaModal(false)} 
      onExited={onExited}  
      centered>
        <Modal.Header>
          <Modal.Title>Alerta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{msg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowAlertaModal(false)} >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
