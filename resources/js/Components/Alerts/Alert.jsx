import { useEffect, useRef } from "react";
import { Alert } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";



export default function AlertPop({ alert, setAlert }) {

    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert((prev) => ({ ...prev, show: false })); // Trigger fade-out after 3 seconds
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const alertDivRef = useRef(null);
    return (
        <CSSTransition
            in={!!alert.show}
            timeout={400}
            classNames="fade-alert"
            nodeRef={alertDivRef}
            unmountOnExit
        >
            <div ref={alertDivRef} className="alert-container">
                <Alert
                    variant={alert?.type || "light"}
                    dismissible
                    onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
                >
                    {alert?.message}
                </Alert>
            </div>
        </CSSTransition>
    );
};