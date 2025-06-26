import { Collapse, Button } from 'react-bootstrap';
import { FunnelFill } from 'react-bootstrap-icons';
import { useState } from 'react';

export default function FiltrosContainer({ children }) {
  const [show, setShow] = useState(true); // pode iniciar false se quiser colapsado por padrão

  return (
    <div className="container-fluid mt-4 shadow-sm rounded-4 bg-light py-3" id="container-filtros">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong className="text-secondary">Filtros Aplicados</strong>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setShow(!show)}
          aria-controls="tabDatas"
          aria-expanded={show}
        >
          <FunnelFill className="me-1" />
          {show ? 'Ocultar' : 'Mostrar'}
        </Button>
      </div>

      <Collapse in={show}>
        <div id="tabDatas" className="d-flex flex-wrap gap-2">
          {children}
        </div>
      </Collapse>
    </div>
  );
}