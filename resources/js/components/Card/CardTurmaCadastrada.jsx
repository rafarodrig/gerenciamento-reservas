import { CSSTransition } from 'react-transition-group';
import './TurmaCadastradaAnimation.css';
import { useRef } from 'react';
import { Button, Row, Col, Card} from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
 
export default function CardTurmaCadastrada({turmaCadastrada, setEditarTurma, setDeletarTurma}){
    const cardRef = useRef(null);
    return (

        <CSSTransition
        in={!!turmaCadastrada}
        timeout={300}
        classNames="fade-slide"
        unmountOnExit
        nodeRef={cardRef}
        >
                <div ref={cardRef}>
                <Card className=" shadow border-1 h-100 ">
                    <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                    <span className='me-2'><strong>{turmaCadastrada?.nome || ""}</strong></span>
                    <div className='d-inline-flex gap-2'>
                        <Button variant="outline-light" size="sm" onClick={() => { setEditarTurma(turmaCadastrada.id)}}>
                        <Pencil className="me-1"  /> Editar
                        </Button>
                        <Button variant="outline-light" size="sm" onClick={() => { setDeletarTurma(turmaCadastrada.id)}}>
                        <Trash className="me-1" /> Excluir
                        </Button>
                    </div>
                    </Card.Header>

                    <Card.Body>
                    <div>
                        <Row className="mb-2">
                            <Col md={6}>
                            <p className="mb-1"><strong>Docente:</strong> {turmaCadastrada?.docente || "" }</p>
                            </Col>
                            <Col md={6}>
                            <p className="mb-1"><strong>Turno:</strong> {turmaCadastrada?.turno || ""}</p>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={6}>
                            <p className="mb-1"><strong>Curso:</strong> {turmaCadastrada?.curso || ""}</p>
                            </Col>
                            <Col md={6}>
                            <p className="mb-1"><strong>Lotação:</strong> {turmaCadastrada?.lotacao || ""}</p>
                            </Col>
                        </Row>
                        </div>  
                    </Card.Body>
                </Card>
                </div>
        </CSSTransition>
        )
}