import { Link } from "react-router-dom";

interface BotonReservarHoraProps {
    servicio: string; // Nombre del servicio que se va a reservar
}

// Lleva al formulario de reserva con el servicio en la URL
function BotonReservarHora({servicio}: BotonReservarHoraProps) {
    return (
        <Link
            to = {`/reservar/${servicio}`}
            className = "btn btn-primary"
        >
            Reservar hora
        </Link>
    )
}

export default BotonReservarHora
