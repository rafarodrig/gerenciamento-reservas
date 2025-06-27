import { Table, Button, Alert, Row, Col } from 'react-bootstrap';
import { PlusCircle, PencilSquare, Trash } from 'react-bootstrap-icons';

const SalaTable = ({ salas, unidade, paginationData, onCadastrar, onEdit, onDelete, renderUnidades }) => {
  return (
    <>
      {/* Hidden current page link (optional, for pagination tracking) */}
      {/* <a id="current_page" type="hidden" href={salas.currentPageUrl}></a> */}

      <Row className="my-3">
        <Col>{renderUnidades && renderUnidades()}</Col>
        <Col className="d-flex justify-content-end">
          <Button id="btn-cadastrar-sala" onClick={onCadastrar} variant="success">
            <PlusCircle className="me-2" />
            Cadastrar Nova Sala
          </Button>
        </Col>
      </Row>

      {/* Informações de paginação */}
      {paginationData && (
        <Row className="mb-3">
          <Col>
            <small className="text-muted">
              Mostrando {paginationData.from || 0} a {paginationData.to || 0} de {paginationData.total || 0} salas
              {unidade !== 'todas' && ` da unidade ${unidade}`}
            </small>
          </Col>
        </Row>
      )}

      {(!salas || salas.length === 0) ? (
        <Alert variant="warning">
          {unidade === 'todas' 
            ? 'Nenhuma sala cadastrada no sistema' 
            : `Nenhuma sala cadastrada da unidade ${unidade}`
          }
        </Alert>
      ) : (
        <Table 
          striped 
          bordered 
          hover 
          responsive 
          className={`align-middle tabela-consulta ${unidade === 'todas' ? 'com-unidade' : ''}`}
        >
          <thead>
            <tr>
              <th>Sala</th>
              {unidade === 'todas' && <th>Unidade</th>}
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
                {unidade === 'todas' && <td><span className="unidade-texto">Un. {sala.unidade}</span></td>}
                <td>{sala.tipo}</td>
                <td>{sala.lotacao}</td>
                <td>{sala.maquinas_qtd}</td>
                <td>{sala.maquinas_tipo}</td>
                <td>
                  <div className="action-buttons">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onEdit(sala.id)}
                      className="btn-editar-sala btn-acao"
                      title="Editar sala"
                    >
                      <PencilSquare className="me-1" />
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(sala.id)}
                      className="btn-deletar-sala btn-acao"
                      title="Deletar sala"
                    >
                      <Trash className="me-1" />
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