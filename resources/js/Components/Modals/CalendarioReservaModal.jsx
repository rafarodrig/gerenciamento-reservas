import { Modal, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
// Importamos o estilo já processado em SCSS
// import '@/styles/react-calendar.scss';

export default function CalendarioReservaModal({ show, onHide, datasReserva }) {
    // Converter para objetos Date para comparação
    const datasMarcadas = datasReserva.map(data => new Date(data));

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dataStr = date.toISOString().split('T')[0];
            return datasReserva.includes(dataStr)
                ? 'react-calendar__tile--reserved'
                : null;
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Datas da Reserva</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <Calendar
                    className="m-auto"
                    tileClassName={tileClassName}
                    value={null}
                    locale="pt-BR"
                    maxDetail="month"
                    minDate={new Date()}

                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
