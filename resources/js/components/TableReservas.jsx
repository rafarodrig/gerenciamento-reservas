import { Table, Button, Alert } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import EditarReservaModal from './modals/EditarReservaModal';
import { useState } from 'react';

export default function ReservaTable({ data, onPageChange }) {

  console.log(data)
  const lastPage = data.reservas.last_page
  const currentPage = data.reservas.current_page
  const reservas = data.reservas.data

  const [showModal, setShowModal] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);
  const [turmas, setTurmas] = useState([]);

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`/reservas/${id}`);
      console.log(response.data)
      setReservaSelecionada(response.data);
      setTurmas(response.data.turmas || []);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao buscar reserva:", error);
      alert("Erro ao carregar os dados da reserva.");
    }
  };


  if (!reservas || reservas.length === 0) {
    return <Alert variant="warning">Nenhum resultado encontrado</Alert>;
  }

  return (
    <>
      <Table hover responsive className="table table-striped align-middle tabela-consulta">
        <thead>
          <tr>
            <th>Sala</th>
            <th>Data</th>
            <th>Turno</th>
            <th>Tipo de reserva</th>
            <th>Turma</th>
            <th>Docente</th>
            <th>Lotação</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{`${reserva.sala.numero} - ${reserva.sala.tipo}`}</td>
              <td>{reserva.data}</td>
              <td>{reserva.turma.turno}</td>
              <td>{reserva.turma.tipo}</td>
              <td>{reserva.turma.nome}</td>
              <td>{reserva.turma.docente}</td>
              <td>{`${reserva.turma.lotacao}/${reserva.sala.lotacao}`}</td>
              <td>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(reserva.id)}
                    >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    // onClick={() => handleDelete(reserva.id)}
                    >
                    Deletar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    <Pagination className="justify-content-center mt-3">
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
      {reservaSelecionada && (
        <EditarReservaModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          reserva={reservaSelecionada}
        />
      )}
    </>
  );

};
