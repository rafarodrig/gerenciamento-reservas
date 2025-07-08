import { Table, Button, Alert, Pagination, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { PencilSquare, Trash, Calendar3 } from 'react-bootstrap-icons';
import { converterData, diaSemana } from '@/dates';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import PaginationControlls from '../PaginationControlls';

export default function ReservasTable({ data, onPageChange, deletarReserva, editarReserva }) {
  const reservas = data.reservas.data;
  const reservaRes = data?.reservas;
  let paginationData = null;

  if (!reservas || reservas.length === 0) {
    return (
      <Alert variant="warning" className="d-flex align-items-center gap-2 shadow-sm border-1 m-0">
        <ExclamationTriangleFill className="me-2 text-warning" size={20} />
        <div><strong>Nenhuma reserva encontrada.</strong> Verifique os filtros aplicados.</div>
      </Alert>
    );
  }

  if (reservaRes.data && Array.isArray(reservaRes.data)) {
    // Resposta paginada do Laravel
    paginationData = {
      current_page: reservaRes.current_page,
      last_page: reservaRes.last_page,
      per_page: reservaRes.per_page,
      total: reservaRes.total,
      from: reservaRes.from,
      to: reservaRes.to,
      prev_page_url: reservaRes.prev_page_url,
      next_page_url: reservaRes.next_page_url
    };
  }


  return (
    <Card className="my-4 shadow-sm border-0">
      <Card.Header className="bg-light d-flex align-items-center">
        <Calendar3 className="me-2 text-primary" />
        <strong>Reservas do dia {converterData(reservas[0].data)} -  </strong>
      </Card.Header>
      <Card.Body className="p-0">
        <Table hover striped responsive className="table  table-borderless text-center align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Sala</th>
              {data.unidade === "todas" &&
                <th>Unidade</th>
              }
              <th>Turno</th>
              <th>Tipo</th>
              <th>Turma</th>
              <th>Docente</th>
              <th>Lotação</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>
                  <span title={`${reserva.sala.numero} - ${reserva.sala.tipo}`}>
                    {`${reserva.sala.numero} - ${reserva.sala.tipo}`}
                  </span>
                </td>
                {data.unidade === "todas" &&
                  <td>
                    Un.{reserva.sala.unidade}
                  </td>
                }
                <td>
                  <span className="badge bg-secondary">{reserva.turma.turno}</span>
                </td>
                <td>
                  <span className="badge bg-primary">{reserva.turma.tipo}</span>
                </td>
                <td className="text-truncate" style={{ maxWidth: '200px' }}>
                  <span title={reserva.turma.nome}>{reserva.turma.nome}</span>
                </td>
                <td className="text-truncate" style={{ maxWidth: '200px' }}>
                  <span title={reserva.turma.docente}>{reserva.turma.docente}</span>
                </td>
                <td>
                  <span className="text-muted fw-bold">
                    {reserva.turma.lotacao}/{reserva.sala.lotacao}
                  </span>
                </td>
                <td className="text-center">
                  <div className="d-inline-flex gap-2">
                    <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => editarReserva(reserva.id)}
                      >
                        <PencilSquare />
                      </Button>
                    </OverlayTrigger>
                    {data.status === "Ativa" &&
                      <OverlayTrigger overlay={<Tooltip>Deletar</Tooltip>}>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deletarReserva(reserva.id)}
                        >
                          <Trash />
                        </Button>
                      </OverlayTrigger>
                    }
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationControlls className={"d-flex justify-content-center mt-3"} paginationData={paginationData} handlePageChange={onPageChange} />
      </Card.Body>
    </Card>
  );
}
