import { Table, Button, Alert, Row, Col } from 'react-bootstrap';

const SalaTable = ({ salas, unidade, onCadastrar, onEdit, onDelete, renderUnidades }) => {
  return (
    <>
      {/* Hidden current page link (optional, for pagination tracking) */}
      {/* <a id="current_page" type="hidden" href={salas.currentPageUrl}></a> */}

      <Row className="my-3">
        <Col>{renderUnidades && renderUnidades()}</Col>
        <Col className="d-flex justify-content-end">
          <Button id="btn-cadastrar-sala" onClick={onCadastrar}>
            Cadastrar
          </Button>
        </Col>
      </Row>

      {(!salas || salas.length === 0) ? (
        <Alert variant="warning">
          Nenhuma sala cadastrada da unidade <strong>{unidade}</strong>
        </Alert>
      ) : (
        <Table striped bordered hover responsive className="align-middle tabela-consulta">
          <thead>
            <tr>
              <th>Sala</th>
              <th>Tipo</th>
              <th>Lotação</th>
              <th>N.º máquinas</th>
              <th>Máquinas tipo</th>
              <th>Ação</th>
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
                <td>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onEdit(sala.id)}
                      className="btn-editar-sala"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(sala.id)}
                      className="btn-deletar-sala"
                    >
                      Deletar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Optional: pagination controls */}
      {/* You can render pagination here with a library or your own logic */}
      {/* Example: <PaginationComponent currentPage={...} totalPages={...} onPageChange={...} /> */}
    </>
  );
};

export default SalaTable;