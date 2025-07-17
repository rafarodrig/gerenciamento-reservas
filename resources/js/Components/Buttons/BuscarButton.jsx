import { Button } from "react-bootstrap"
export default function BuscarButton({
    type = "button",
    variant = "",
    className = "",
    isActive,
    disabled,
    children,
    ...props
}) {

    const alertaStyle = {
        visibility: isActive ? "visible" : "hidden",
        color: "#dc3545",
        fontSize: ".875em"
    }

    return (
        <>
            <Button
                type={type}
                className={`d-flex btn-translate-animation border-0 align-items-center gap-2 ${className}`}
                disabled={disabled}
                {...props}
            >
                {children ? children : "Buscar"}
            </Button>
            <span id='aviso' style={alertaStyle} >Mudanças detectadas, por favor busque novamente.</span>
        </>
    )
}