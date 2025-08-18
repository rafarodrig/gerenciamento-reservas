import { Trash2 } from "lucide-react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";


export default function DeletarButton({
    type = "button",
    className = "",
    iconSize = 20,
    disabled,
    children,
    loading,
    ...props
}) {
    return (
        <OverlayTrigger overlay={<Tooltip>Deletar</Tooltip>}>
            <Button
                type={type}
                className={`btn-acao ${!children ? 'square-button' : 'rectangle-button'} ${className}`}
                variant="danger"
                disabled={disabled}
                {...props}
            >
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Deletando...
                    </>
                ) : (
                    <>
                        <Trash2 size={iconSize} />
                        {children}
                    </>
                )}
            </Button>
        </OverlayTrigger>
    );
}