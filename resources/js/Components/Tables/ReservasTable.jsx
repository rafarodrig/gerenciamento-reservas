import { Table, Row, Col } from 'react-bootstrap';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/Components/Badges/BadgeBt';
import EditarButton from '../Buttons/EditarButton';
import DeletarButton from '../Buttons/DeletarButton';
import PaginationControlls from '../Pagination/PaginationControlls';
import LoadingOverlay from '@/Components/FeedBack/LoadingOverlay';
import TableAlert from '@/Components/Alerts/TableAlert';
import { api } from '@/services/api';
import TabDatas from '../TabDatas';
import { useEffect, useMemo, useState } from 'react';
import SmoothPulseLoader from '../FeedBack/SmoothPulseLoader';
import LoadingWrapper from '../FeedBack/LoadingWrapper';
import { useSmoothLoading } from '@/hooks/useSmoothLoading';

export default function ReservasTable({
  formData,
  currentPage = 1,
  onEdit,
  onDelete,
  onPageChange,
  currentTab,
  setCurrentTab
}) {
  // 1️⃣ Busca as datas 
  const { data: tabData, isLoading, isError: errorTabs, isFetching: isFetchingTabs } = useQuery({
    queryKey: ['reservas-tabs', formData],
    queryFn: async () => {
      const res = await api.get('/reservas/tabData', { params: formData });
      console.log(res.data)
      return res.data;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
  });

  const activeTab = useMemo(() => {
    if (!tabData?.datas?.length) return null; // sem dados ainda
    return tabData.datas.includes(currentTab) ? currentTab : tabData.datas[0];
  }, [currentTab, tabData]);

  // 2️⃣ Busca reservas filtradas
  const { data: reservasData, isFetching, isError, isRefetching } = useQuery({
    queryKey: ['reservas', formData, activeTab, currentPage],
    queryFn: async () => {
      const res = await api.get('/reservas', {
        params: {
          ...formData,
          tabData: activeTab,
          page: currentPage,
        },
      });

      const reservasResp = res.data?.reservas;

      console.log(res.data)
      return {
        reservas: reservasResp?.data || [],
        pagination: {
          total: reservasResp?.total,
          from: reservasResp?.from,
          to: reservasResp?.to,
          current_page: reservasResp?.current_page,
          last_page: reservasResp?.last_page,
          per_page: reservasResp?.per_page,
          next_page_url: reservasResp?.next_page_url,
          prev_page_url: reservasResp?.prev_page_url,
        },
      };
    },
    placeholderData: keepPreviousData,
    enabled: !!activeTab, // só busca quando tab estiver definida
    refetchOnWindowFocus: false
  });


  const loadingReservas = useSmoothLoading(isFetching, 300);

  const loadingTabs = useSmoothLoading(isFetchingTabs, 300);


  const reservas = reservasData?.reservas || [];
  const paginationData = reservasData?.pagination;

  const handleEditar = (reservaId) => {
    const reserva = reservas.find(r => r.id === reservaId);
    console.log(reserva)
    if (reserva) onEdit(reserva);
  };

  const handleDeletar = (reservaId) => {
    const reserva = reservas.find(r => r.id === reservaId);
    if (reserva) onDelete(reserva);
  };

  return (
    <>
      <Row className='d-flex flex-column h-100 '>
        {loadingTabs ? (
          <Col className="d-flex justify-content-center align-items-center">
            <SmoothPulseLoader
              className="py-5"
              loading={true}
              size={13}
            />
          </Col>

        ) : isError ? (
          <Col>
            <TableAlert className='w-100 p-5'>
              Erro ao carregar reservas.
            </TableAlert>
          </Col>

        ) : tabData?.datas.length === 0 ? (
          <Col>
            <TableAlert className='w-100 p-5'>
              Nenhuma reserva encontrada. Verifique os filtros aplicados.
            </TableAlert>
          </Col>

        ) : (
          <>
            <AnimatePresence>
              {tabData?.datas.length > 0 && (
                <motion.div
                  key="reservas-table"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: .3 }}
                >
                  <TabDatas
                    datas={tabData?.datas || []}
                    currentTab={activeTab}
                    setCurrentTab={(data) => {
                      setCurrentTab(data);
                      onPageChange(1); // Reseta paginação ao trocar de aba
                    }}
                  />

                </motion.div>
              )}
            </AnimatePresence>

            <Col className='table-container'>
              <AnimatePresence>
                {reservas.length > 0 && (
                  <motion.div
                    key="reservas-table"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .3 }}
                  >
                    <LoadingWrapper loading={loadingReservas || loadingTabs} >
                      {/* Wrapper com opacidade reduzida quando isFetching = true */}
                      {paginationData && (
                        <Row className="mt-4 justify-content-between ">
                          <Col >
                            <small className="text-muted ">
                              Mostrando {paginationData.from} a {paginationData.to} de {paginationData.total} reservas
                            </small>
                          </Col>
                        </Row>
                      )}
                      <Table
                        hover
                        responsive
                        className={`align-middle text-center tabela-consulta ${formData.unidade === 'todas' ? 'com-unidade' : ''}`}
                      >
                        <thead>
                          <tr>
                            <th>Sala</th>
                            {formData.unidade === 'todas' && <th className="d-none d-lg-table-cell">Unidade</th>}
                            <th>Turno</th>
                            <th className="d-none d-md-table-cell">Tipo</th>
                            <th>Turma</th>
                            <th className="d-none d-lg-table-cell">Docente</th>
                            <th className="d-none d-xl-table-cell">Lotação</th>
                            <th>Ação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reservas.map((reserva) => (
                            <tr key={reserva.id}>
                              {/* Sala */}
                              <td
                                className="text-truncate"
                                style={{ maxWidth: '100px' }}
                                title={`${reserva.sala.numero} - ${reserva.sala?.tipo_sala?.nome}`}
                              >
                                {reserva.sala.numero} - {reserva.sala?.tipo_sala?.nome}
                              </td>

                              {/* Unidade (só aparece se todas) */}
                              {formData.unidade === 'todas' && (
                                <td className="d-none d-lg-table-cell">
                                  Un.{reserva.sala.unidade}
                                </td>
                              )}

                              {/* Turno */}
                              <td><Badge>{reserva.turma.turno}</Badge></td>

                              {/* Tipo */}
                              <td className="d-none d-md-table-cell"><Badge>{reserva.turma.tipo}</Badge></td>

                              {/* Turma */}
                              <td
                                className="text-truncate"
                                style={{ maxWidth: '200px' }}
                                title={reserva.turma.nome}
                              >
                                {reserva.turma.nome}
                              </td>

                              {/* Docente */}
                              <td
                                className="text-truncate d-none d-lg-table-cell"
                                style={{ maxWidth: '200px' }}
                                title={reserva.turma.docente}
                              >
                                {reserva.turma.docente}
                              </td>

                              {/* Lotação */}
                              <td className="d-none d-xl-table-cell">
                                {reserva.turma.lotacao}/{reserva.sala.lotacao}
                              </td>

                              {/* Ações */}
                              <td>
                                <div className="action-buttons d-flex justify-content-center">
                                  <EditarButton disabled={loadingReservas} onClick={() => handleEditar(reserva.id)} />
                                  {formData.reserva_status === 'Ativa' && (
                                    <DeletarButton disabled={loadingReservas} onClick={() => handleDeletar(reserva.id)} />
                                  )}
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
                    </LoadingWrapper>
                  </motion.div>
                )}
              </AnimatePresence>
            </Col>
          </>
        )}
      </Row>
    </>
  );
}
