import { Table, Button, Alert, Pagination, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { DoorOpen, Cpu } from 'react-bootstrap-icons';

export default function SalaTable({ data, onReservar, onPageChange }) {
  const salas = data.salas.data;
  const currentPage = data.salas.current_page;
  const lastPage = data.salas.last_page;

  if (!salas || salas.length === 0) {
    return <Alert variant="warning">Nenhuma sala disponível</Alert>;
  }

  return (
    <>
      <Card className=" shadow-sm border-0">
        <Card.Header className="bg-light d-flex align-items-center">
          <DoorOpen className="me-2 text-primary" />
          <strong>Salas disponíveis</strong>
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover responsive className="table table-striped align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Sala</th>
                <th>Tipo</th>
                <th>Lotação</th>
                <th>N.º Máquinas</th>
                <th>Tipo de Máquinas</th>
                <th className="text-center">Ação</th>
              </tr>
            </thead>
            <tbody>
              {salas.map((sala) => (
                <tr key={sala.id}>
                  <td>{sala.numero}</td>
                  <td>{sala.tipo}</td>
                  <td>{sala.lotacao}</td>
                  <td>{sala.maquinas_qtd}</td>
                  <td>{sala.maquinas_tipo}</td>
                  <td className="text-center">
                    <OverlayTrigger overlay={<Tooltip>Reservar esta sala</Tooltip>}>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => onReservar(sala.id)}
                      >
                        Reservar
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Pagination className="justify-content-center mt-4">
        {[...Array(lastPage)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
}
