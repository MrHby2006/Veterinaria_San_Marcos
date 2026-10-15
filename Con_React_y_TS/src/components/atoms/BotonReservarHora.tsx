import { Link } from "react-router-dom";

// Por ahora lleva al inicio. Cuando esté la sesión, guardará la cita.
function BotonReservarHora() {
    return (
        <Link
            to = "/"
            className = "btn btn-primary"
        >
            Reservar hora
        </Link>
    )
}

export default BotonReservarHora
