import { Link } from "react-router-dom";

function BotonVolverMed() {
    return (
        <Link
            to = {`/medicamentos`}
            className = "btn btn-primary"
        >
            Volver a Medicamentos
        </Link>
    )
}

export default BotonVolverMed