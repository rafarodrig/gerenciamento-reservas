import { Table, Alert, Card } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import PaginationControlls from '@/Components/Pagination/PaginationControlls';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import { DoorOpenIcon } from 'lucide-react';


export default function SalasDisponiveisTable({ data, onReservar, onPageChange, isDisabledBtnReservar }) {

  if (!data) return null;

  const salas = data?.salas.data;
  const salasResponse = data?.salas;
  let paginationData = null;

  if (salasResponse.data && Array.isArray(salasResponse.data)) {
    // Resposta paginada do Laravel
    paginationData = {
      current_page: salasResponse.current_page,
      last_page: salasResponse.last_page,
      per_page: salasResponse.per_page,
      total: salasResponse.total,
      from: salasResponse.from,
      to: salasResponse.to,
      prev_page_url: salasResponse.prev_page_url,
      next_page_url: salasResponse.next_page_url
    };
  }

  if (!salas || salas.length === 0) {
    return (
      <Alert variant="warning" className="d-flex align-items-center gap-2 shadow-sm border-1 my-3">
        <ExclamationTriangleFill className="me-2 text-warning" size={20} />
        <div><strong>Nenhuma sala disponível.</strong> Verifique os filtros aplicados.</div>
      </Alert>
    );
  }

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <DoorOpenIcon className="me-2 text-primary" />
        <strong>Salas disponíveis</strong>
      </div>
      <Table hover responsive className=" text-center align-middle ">
        <thead className="table-light">
          <tr>
            <th>Sala</th>
            <th>Tipo</th>
            {data.unidade === "todas" && <th>Unidade</th>}
            <th>Lotação</th>
            <th>N.º Máquinas</th>
            <th>Tipo de Máquinas</th>
            <th >Ação</th>
          </tr>
        </thead>
        <tbody>
          {salas.map((sala) => (
            <tr key={sala.id}>
              <td>{sala.numero}</td>
              <td>{sala.tipo_sala.nome}</td>
              {data.unidade === "todas" &&
                <td>
                  Un.{sala.unidade}
                </td>
              }
              <td>{sala.lotacao}</td>
              <td>{sala.maquinas_qtd}</td>
              <td>{sala.tipo_maquina.nome}</td>
              <td>
                <div className='action-buttons'>
                  <PrimaryButton
                    className='btn-acao'
                    size="sm"
                    onClick={() => onReservar(sala.id)}
                    disabled={isDisabledBtnReservar}
                  >
                    Reservar
                  </PrimaryButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationControlls className={"d-flex justify-content-center mt-3"} paginationData={paginationData} handlePageChange={onPageChange} />

    </>
  );
}
