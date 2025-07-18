import React from "react";
import { CircleEllipsis, Ellipsis, MoreVertical } from "lucide-react"; // ou de onde você importa o ícone

// Defina este componente no seu arquivo ou em um arquivo separado
const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <div
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        style={{ cursor: "pointer" }}
    >
        <Ellipsis size={30} />
    </div>
));

export default CustomToggle;