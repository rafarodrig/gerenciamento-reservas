import { PenSquare } from "lucide-react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";


export default function EditarButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
            <Button
                type={type}
                size="sm"
                className={`btn-acao ${!children ? 'square-button' : 'rectangle-button'} ${className}`}
                variant="primary"
                disabled={disabled}
                {...props}
            >
                <PenSquare size={18} />
                {children}
            </Button>
        </OverlayTrigger>
    );
}