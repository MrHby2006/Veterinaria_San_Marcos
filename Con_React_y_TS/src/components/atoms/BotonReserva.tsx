import { Link } from "react-router-dom";

function BotonReserva() {
    return (
        <Link
            to = {`/servicios`}
            className = "btn btn-light fw-bold fs-5"
            style = {{ color: "#2A9D8F" }}
        >
            Reservar Cita
        </Link>
    )
}

export default BotonReserva
