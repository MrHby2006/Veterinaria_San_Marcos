import { Link } from "react-router-dom";

interface BotonMedProp{
    id: number;
}

function BotonVerMed({id}: BotonMedProp) {
    return (
        <Link
            to = {`/medicamento${id}`}
            className = "btn btn-primary"
        >
            Ver Medicamento
        </Link>
    )
}

export default BotonVerMed