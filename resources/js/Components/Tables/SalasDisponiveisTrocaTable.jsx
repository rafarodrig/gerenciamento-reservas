import { Table, Button, Alert, Card, Container } from 'react-bootstrap';
import { DoorOpen } from 'react-bootstrap-icons';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import PaginationControlls from '../Pagination/PaginationControlls';

export default function TableSalasDisponiveisTroca({ data, onReservar, onPageChange }) {

  if (!data) return null;
  const salas = data?.salas.data;
  const salasResponse = data?.salas;
  let paginationData = null;

  if (salasResponse.data && Array.isArray(salasResponse.data)) {
    // Resposta paginada do Laravel
    paginationData = {
      current_page: salasResponse.current_page,
      last_page: salasResponse.last_page,
      per_page: salasResponse.per_page,
      total: salasResponse.total,
      from: salasResponse.from,
      to: salasResponse.to,
      prev_page_url: salasResponse.prev_page_url,
      next_page_url: salasResponse.next_page_url
    };
  }

  if (!salas || salas.length === 0) {
    return (
      <Container className='container-style overflow-auto p-3'  >
        <Alert variant="warning" className="d-flex align-items-center gap-2 shadow-sm m-0 ">
          <ExclamationTriangleFill className="me-2 text-warning" size={20} />
          <div><strong>Nenhuma sala disponível.</strong></div>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Container className='tabela-salas-troca container-style p-3'>
        <Card className="border-0">
          <Card.Header className="d-flex  align-items-center">
            <DoorOpen className="me-2 text-primary" />
            <strong>Salas disponíveis </strong>
          </Card.Header>
          <Card.Body className=" scrollable-container p-0 border-bottom" style={{ height: '400px' }}>
            <Table hover responsive className="text-center align-middle mb-0">
              <thead>
                <tr>
                  <th>Sala</th>
                  <th>Tipo</th>
                  {data.unidade === "todas" && <th>Unidade</th>}
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
                    <td>{sala.tipo_sala.nome}</td>
                    {data.unidade === "todas" &&
                      <td>
                        Un.{sala.unidade}
                      </td>
                    }
                    <td>{sala.lotacao}</td>
                    <td>{sala.maquinas_qtd}</td>
                    <td>{sala.tipo_maquina.nome}</td>
                    <td className="text-center">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onReservar(sala.id)}
                      >
                        Reservar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <PaginationControlls className={"d-flex justify-content-center my-3"} paginationData={paginationData} handlePageChange={onPageChange} />
      </Container>
    </>
  );
}
