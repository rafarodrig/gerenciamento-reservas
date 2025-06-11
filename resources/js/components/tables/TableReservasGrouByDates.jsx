import { Table, Button, Alert, Pagination } from 'react-bootstrap';
import EditarReservaModal from '../modals/EditarReservaModalV1';
import { useState } from 'react';
import { converterData } from '@/dates';
import axios from 'axios';
import ModalEditarReservaComfirmacao from '../modals/ConfirmarEditarReservaModal';

function getUniqueValues(arr, key) {
  return [...new Set(arr.map((item) => item[key]))];
}

export default function ReservaTable({ data, onPageChange }) {
  const lastPage = data.reservas.last_page;
  const currentPage = data.reservas.current_page;
  const reservas = data.reservas.data;

  const uniqueDates = getUniqueValues(reservas, "data");

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);
  const [turmas, setTurmas] = useState([]);

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`/reservas/${id}`);
      setReservaSelecionada(response.data);
      setTurmas(response.data.turmas || []);
      setShowModal1(true);
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
      {uniqueDates.map((dataStr) => {
        const reservasPorData = reservas.filter((r) => r.data === dataStr);
        return (
          <div key={dataStr}>
            <h5 className="mt-3">Reservas do dia { converterData(dataStr)}</h5>
            <Table hover responsive className="table table-striped  table-sm align-middle table-borderless tabela-consulta">
              <thead>
                <tr>
                  <th>Sala</th>
                  <th>Turno</th>
                  <th>Tipo de reserva</th>
                  <th>Turma</th>
                  <th>Docente</th>
                  <th>Lotação</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {reservasPorData.map((reserva) => (
                  <tr key={reserva.id}>
                    <td>{`${reserva.sala.numero} - ${reserva.sala.tipo}`}</td>
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
          </div>
        );
      })}

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
        <>
        <EditarReservaModal
          showModal1={showModal1}
          setShow={() => setShowModal2(true)}
          handleCloseModal1={() => setShowModal1(false)}
          reserva={reservaSelecionada}
        />
        <ModalEditarReservaComfirmacao
         showModal2={showModal2}
          handleCloseModal2={() => {
            setShowModal2(false); 
            setShowModal1(true)}} 
          />
        </>
      )}
    </>
  );
}
