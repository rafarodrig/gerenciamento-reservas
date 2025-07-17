
const getColor = (val) => {
    switch (val) {
        case "Manhã":
            return "tw-badge tw-badge--yellow";   // Amarelo claro (sol da manhã)
        case "Tarde":
            return "tw-badge tw-badge--indigo";      // Azul claro
        case "Noite":
            return "tw-badge tw-badge--purple";     // Escuro, representa a noite
        case "Graduação":
            return "tw-badge tw-badge--blue";            // Azul padrão
        case "Avulsa":
            return "tw-badge tw-badge--gray";          // Cinza neutro
        case "FIC":
            return "tw-badge tw-badge--green";            // Verde: formação inicial e continuada
        case "Pós-graduação":
            return "tw-badge tw-badge--red";             // Vermelho forte para destaque
        default:
            return "tw-badge tw-badge--gray";              // Fallback para tipos não reconhecidos
    }
};

export default function BadgeTw({ children }) {
    return (
        <span className={getColor(children)}>
            {children}
        </span>
    );
}