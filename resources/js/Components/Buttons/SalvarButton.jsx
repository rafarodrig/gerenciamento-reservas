import { Save } from "lucide-react";
import { Button } from "react-bootstrap";


export default function SalvarButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <Button
            type={type}
            className={`d-flex btn-translate-animation border-0 align-items-center gap-2 ${className}`}
            variant="primary"
            disabled={disabled}
            {...props}
        >
            <Save size={20} />
            {children ? children : "Salvar"}
        </Button>
    );
}