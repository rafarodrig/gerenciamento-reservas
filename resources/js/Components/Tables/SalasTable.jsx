import { Table, Row, Col } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingOverlay from '../FeedBack/LoadingOverlay';
import TableAlert from '../Alerts/TableAlert';
import PaginationControlls from '@/Components/Pagination/PaginationControlls';
import EditarButton from '../Buttons/EditarButton';
import DeletarButton from '../Buttons/DeletarButton';
import { api } from '@/services/api';

export default function SalasTable({ unidade = 'todas', currentPage = 1, onEdit, onDelete, onPageChange }) {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['salas', unidade, currentPage],
    queryFn: async () => {
      const res = await api.get('/salas', {
        params: {
          unidade: unidade !== 'todas' ? unidade : undefined,
          page: currentPage,
        },
      });

      const salasResponse = res.data?.salas;
      return {
        salas: salasResponse?.data || [],
        pagination: {
          total: salasResponse?.total,
          from: salasResponse?.from,
          to: salasResponse?.to,
          current_page: salasResponse?.current_page,
          last_page: salasResponse?.last_page,
          per_page: salasResponse?.per_page,
          next_page_url: salasResponse?.next_page_url,
          prev_page_url: salasResponse?.prev_page_url,
        },
      };
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const salas = data?.salas || [];
  const paginationData = data?.pagination;

  const handleEditar = (salaId) => {
    const sala = salas.find(s => s.id === salaId);
    if (sala) {
      onEdit(sala);
    }
  };


  const handleDeletar = (salaId) => {
    const sala = salas.find(s => s.id === salaId);
    if (sala) {
      onDelete(sala);
    }
  };

  return (
    <>
      <LoadingOverlay isVisible={isFetching || isLoading} />

      {!isFetching && isError && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <TableAlert>Erro ao carregar salas.</TableAlert>
        </div>
      )}

      {!isFetching && !isError && salas.length === 0 && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <TableAlert>
            {unidade === 'todas'
              ? 'Nenhuma sala cadastrada no sistema.'
              : `Nenhuma sala cadastrada da unidade ${unidade}.`}
          </TableAlert>
        </div>
      )}

      {!isError && salas.length > 0 && (
        <>
          {paginationData && (
            <Row className="mb-3">
              <Col>
                <small className="text-muted">
                  Mostrando {paginationData.from} a {paginationData.to} de {paginationData.total} salas
                  {unidade !== 'todas' && ` da unidade ${unidade}`}
                </small>
              </Col>
            </Row>
          )}

          <AnimatePresence>
            <motion.div
              key="salas-table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-100 h-100"
            >
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
                      {unidade === 'todas' && (
                        <td><span className="unidade-texto">Un. {sala?.unidade}</span></td>
                      )}
                      <td>{sala?.tipo_sala?.nome}</td>
                      <td>{sala?.lotacao}</td>
                      <td>{sala?.maquinas_qtd}</td>
                      <td>{sala?.tipo_maquina?.nome}</td>
                      <td>
                        <div className="action-buttons d-flex gap-2 justify-content-center">
                          <EditarButton onClick={() => handleEditar(sala?.id)} />
                          <DeletarButton onClick={() => handleDeletar(sala?.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <PaginationControlls
                className="d-flex justify-content-center mt-3"
                paginationData={paginationData}
                handlePageChange={onPageChange}
              />
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </>
  );
}