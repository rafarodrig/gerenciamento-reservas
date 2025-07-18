import { Building, LaptopMinimal, Users } from "lucide-react";
import { Card, Dropdown } from "react-bootstrap";
import React from "react";
import CustomToggle from "../DropDowns/CustomToggle";

export default function SalaCard({ sala, className = "", badge, isEditing = false, onTrocarSala }) {
    if (!sala) return null;
    return (
        <Card className={`container-style flex-grow-1 ${className}`}>
            <Card.Body className="d-flex justify-content-between">
                <div className="text-truncate">
                    <Card.Title className="d-flex align-items-center justify-content-between mb-2">
                        <span
                            title={sala?.numero + " - " + sala?.tipo_sala.nome}
                            className="text-truncate me-2"
                        >
                            {sala?.numero} - {sala?.tipo_sala.nome}
                        </span>
                    </Card.Title>

                    <p className="d-flex align-items-center mb-2">
                        <Building size={18} className="me-2" /> {sala?.unidade} unidade
                    </p>
                    <p className="d-flex align-items-center mb-2">
                        <Users size={18} className="me-2" /> {sala?.lotacao} pessoas
                    </p>
                    <p className="d-flex align-items-center mb-0">
                        <LaptopMinimal size={18} className="me-2" /> {sala?.maquinas_qtd} máquinas
                    </p>
                </div>

                <div className="d-flex flex-column justify-content-between align-items-end">
                    <div>{badge}</div>

                    {isEditing && (
                        <Dropdown  >
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-icon" />
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => onTrocarSala(sala?.id)} >
                                    Trocar Sala
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
