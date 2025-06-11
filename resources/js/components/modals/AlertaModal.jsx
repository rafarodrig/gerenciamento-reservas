import { Modal, Button } from 'react-bootstrap';
export default function AlertaModal({show, msg, onClose, onExited }) {

  if(!msg) return null; 

  return (
    <>
      <Modal show={show} onHide={onClose} onExited={onExited} centered>
        <Modal.Header>
          <Modal.Title>Alerta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{msg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onClose} >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
