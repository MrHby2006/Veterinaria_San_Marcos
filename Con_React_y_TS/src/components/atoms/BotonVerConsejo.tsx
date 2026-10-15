import { Link } from "react-router-dom";

// Por ahora lleva al inicio. Cuando exista el detalle, recibirá el id
// y llevará a /consejos/${id}
function BotonVerConsejo() {
    return (
        <Link
            to = "/"
            className = "btn btn-primary"
        >
            Más información
        </Link>
    )
}

export default BotonVerConsejo
