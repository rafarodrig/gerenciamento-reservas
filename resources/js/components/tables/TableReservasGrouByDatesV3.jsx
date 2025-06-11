import { Table, Button, Alert, Pagination, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { PencilSquare, Trash, Calendar3} from 'react-bootstrap-icons';
import { useState } from 'react';
import { converterData } from '@/dates';

function getUniqueValues(arr, key) {
  return [...new Set(arr.map((item) => item[key]))];
}

export default function ReservaTable({ data, onPageChange, setReservaSelecionada }) {
  const lastPage = data.reservas.last_page;
  const currentPage = data.reservas.current_page;
  const reservas = data.reservas.data;

  const uniqueDates = getUniqueValues(reservas, "data");

  const handleEdit = (id) => {
    setReservaSelecionada(id)
  };

  const handleDelete = (id) => {
    setReservaSelecionada(id)
  };

  if (!reservas || reservas.length === 0) {
    return <Alert variant="warning">Nenhum resultado encontrado</Alert>;
  }

  return (
    <>
      {uniqueDates.map((dataStr) => {
        const reservasPorData = reservas.filter((r) => r.data === dataStr);

        return (
          <Card className="my-4 shadow-sm border-0" key={dataStr}>
            <Card.Header className="bg-light d-flex align-items-center">
              <Calendar3 className="me-2 text-primary" />
              <strong>Reservas do dia {converterData(dataStr)}</strong>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover responsive className="table table-borderless align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Sala</th>
                    <th>Turno</th>
                    <th>Tipo</th>
                    <th>Turma</th>
                    <th>Docente</th>
                    <th>Lotação</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasPorData.map((reserva) => (
                    <tr key={reserva.id}>
                      <td>{`${reserva.sala.numero} - ${reserva.sala.tipo}`}</td>
                      <td><span className="badge bg-secondary">{reserva.turma.turno}</span></td>
                      <td><span className="badge bg-primary">{reserva.turma.tipo}</span></td>
                      <td>{reserva.turma.nome}</td>
                      <td>{reserva.turma.docente}</td>
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
                              onClick={() => handleEdit(reserva.id)}
                            >
                              <PencilSquare />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger overlay={<Tooltip>Deletar</Tooltip>}>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(reserva.id)}
                            >
                              <Trash />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        );
      })}

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
