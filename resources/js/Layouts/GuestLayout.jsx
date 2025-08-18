import AlertPop from '@/Components/Alerts/Alert';
import { Container } from 'react-bootstrap';

export default function GuestLayout({ children }) {
    return (
        <div className="">

            {/* Conteúdo principal */}
            <Container fluid="xxl" className=" px-3">
                {children}
            </Container>
            <AlertPop />
        </div>
    );
}
