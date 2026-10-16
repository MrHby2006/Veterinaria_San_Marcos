import { Link } from "react-router-dom";

interface BotonProps {
    id: number;
}

function BotonVerConsejo({id}: BotonProps) {
    return (
        <Link
            to = {`/consejo/${id}`}
            className = "btn btn-primary"
        >
            Más información
        </Link>
    )
}

export default BotonVerConsejo
