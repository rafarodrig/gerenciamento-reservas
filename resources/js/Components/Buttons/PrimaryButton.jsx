import { Button } from "react-bootstrap";

export default function PrimaryButton({
    type = "button",
    className = "",
    disabled,
    children,
    loading,
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
                    {children}
                </>
            )}
        </Button>
    );
}