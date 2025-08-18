import { BookOpen, User, Users } from "lucide-react";
import { Card, Dropdown, Spinner } from "react-bootstrap";
import CustomToggle from "../DropDowns/CustomToggle";
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import LoadingOverlay from "../FeedBack/LoadingOverlay";

export default function TurmaCard({
    turma,
    badge,
    setDeletarTurma,
    setEditarTurma,
    className = "",
    style = {}
}) {
    const cardRef = useRef(null);

    const [lastValidTurma, setLastValidTurma] = useState(null);

    const isId = !!turma && typeof turma !== "object";

    const { data: turmaData, isFetching, isLoading, refetch } = useQuery({
        queryKey: ['turma', turma],
        queryFn: async () => {
            const { data } = await api.get(`/turmas/${turma}`);
            return data;
        },
        enabled: isId, //booleano
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (!isId && turma) {
            setLastValidTurma(turma);
        }
        if (isId && turmaData) {
            setLastValidTurma(turmaData);
        }
    }, [turma, turmaData, isId]);


    return (
        <CSSTransition
            in={!!turma}
            timeout={300}
            classNames="fade-slide"
            unmountOnExit
            nodeRef={cardRef}
        >
            <div ref={cardRef}>
                <Card className={`container-style flex-grow-1  ${className}`} style={{ ...style }}>
                    <Card.Body style={{ minHeight: '176px', position: 'relative' }}>
                        <LoadingOverlay isVisible={isFetching} />
                        {isLoading ? (
                            <LoadingOverlay isVisible={true} />
                        ) : (
                            <>
                                <Card.Title >
                                    <span title={lastValidTurma?.nome} className="text-truncate">{lastValidTurma?.nome}</span>
                                    <div >{badge}</div>
                                </Card.Title>
                                <div className="d-flex justify-content-between">
                                    <div className="text-truncate">
                                        <p><User size={18} className="me-2" /> {lastValidTurma?.docente}</p>
                                        <p ><BookOpen size={18} className="me-2" /> {lastValidTurma?.tipo}</p>
                                        <p><Users size={18} className="me-2" /> {lastValidTurma?.lotacao} alunos</p>
                                    </div>

                                    <Dropdown className="align-self-end">
                                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-icon" />
                                        <Dropdown.Menu>
                                            {setEditarTurma && (
                                                <Dropdown.Item onClick={() => setEditarTurma(lastValidTurma)}>
                                                    Editar Turma
                                                </Dropdown.Item>
                                            )}
                                            {setDeletarTurma && (
                                                <Dropdown.Item onClick={() => setDeletarTurma(lastValidTurma)}>
                                                    Deletar Turma
                                                </Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                </div>

                            </>
                        )}
                    </Card.Body>
                </Card>
            </div>
        </CSSTransition >
    );
}
