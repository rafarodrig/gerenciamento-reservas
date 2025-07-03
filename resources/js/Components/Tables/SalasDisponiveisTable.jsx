import { Table, Button, Alert, Pagination, Card } from 'react-bootstrap';
import { DoorOpen } from 'react-bootstrap-icons';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import PaginationControlls from '../PaginationControlls';


export default function SalasDisponiveisTable({ data, onReservar, onPageChange, isDisabledBtnReservar }) {
  if (!data) return null;
  console.log("Tabela Salas");
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
      <Card className=" border-0">
        <Card.Header className="bg-light d-flex align-items-center">
          <DoorOpen className="me-2 text-primary" />
          <strong>Salas disponíveis</strong>
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover responsive className="table table-striped text-center align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Sala</th>
                <th>Tipo</th>
                <th>Lotação</th>
                <th>N.º Máquinas</th>
                <th>Tipo de Máquinas</th>
                <th className="text-center">Ação</th>
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
                  <td className="text-center">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => onReservar(sala.id)}
                      disabled={isDisabledBtnReservar}
                    >
                      Reservar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      <PaginationControlls paginationData={paginationData} handlePageChange={onPageChange}/>
      
    </>
  );
}
