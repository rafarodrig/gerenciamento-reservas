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
            className={`d-flex border-0 align-items-center gap-2 ${className}`}
            variant="primary"
            disabled={disabled}
            {...props}
        >
            {children}
        </Button>
    );
}