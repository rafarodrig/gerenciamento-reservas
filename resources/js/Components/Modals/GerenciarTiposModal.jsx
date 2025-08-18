import { Modal, Button, Form, Row, Col, ListGroup } from "react-bootstrap";
import { useState } from "react";
import { CirclePlus, PenSquare } from "lucide-react";
import DeletarButton from "../Buttons/DeletarButton";
import { api } from "@/services/api";

export default function GerenciarTiposModal({
    show,
    onHide,
    tiposSala = [],
    tiposMaquina = [],
    fetchTiposSala,
    fetchTiposMaquina,
    setAlert,
}) {
    const [novoTipoSala, setNovoTipoSala] = useState("");
    const [novoTipoMaquina, setNovoTipoMaquina] = useState("");

    const [errorsSalaTipo, setErrorsSalaTipo] = useState({});
    const [errorsMaquinaTipo, setErrorsMaquinaTipo] = useState({});

    const adicionarTipoSala = () => {
        api.post("/tipos-sala", { nome: novoTipoSala }).then((res) => {
            setAlert({ show: true, type: "success", message: res.data.message });
            setNovoTipoSala("");
            setErrorsSalaTipo({});
            fetchTiposSala();
        }).catch((err) => {
            setAlert({ show: true, type: "danger", message: "Erro ao adicionar tipo de sala." });
            setErrorsSalaTipo(err.response?.data?.errors || {});
        });

    };

    const adicionarTipoMaquina = () => {
        api.post("/tipos-maquina", { nome: novoTipoMaquina }).then((res) => {
            setAlert({ show: true, type: "success", message: res.data.message });
            setNovoTipoMaquina("");
            setErrorsMaquinaTipo({});
            fetchTiposMaquina();
        }).catch((err) => {
            setAlert({ show: true, type: "danger", message: "Erro ao adicionar tipo de sala." });
            setErrorsMaquinaTipo(err.response?.data?.errors || {});
        });

    };

    const excluirTipoSala = (id) => {
        api.delete(`/tipos-sala/${id}`)
            .then((res) => {
                setAlert({ show: true, type: "success", message: res.data.message });
                fetchTiposSala();
            }).catch((err) => {
                setAlert({ show: true, type: "danger", message: err.data });
            })

    };

    const excluirTipoMaquina = async (id) => {
        api.delete(`/tipos-maquina/${id}`)
            .then((res) => {
                setAlert({ show: true, type: "success", message: res.data.message });
                fetchTiposMaquina();
            }).catch((err) => {
                setAlert({ show: true, type: "danger", message: err.data });
            })
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    <PenSquare className="me-2" /> Gerenciar Recursos
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-1 px-4">
                <Row>
                    {/* Tipos de Sala */}
                    <Col md={6}>
                        <div className="container-style p-4">
                            <h5 className="mb-3">Tipos de Sala</h5>
                            <Form className="d-flex mb-2 w-100">
                                <Form.Group className="w-100">
                                    <Form.Control
                                        type="text"
                                        placeholder="Novo tipo de sala"
                                        value={novoTipoSala}
                                        onChange={(e) => {
                                            setNovoTipoSala(e.target.value);
                                            setErrorsSalaTipo({});
                                        }}
                                        isInvalid={!!errorsSalaTipo?.nome}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsSalaTipo?.nome}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" className="ms-2 " onClick={adicionarTipoSala}>
                                    <CirclePlus />
                                </Button>
                            </Form>
                            <ListGroup className="scrollable-container" style={{ maxHeight: "200px" }}>
                                {tiposSala.map((tipo) => (
                                    <ListGroup.Item key={tipo.id} className="d-flex justify-content-between align-items-center">
                                        {tipo.nome}
                                        <DeletarButton iconSize={18} size="sm" onClick={() => excluirTipoSala(tipo.id)} />
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    </Col>

                    {/* Tipos de Máquina */}
                    <Col md={6}>
                        <div className="container-style p-4">
                            <h5 className="mb-3">Tipos de Máquinas</h5>
                            <Form className="d-flex mb-2 w-100">
                                <Form.Group className="w-100">
                                    <Form.Control
                                        type="text"
                                        placeholder="Novo tipo de máquina"
                                        value={novoTipoMaquina}
                                        onChange={(e) => {
                                            setNovoTipoMaquina(e.target.value);
                                            setErrorsMaquinaTipo({});
                                        }}
                                        isInvalid={!!errorsMaquinaTipo?.nome}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsMaquinaTipo?.nome}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" className="ms-2" onClick={adicionarTipoMaquina}>
                                    <CirclePlus />
                                </Button>
                            </Form>
                            <ListGroup className="scrollable-container" style={{ maxHeight: "200px" }}>
                                {tiposMaquina.map((tipo) => (
                                    <ListGroup.Item key={tipo.id} className="d-flex justify-content-between align-items-center">
                                        {tipo.nome}
                                        <DeletarButton iconSize={18} size="sm" onClick={() => excluirTipoMaquina(tipo.id)} />
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="btn-acao" onClick={onHide}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
