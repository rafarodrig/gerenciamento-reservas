import { converterData } from "@/dates";
import { BookOpen, Calendar, Clock10, LucideCalendarRange } from "lucide-react";
import { Card } from "react-bootstrap";

export default function ReservaCard({
    reserva,
    className = "",
    badge,
    style = {}
}) {
    if (!reserva) return null;
    return (
        <Card className={`container-style flex-grow-1 ${className}`} style={{ ...style }}>
            < Card.Body >
                <Card.Title >
                    <span title={converterData(reserva.data_inicio)} className="text-truncate me-2">{converterData(reserva.data_inicio)}</span>
                    <div>{badge}</div>
                </Card.Title>
                <div className="d-flex justify-content-between">
                    <div className="text-truncate">
                        <p><Clock10 size={18} className="me-2" /> {reserva.turno}</p>
                        <p><BookOpen size={18} className="me-2" /> {reserva.reserva_tipo}</p>
                        <p><LucideCalendarRange size={18} className="me-2" /></p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
