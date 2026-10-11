import { Link } from "react-router-dom";

function BotonReserva() {
    return (
        <Link
            to = {`/servicios`}
            className = "btn btn-secondary"
        >
            Reservar Cita
        </Link>
    )
}

export default BotonReserva