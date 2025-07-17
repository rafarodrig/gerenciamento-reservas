import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import CloseButton from "@/Components/Buttons/CloseButton";
import { converterData, diaSemana } from "@/dates";

export default function DataBadge({ data, handleRemoverData }) {
    return (
        <OverlayTrigger overlay={<Tooltip >{diaSemana(data)}</Tooltip>}>
            <Badge bg="primary" className="data-badge">
                <span className="flex-grow-1">{converterData(data)}</span>
                <CloseButton
                    onClick={() => handleRemoverData(data)}
                    ariaLabel={`Remover data ${converterData(data)}`}
                />
            </Badge>
        </OverlayTrigger>
    )
}