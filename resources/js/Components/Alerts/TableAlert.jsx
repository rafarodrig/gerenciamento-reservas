import { Alert, Container } from "react-bootstrap";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

export default function TableAlert({
    className = "",
    children
}) {
    return (
        <div className="w-100 h-100 d-flex">
            <Alert variant="warning" className={`d-flex justify-content-center align-items-center gap-2 shadow-sm m-0 ${className}`}>
                <ExclamationTriangleFill
                    className="me-2 text-warning flex-shrink-0"
                    size={20}
                />
                <div className="text-truncate">
                    <strong>{children}</strong>
                </div>
            </Alert>
        </div>
    )
}