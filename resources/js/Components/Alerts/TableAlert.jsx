import { Alert, Container } from "react-bootstrap";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

export default function TableAlert({ children }) {
    return (
        <Container className='container-style overflow-auto p-3'  >
            <Alert variant="warning" className="d-flex align-items-center gap-2 shadow-sm m-0 ">
                <ExclamationTriangleFill className="me-2 text-warning" size={20} />
                <div><strong>{children}</strong></div>
            </Alert>
        </Container>
    )
}