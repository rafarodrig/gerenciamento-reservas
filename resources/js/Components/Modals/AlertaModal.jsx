import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function AlertaModal({ 
  result, 
  onExited,
  prevModal 
}) {
  const [showAlertaModal, setShowAlertaModal] = useState(true);

  const handleClose = () => {
    
    setShowAlertaModal(false)
    if(result.prevModal){
      prevModal()
    }
  }

  if(!result) return null;
  return (
    <>
      <Modal 
      show={showAlertaModal} 
      onHide={handleClose} 
      onExited={onExited}  
      centered>
        <Modal.Header>
          <Modal.Title>Alerta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='my-2'>{result?.msg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
