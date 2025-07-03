import { Button } from "react-bootstrap"
export default function BuscarButton({isActive}) {

    const alertaStyle = {
    visibility: isActive ? "visible" : "hidden",
    color: "#dc3545", 
    fontSize: ".875em"
    }

    return(
        <>
        <Button type="submit" variant="primary" id="btn-buscar-sala-disponivel" >
            Buscar
          </Button>
          <span id='aviso'style={alertaStyle} >Mudanças detectadas, por favor busque novamente.</span>
        </>
    )
}