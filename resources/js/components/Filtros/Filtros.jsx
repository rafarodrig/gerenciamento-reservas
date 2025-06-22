import React from 'react';
import CloseButton from './CloseButton';
import { Row, Col, Badge } from 'react-bootstrap';
import { DateTime } from 'luxon';

export default function FiltrosBadge({ objFiltros, onRemoverData }) {
  const {datas, filtros} = objFiltros
  const converterData = (data) => {
    return DateTime
    .fromISO(data, { zone: 'utc' })
    .setLocale('pt-BR')
    .toFormat('dd/MM/yyyy');
  };

  const handlerRemoverData = (data) => {
    const newDatas = datas.filter(d => d !== data)
    objFiltros.datas = newDatas
    onRemoverData(objFiltros)
  }

  return (
    <div >
      <Row className="g-2 ">
        {Object.entries(filtros).map(([key, value]) => (
          <Col key={key}  className="data-badge-div d-flex">
            {/* <Form.Control type="hidden" name={key} value={value} form="form-badge-filtros" /> */}
            <Badge bg="primary" className="filtros">
              {value}
            </Badge>
          </Col>
        ))}

        {datas.map((data, index) => (
          <Col key={index}  className="d-flex data-badge-div ">
            {/* <Form.Control type="hidden" name="datas[]" value={data} form="form-badge-filtros" /> */}
             <Badge bg="primary" className="data-badge d-flex align-items-center">
              <span>{converterData(data)}</span>
              <CloseButton
                onClick={() =>{ handlerRemoverData(data)}}
              />
            </Badge>
          </Col>
        ))}
      </Row>
    </div>
  );
}

