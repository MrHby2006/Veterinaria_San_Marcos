import { Link } from "react-router-dom";

interface BotonProps {
    id: number;
}

function BotonVerMed({id}: BotonProps) {
    return (
        <Link
            to = {`/medicamento/${id}`}
            className = "btn btn-primary"
        >
            Ver Medicamento
        </Link>
    )
}

export default BotonVerMed