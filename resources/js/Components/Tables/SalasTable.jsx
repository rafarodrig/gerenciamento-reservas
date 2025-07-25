import { Table, Button, Alert, Row, Col } from 'react-bootstrap';
import PaginationControlls from '@/Components/Pagination/PaginationControlls';
import EditarButton from '../Buttons/EditarButton';
import DeletarButton from '../Buttons/DeletarButton';
import { Building, LucidePlusCircle } from 'lucide-react';

export default function SalasTable({ salas, unidade, paginationData, onEdit, onDelete, onPageChange }) {
  return (
    <>
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
        <>
          <Table
            hover
            responsive
            className={`align-middle text-center tabela-consulta ${unidade === 'todas' ? 'com-unidade' : ''}`}
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
                <tr key={sala?.id}>
                  <td>{sala?.numero}</td>
                  {unidade === 'todas' && <td><span className="unidade-texto" >Un. {sala?.unidade}</span></td>}
                  <td>{sala?.tipo_sala?.nome}</td>
                  <td>{sala?.lotacao}</td>
                  <td>{sala?.maquinas_qtd}</td>
                  <td>{sala?.tipo_maquina?.nome}</td>
                  <td>
                    <div className="action-buttons">
                      <EditarButton onClick={() => onEdit(sala?.id)} ></EditarButton>
                      <DeletarButton onClick={() => onDelete(sala?.id)} ></DeletarButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginationControlls className={"d-flex justify-content-center mt-3"} paginationData={paginationData} handlePageChange={onPageChange} />
        </>
      )}
    </>

  );
};

