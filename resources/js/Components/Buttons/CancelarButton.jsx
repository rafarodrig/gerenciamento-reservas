import { XCircleIcon } from "lucide-react";
import { Button } from "react-bootstrap";

export default function CancelarButton({
    type = "button",
    className = "",
    variant = "secondary",
    disabled,
    children,
    ...props
}) {
    return (
        <Button
            type={type}
            className={`btn-acao ${className}`}
            variant={variant}
            disabled={disabled}
            {...props}
        >
            {children ? children :
                (
                    <>
                        <XCircleIcon size={20} />
                        Cancelar
                    </>
                )}
        </Button>
    );
}
