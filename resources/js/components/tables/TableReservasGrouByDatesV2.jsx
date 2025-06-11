import { Card, Row, Col, Button, OverlayTrigger, Tooltip, Alert, Pagination } from 'react-bootstrap';
import { PencilSquare, Trash, Calendar3, People, InfoCircle } from 'react-bootstrap-icons';
import { useState } from 'react';
import axios from 'axios';
import { converterData } from '@/dates';
import EditarReservaModal from '../modals/EditarReservaModalV1';
import ModalEditarReservaComfirmacao from '../modals/ConfirmarEditarReservaModal';

function getUniqueValues(arr, key) {
  return [...new Set(arr.map((item) => item[key]))];
}

export default function ReservaCards({ data, onPageChange }) {
  const lastPage = data.reservas.last_page;
  const currentPage = data.reservas.current_page;
  const reservas = data.reservas.data;

  const uniqueDates = getUniqueValues(reservas, "data");

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`/reservas/${id}`);
      setReservaSelecionada(response.data);
      setShowModal1(true);
    } catch (error) {
      console.error("Erro ao buscar reserva:", error);
      alert("Erro ao carregar os dados da reserva.");
    }
  };

  if (!reservas || reservas.length === 0) {
    return <Alert variant="warning">Nenhuma reserva encontrada.</Alert>;
  }

  return (
    <>
      {uniqueDates.map((dataStr) => {
        const reservasPorData = reservas.filter((r) => r.data === dataStr);

        return (
          <div key={dataStr} className="mb-4">
            <h5 className="mb-3 d-flex align-items-center">
              <Calendar3 className="me-2 text-primary" />
              Reservas de {converterData(dataStr)}
            </h5>

            <Row xs={1} md={2} lg={3} className="g-3">
              {reservasPorData.map((reserva) => (
                <Col key={reserva.id}>
                  <Card className="shadow-sm h-100 border-0">
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-2">
                        <strong>{reserva.turma.nome}</strong>
                        <span className="badge bg-secondary">{reserva.turma.turno}</span>
                      </div>

                      <p className="mb-1">
                        <InfoCircle className="me-1" />
                        <strong>Sala:</strong> {reserva.sala.numero} - {reserva.sala.tipo}
                      </p>

                      <p className="mb-1">
                        <People className="me-1" />
                        <strong>Docente:</strong> {reserva.turma.docente}
                      </p>

                      <p className="mb-2">
                        <strong>Lotação:</strong> {reserva.turma.lotacao}/{reserva.sala.lotacao}
                      </p>

                      <div className="d-flex gap-2 justify-content-end">
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
                            onClick={() => alert('Função de deletar não implementada')}
                          >
                            <Trash />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
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
              setShowModal1(true);
            }}
          />
        </>
      )}
    </>
  );
}
