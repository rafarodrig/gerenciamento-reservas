import { Button } from "react-bootstrap";

export default function PrimaryButton({
    type = "button",
    className = "",
    disabled,
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
            {children}
        </Button>
    );
}