import { BookOpen, User, Users } from "lucide-react";
import { Card, Dropdown } from "react-bootstrap";
import CustomToggle from "../DropDowns/CustomToggle";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

export default function TurmaCard({ turma, badge, setDeletarTurma, setEditarTurma }) {
    const cardRef = useRef(null);
    return (
        <CSSTransition
            in={!!turma}
            timeout={300}
            classNames="fade-slide"
            unmountOnExit
            nodeRef={cardRef}
        >
            <div ref={cardRef}>
                <Card className="container-style flex-grow-1">
                    <Card.Body className="d-flex justify-content-between">
                        <div className="text-truncate">
                            <Card.Title className="d-flex align-items-center justify-content-between mb-3">
                                <span title={turma?.nome} className="text-truncate me-2 " >{turma?.nome}</span>
                            </Card.Title>
                            <p className="d-flex align-items-center mb-2 text-truncate" >
                                <User size={18} className="me-2" /> {turma?.docente}
                            </p>
                            <p className="d-flex align-items-center mb-2">
                                <BookOpen size={18} className="me-2" /> {turma?.tipo}
                            </p>
                            <p className="d-flex align-items-center mb-0">
                                <Users size={18} className="me-2" /> {turma?.lotacao} alunos
                            </p>
                        </div>

                        <div className="d-flex flex-column justify-content-between align-items-end">
                            <div>{badge}</div>
                            <Dropdown >
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-icon" />
                                <Dropdown.Menu>
                                    {setEditarTurma && (
                                        <Dropdown.Item onClick={() => setEditarTurma(turma)}>
                                            Editar Turma
                                        </Dropdown.Item>
                                    )}
                                    {setDeletarTurma && (
                                        <Dropdown.Item onClick={() => setDeletarTurma(turma?.id)}>
                                            Deletar Turma
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>

                        </div>
                    </Card.Body>
                </Card>
            </div>
        </CSSTransition>

    )
}