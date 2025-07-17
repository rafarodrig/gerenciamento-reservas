import React, { useRef, useMemo } from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { filtrosSalasDisponiveis } from './geradoresDatas';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DataBadge from '../Badges/DataBadge';

export default function FiltrosBadge({ formData, objFiltros, onRemoverData }) {
  const filtrosAtivos = objFiltros || filtrosSalasDisponiveis(formData);
  const { datas = [], filtros = {} } = filtrosAtivos;

  const refsMap = useRef({});

  // Garante que cada data tenha seu próprio ref
  const refs = useMemo(() => {
    datas.forEach((data) => {
      if (!refsMap.current[data]) {
        refsMap.current[data] = React.createRef();
      }
    });
    return refsMap.current;
  }, [datas]);

  const handleRemoverData = (dataRemovida) => {
    const novasDatas = datas.filter((d) => d !== dataRemovida);
    onRemoverData({ ...filtrosAtivos, datas: novasDatas });
  };

  if (Object.keys(filtros).length === 0 && datas.length === 0) return null;

  return (
    <Row className="g-2 filtros-aplicados-badges">
      {Object.entries(filtros).map(([key, val]) => (
        <Col key={key} xs="auto" className="d-flex">
          <Badge className='d-flex align-items-center justify-content-center shadow-sm' >
            {val}
          </Badge>
        </Col>
      ))}

      <TransitionGroup component={null}>
        {datas.map((data) => (
          <CSSTransition
            key={data}
            timeout={300}
            classNames="fade-badge"
            nodeRef={refs[data]}
          >
            <Col ref={refs[data]} xs="auto" className="d-flex data-badge-div align-items-center">
              <DataBadge data={data} handleRemoverData={handleRemoverData} />
            </Col>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Row>
  );
}
