import { useEffect, useRef } from "react";
import { Alert } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { useAlert } from "@/contexts/AlertContext"; // contexto que criamos

export default function AlertPop() {
    const { alert, clearAlert } = useAlert();
    const alertDivRef = useRef(null);

    useEffect(() => {
        if (alert?.show) {
            const timer = setTimeout(() => {
                clearAlert();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <CSSTransition
            in={!!alert?.show}
            timeout={400}
            classNames="fade-alert"
            nodeRef={alertDivRef}
            unmountOnExit
        >
            <div ref={alertDivRef} className="alert-container">
                <Alert
                    variant={alert?.type || "light"}
                    dismissible
                    onClose={clearAlert}
                >
                    {alert?.message}
                </Alert>
            </div>
        </CSSTransition>
    );
}
