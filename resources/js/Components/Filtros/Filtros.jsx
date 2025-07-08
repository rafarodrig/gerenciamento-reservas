import React, { useRef, useMemo } from 'react';
import { Row, Col, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { converterData, diaSemana } from '@/dates';
import { filtrosSalasDisponiveis } from './geradoresDatas';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CloseButton from './CloseButton';
import "./FiltrosBadge.css"

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
    <Row className="g-2">
      {Object.entries(filtros).map(([chave, valor]) => (
        <Col key={chave} xs="auto" className="d-flex">
          <Badge bg="primary" className='d-flex align-items-center justify-content-center shadow-sm' >
            {valor}
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
              <OverlayTrigger overlay={<Tooltip >{diaSemana(data)}</Tooltip>}>
                <Badge bg="primary" className="data-badge shadow-sm">
                  <span className="flex-grow-1">{converterData(data)}</span>
                  <CloseButton
                    onClick={() => handleRemoverData(data)}
                    className="close-badge"
                    ariaLabel={`Remover data ${converterData(data)}`}
                  />
                </Badge>
              </OverlayTrigger>
            </Col>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Row>
  );
}
