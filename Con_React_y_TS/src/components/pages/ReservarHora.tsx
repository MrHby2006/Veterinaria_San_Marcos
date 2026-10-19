import { useParams } from "react-router-dom";
import FormularioReserva from "../organism/FormularioReserva";

function ReservarHora() {
    // Lee el servicio que viene en la URL (ej: /reservar/Consulta general)
    const { servicio } = useParams();

    return (
        <div className = "container my-4">
            <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>Reservar Hora</h2>

            <h4 className = "mt-3 mb-4 text-center" style = {{ color: "#2F3E46" }}>Completa los datos de tu mascota y elige el día y la hora.</h4>

            <div className = "row justify-content-center">
                <div className = "col-12 col-md-8 col-lg-6">
                    <div className = "card shadow-sm p-4 text-start">
                        <FormularioReserva servicio = {String(servicio)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservarHora
