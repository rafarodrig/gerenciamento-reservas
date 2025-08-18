import { Table, Button } from 'react-bootstrap';
import TableAlert from '../Alerts/TableAlert';
import { useQuery } from '@tanstack/react-query';
import LoadingOverlay from '../FeedBack/LoadingOverlay';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '@/services/api';

export default function TableSalasDisponiveisTroca({
  reserva,
  currentPage,
  editarRegistro,
  CustomTrocarSala,
  onReservar,
  setPaginationData,
  setDatas
}) {

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['salasDisponiveisTroca', reserva?.id, CustomTrocarSala || editarRegistro, currentPage],
    queryFn: async () => {
      const res = await api.get('/salas/disponiveis_troca', {
        params: {
          reserva_id: reserva?.id,
          opcao: CustomTrocarSala || editarRegistro,
          page: currentPage || null,
        },

      });

      const salasResponse = res.data?.salas;
      const paginationData = salasResponse
        ? {
          current_page: salasResponse.current_page,
          last_page: salasResponse.last_page,
          per_page: salasResponse.per_page,
          total: salasResponse.total,
          from: salasResponse.from,
          to: salasResponse.to,
          prev_page_url: salasResponse.prev_page_url,
          next_page_url: salasResponse.next_page_url,
        }
        : null;
      setPaginationData(paginationData)
      setDatas(res.data.datas)
      return res.data;
    },

    enabled: !!reserva?.id,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const salas = data?.salas?.data ?? [];

  const handleReservar = (salaId) => {
    const sala = salas.find(s => s.id === salaId);
    if (sala) {
      onReservar(sala);
    }
  };


  return (
    <>
      <LoadingOverlay isVisible={isFetching} />
      {!isFetching && isError && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <TableAlert>Erro ao buscar salas disponíveis.</TableAlert>
        </div>
      )}

      {!isFetching && !isError && !data?.salas?.data?.length && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <TableAlert>Nenhuma sala disponível.</TableAlert>
        </div>
      )}
      {!isError && data?.salas?.data?.length > 0 && (
        <AnimatePresence>
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-100 h-100"
          >
            <Table hover responsive className="text-center align-middle mb-0">
              <thead>
                <tr>
                  <th>Sala</th>
                  <th>Tipo</th>
                  {data.unidade === 'todas' && <th>Unidade</th>}
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
                    <td>{sala.tipo_sala.nome}</td>
                    {data.unidade === 'todas' && <td>Un.{sala.unidade}</td>}
                    <td>{sala.lotacao}</td>
                    <td>{sala.maquinas_qtd}</td>
                    <td>{sala.tipo_maquina.nome}</td>
                    <td className="text-center">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleReservar(sala.id)}
                      >
                        Reservar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </motion.div>
        </AnimatePresence>
      )}
    </>

  );
}
