import { Badge } from "react-bootstrap";

const getColor = (val) => {
    switch (val) {
        case "Manhã":
            return "bg-warning text-dark";   // Amarelo claro (sol da manhã)
        case "Tarde":
            return "bg-info text-dark";      // Azul claro
        case "Noite":
            return "bg-dark text-white";     // Escuro, representa a noite
        case "Graduação":
            return "bg-primary";            // Azul padrão
        case "Avulsa":
            return "bg-secondary";          // Cinza neutro
        case "FIC":
            return "bg-success";            // Verde: formação inicial e continuada
        case "Pós-graduação":
            return "bg-danger";             // Vermelho forte para destaque
        default:
            return "bg-primary";              // Fallback para tipos não reconhecidos
    }
};

export default function BadgeReserva({ children }) {
    return (
        <Badge className={getColor(children)}>
            {children}
        </Badge>
    );
}