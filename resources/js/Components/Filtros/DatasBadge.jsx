import { useState } from "react";
import { converterData } from "@/dates";
import { Badge, Col, Row } from "react-bootstrap";

export default function DatasBadge({ dataAtual, datas, onChange }) {
    const [selecionadas, setSelecionadas] = useState([]);

    if (!datas) return null;


    const toggleData = (data) => {
        const jaSelecionada = selecionadas.includes(data);
        const novaLista = jaSelecionada
            ? selecionadas.filter(d => d !== data)
            : [...selecionadas, data];

        setSelecionadas(novaLista);
        if (onChange) onChange(novaLista); // para o componente pai, se necessário
    };

    const getColor = (data) => {
        // if (data === dataAtual) return "primary";
        if (selecionadas.includes(data)) return "primary";
        return "secondary";
    };

    return (
        <Row className="g-2">
            {datas.map((data) => (
                <Col key={data} xs="auto" className="d-flex">
                    <Badge
                        bg={getColor(data)}
                        className="d-flex align-items-center justify-content-center shadow-sm px-3 py-2"
                        role="button"
                        onClick={() => toggleData(data)}
                        style={{ cursor: "pointer", userSelect: "none" }}
                    >
                        {converterData(data)}
                    </Badge>
                </Col>
            ))}
        </Row>
    );
}
