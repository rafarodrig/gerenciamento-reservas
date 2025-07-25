import { Building, LucidePlusCircle } from "lucide-react";
import { Button, Col, Row } from "react-bootstrap";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function GerenciarSalasForm({ handleUnidadeChange, unidadeFiltro, onCadastrar, onGerenciarTipos }) {
    return (
        <Row className="my-3">
            <Col>
                <div className="filtro-unidades">
                    <span className="me-3">Filtrar por unidade:</span>
                    <Button
                        variant={unidadeFiltro === 'todas' ? 'primary' : 'outline-primary'}
                        onClick={() => handleUnidadeChange('todas')}
                        size="sm"
                        className="btn-translate-animation"
                    >
                        Todas as Unidades
                    </Button>
                    <Button
                        variant={unidadeFiltro === '1' ? 'primary' : 'outline-primary'}
                        onClick={() => handleUnidadeChange('1')}
                        size="sm"
                        className="d-flex align-items-center  btn-translate-animation"
                    >
                        <Building className="me-1" />
                        Unidade 1
                    </Button>
                    <Button
                        variant={unidadeFiltro === '2' ? 'primary' : 'outline-primary'}
                        onClick={() => handleUnidadeChange('2')}
                        size="sm"
                        className="d-flex align-items-center btn-translate-animation"
                    >
                        <Building className="me-1" />
                        Unidade 2
                    </Button>
                </div>
                <div>
                    <PrimaryButton onClick={onGerenciarTipos} >Gerenciar Recursos</PrimaryButton>
                </div>
            </Col>
            <Col className="d-flex justify-content-end">
                <Button id="btn-cadastrar-sala" className='d-flex align-items-center btn-translate-animation btn-success' onClick={onCadastrar} variant="success">
                    <LucidePlusCircle className="me-2" />
                    Cadastrar Nova Sala
                </Button>
            </Col>
        </Row>
    )
}