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
                className={`btn-acao ${!children ? 'square-button' : 'rectangle-button'} ${className}`}
                variant="primary"
                disabled={disabled}
                {...props}
            >
                <PenSquare size={20} />
                {children}
            </Button>
        </OverlayTrigger>
    );
}