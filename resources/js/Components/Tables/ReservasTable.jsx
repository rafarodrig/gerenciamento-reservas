import { Table, Alert, Card } from 'react-bootstrap';
import Badge from '@/Components/Badges/BadgeBt';
import { converterData } from '@/dates';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import PaginationControlls from '../Pagination/PaginationControlls';
import EditarButton from '../Buttons/EditarButton';
import DeletarButton from '../Buttons/DeletarButton';
import { CalendarDays } from 'lucide-react';


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
    <Card className="my-4 border-0 rounded-4">
      <Card.Header className="d-flex border-0 align-items-center">
        <CalendarDays className="me-2 text-primary" />
        <strong>Reservas do dia {converterData(reservas[0].data)} </strong>
      </Card.Header>
      <Card.Body className="p-0">
        <Table hover responsive className=" text-center align-middle ">
          <thead >
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
              <th className="text-center">Ação</th>
            </tr>
          </thead>
          <tbody >
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>
                  <span title={`${reserva.sala.numero} - ${reserva.sala?.tipo_sala?.nome}`}>
                    {`${reserva.sala.numero} - ${reserva.sala?.tipo_sala.nome}`}
                  </span>
                </td>
                {data.unidade === "todas" &&
                  <td>
                    Un.{reserva.sala.unidade}
                  </td>
                }
                <td>
                  <Badge>{reserva.turma.turno}</Badge>
                </td>
                <td>
                  <Badge>{reserva.turma.tipo}</Badge>
                </td>
                <td className="text-truncate" style={{ maxWidth: '200px' }}>
                  <span title={reserva.turma.nome}>{reserva.turma.nome}</span>
                </td>
                <td className="text-truncate" style={{ maxWidth: '200px' }}>
                  <span title={reserva.turma.docente}>{reserva.turma.docente}</span>
                </td>
                <td>
                  {reserva.turma.lotacao}/{reserva.sala.lotacao}
                </td>
                <td className="text-center">
                  <div className="action-buttons">
                    <EditarButton onClick={() => editarReserva(reserva.id)} ></EditarButton>
                    {data.status === "Ativa" &&
                      <DeletarButton onClick={() => deletarReserva(reserva.id)}></DeletarButton>
                    }
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationControlls className={"d-flex justify-content-center mt-3"} paginationData={paginationData} handlePageChange={onPageChange} />
      </Card.Body>
    </Card >
  );
}
