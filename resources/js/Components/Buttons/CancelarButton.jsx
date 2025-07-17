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
            className={`d-flex border-0 btn-translate-animation align-items-center gap-2 ${className}`}
            variant={variant}
            disabled={disabled}
            {...props}
        >
            <XCircleIcon size={20} />
            {children ? children : "Cancelar"}
        </Button>
    );
}
