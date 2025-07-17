import { Trash2 } from "lucide-react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";


export default function DeletarButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <OverlayTrigger overlay={<Tooltip>Deletar</Tooltip>}>
            <Button
                type={type}
                size="sm"
                className={`btn-acao  ${!children ? 'square-button' : 'rectangle-button'} ${className}`}
                variant="danger"
                disabled={disabled}
                {...props}
            >
                <Trash2 size={18} />
                {children}
            </Button>
        </OverlayTrigger>
    );
}