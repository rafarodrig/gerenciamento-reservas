import { Building, LaptopMinimal, Users } from "lucide-react";
import { Card, Dropdown } from "react-bootstrap";
import React from "react";
import CustomToggle from "../DropDowns/CustomToggle";

export default function SalaCard({
    sala,
    className = "",
    badge,
    isEditing = false,
    onTrocarSala,
    style = {}
}) {
    if (!sala) return null;
    return (
        <Card className={`container-style flex-grow-1 ${className}`} style={{ ...style }}>
            < Card.Body >
                <Card.Title >
                    <span title={sala?.numero + " - " + sala?.tipo_sala.nome} className="text-truncate me-2">{sala?.numero} - {sala?.tipo_sala.nome}</span>
                    <div>{badge}</div>
                </Card.Title>
                <div className=" d-flex justify-content-between ">
                    <div className="text-truncate">
                        <p><Building size={18} className="me-2" /> {sala?.unidade} unidade</p>
                        <p ><Users size={18} className="me-2" /> {sala?.lotacao} pessoas</p>
                        <p ><LaptopMinimal size={18} className="me-2" /> {sala?.maquinas_qtd} máquinas</p>
                    </div>

                    {isEditing && (
                        <Dropdown className="align-self-end" >
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
