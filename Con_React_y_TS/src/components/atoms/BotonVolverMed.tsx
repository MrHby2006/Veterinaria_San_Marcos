import { Link } from "react-router-dom";

function BotonVolverMed() {
    return (
        <Link
            to = {`/medicamentos`}
            className = "btn btn-primary"
        >
            Ver Medicamento
        </Link>
    )
}

export default BotonVolverMed