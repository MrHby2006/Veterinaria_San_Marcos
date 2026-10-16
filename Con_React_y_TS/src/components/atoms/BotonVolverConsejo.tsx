import { Link } from "react-router-dom";

function BotonVolverConsejo() {
    return (
        <Link
            to = {`/consejos`}
            className = "btn btn-primary"
        >
            Volver a Consejos
        </Link>
    )
}

export default BotonVolverConsejo
