import { Nav, Form, Row, Col } from 'react-bootstrap';
import BuscarButton from '../Buttons/BuscarButton';
import { useState } from 'react';
import SelectInput from '../Inputs/SelectInput';

export default function ConsultarReservaForm({
    className = "",
    formData,
    setFormData,
    onBuscar,
    numeros,
}) {

    const [isActive, setIsActive] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // setIsActive(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onBuscar();
        // setIsActive(false);
    };

    return (
        <>
            <Nav className='h-100'>
                <Form className={`filtros-consulta ${className}`} >
                    {/* FILTRO turma */}
                    <Row className="g-3">
                        <Col sm={6} md={6} xl={12} xxl={6}>
                            <Form.Label >Turma</Form.Label>
                            <Form.Control
                                type="text"
                                name="turma"
                                value={formData.turma || ""}
                                onChange={handleChange}
                            />
                        </Col>
                        {/* Docente */}
                        <Col sm={6} md={6} xl={12} xxl={6}>
                            <Form.Label >Docente</Form.Label>
                            <Form.Control
                                type="text"
                                name="docente"
                                value={formData.docente || ""}
                                onChange={handleChange}
                            />
                        </Col>

                        {/* Data Início */}
                        <Col sm={6} md={3} lg={3} xl={6}>
                            <Form.Label htmlFor="inp-consulta-data-inicio">De</Form.Label>
                            <Form.Control
                                type="date"
                                id="inp-consulta-data-inicio"
                                name="data_inicio"
                                value={formData.data_inicio}
                                onChange={handleChange}
                            />
                        </Col>

                        {/* Data Fim */}
                        <Col sm={6} md={3} lg={3} xl={6}>
                            <Form.Label htmlFor="inp-consulta-data-fim">Até</Form.Label>
                            <Form.Control
                                type="date"
                                id="inp-consulta-data-fim"
                                name="data_fim"
                                value={formData.data_fim}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                A data final não pode ser maior que a data inicial
                            </Form.Control.Feedback>
                        </Col>


                        {/* Turno */}
                        <Col sm={6} md={3} lg={3} xl={6}>
                            <Form.Label htmlFor="inp-consulta-turno">Turno</Form.Label>
                            <SelectInput
                                id="inp-consulta-turno"
                                name="turno"
                                value={formData.turno}
                                onChange={handleChange}
                                options={
                                    [
                                        { value: "", label: "Qualquer" },
                                        { value: "Manhã", label: "Manhã" },
                                        { value: "Tarde", label: "Tarde" },
                                        { value: "Noite", label: "Noite" },
                                    ]
                                }
                            />
                        </Col>


                        {/* Tipo de Reserva */}
                        <Col sm={6} md={3} lg={3} xl={6}>
                            <Form.Label
                                htmlFor="inp-consulta-reserva-tipo"
                                className="text-truncate d-block"
                                title="Tipo de reserva" // tooltip para ver o texto completo
                            >
                                Tipo de reserva
                            </Form.Label>
                            <SelectInput
                                id="inp-consulta-reserva-tipo"
                                name="reserva_tipo"
                                value={formData.reserva_tipo || ""}
                                onChange={handleChange}
                                options={
                                    [
                                        { value: "", label: "Qualquer" },
                                        { value: "Avulsa", label: "Avulsa" },
                                        { value: "Graduação", label: "Graduação" },
                                        { value: "Pos-graduacao", label: "Pós-graduação" },
                                        { value: "FIC", label: "FIC" },
                                    ]
                                }
                            />
                        </Col>
                        {/* Reserva Status */}
                        <Col sm={6} md={3} lg={3} xl={6}>
                            <Form.Label
                                htmlFor="inp-reserva-status"
                                className="text-truncate d-block"
                                title="Reservas status"
                            >
                                Reservas status
                            </Form.Label>
                            <SelectInput
                                id="inp-reserva-status"
                                name="reserva_status"
                                value={formData.reserva_status}
                                onChange={handleChange}
                                options={[
                                    { value: "", label: "Qualquer" },
                                    { value: "Ativa", label: "Ativa" },
                                    { value: "Inativa", label: "Inativa" },
                                ]}
                            />
                        </Col>
                        {/* Unidade */}
                        <Col sm={6} md={3} lg={3} xl={6}>
                            <Form.Label htmlFor="inp-consulta-unidade">
                                Unidade
                            </Form.Label>
                            <SelectInput
                                id="inp-consulta-unidade"
                                name="unidade"
                                value={formData.unidade}
                                onChange={handleChange}
                                options={
                                    [
                                        { value: "todas", label: "Todas" },
                                        { value: "1", label: "Unidade 1" },
                                        { value: "2", label: "Unidade 2" },
                                    ]
                                }
                            />
                        </Col>
                        {/* Sala */}
                        <Col sm={6} md={3} lg={3} xl={6}>
                            <Form.Label htmlFor="inp-consulta-sala">N.º da sala</Form.Label>
                            <SelectInput
                                id="inp-consulta-sala"
                                name="sala"
                                value={formData.sala || ""}
                                onChange={handleChange}
                                options={[
                                    { value: "", label: "Qualquer" },
                                    ...numeros.map(n => ({ value: n, label: n })),
                                ]}
                                isSearchable={true}
                            />
                        </Col>


                        {/* Botão Buscar */}
                        {/* <Col xs={12} className="d-flex align-items-center gap-2">
                            <BuscarButton onClick={handleSubmit} isActive={isActive} />
                        </Col> */}
                    </Row>
                </Form>
            </Nav >
        </>
    );
};
