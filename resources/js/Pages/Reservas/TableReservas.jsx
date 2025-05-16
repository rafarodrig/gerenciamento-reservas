import { Table, Button, Alert } from 'react-bootstrap';


const ReservaTable = ({ reservas }) => {
  if (!reservas || reservas.length === 0) {
    return <Alert variant="warning">Nenhum resultado encontrado</Alert>;
  }

  return (
    <>
      <Table striped bordered hover responsive className="align-middle tabela-consulta">
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
          {/* {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{`${reserva.sala.numero} - ${reserva.sala.tipo}`}</td>
              <td>{reserva.dataFormatted}</td>
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
                    // onClick={() => handleEdit(reserva.id)}
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
          ))} */}
        </tbody>
      </Table>

      {/* Pagination Component Placeholder */}
      <div className="d-flex justify-content-center mt-3">
        {/* Example: render custom pagination here */}
        {/* You can use react-bootstrap Pagination or your own */}
      </div>
    </>
  );
};
export default ReservaTable;
