import { CheckCircleIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "react-bootstrap";


export default function SalvarButton({
    type = "button",
    className = "",
    disabled,
    loading,
    isEditing,
    children,
    ...props
}) {
    return (
        <Button
            type={type}
            className={`btn-acao ${className}`}
            variant="primary"
            disabled={disabled}
            {...props}
        >
            {loading ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Salvando...
                </>
            ) : (
                <>
                    {isEditing ? <CheckCircleIcon size={20} /> : <PlusCircleIcon size={20} />}
                    {isEditing ? 'Atualizar' : 'Cadastrar'}
                </>
            )}
        </Button>
    );
}