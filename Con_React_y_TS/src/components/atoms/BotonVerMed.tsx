import { Link } from "react-router-dom";

// Por ahora lleva al inicio. Cuando exista el detalle, recibirá el id
// y llevará a /medicamentos/${id}
function BotonVerMed() {
    return (
        <Link
            to = {`/`}
            className = "btn btn-primary"
        >
            Ver Medicamento
        </Link>
    )
}

export default BotonVerMed
