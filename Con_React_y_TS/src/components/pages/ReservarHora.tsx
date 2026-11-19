import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormularioReserva from "../organism/FormularioReserva";
import { API } from "../../data/api";

// Datos de cada servicio que manda el microservicio catalogo
interface Servicio {
    id: number;
    nombre: string;
}

function ReservarHora() {
    // Lee el servicio que viene en la URL (ej: /reservar/Consulta general)
    const { servicio } = useParams();

    // Id del servicio en la base de datos (0 = todavía no se encuentra)
    const [idServicio, setIdServicio] = useState(0);

    // Busca en el backend el servicio que tiene ese nombre, para saber su id
    useEffect(() => {
        fetch(API + "/api/servicios")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al consultar los servicios");
                }
                return respuesta.json();
            })
            .then((datos: Servicio[]) => {
                for (let i = 0; i < datos.length; i++) {
                    if (datos[i].nombre === servicio) {
                        setIdServicio(datos[i].id);
                    }
                }
            })
            .catch(() => alert("No se pudieron cargar los servicios"));
    }, [servicio]);

    return (
        <div className = "container my-4">
            <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>Reservar Hora</h2>

            <h4 className = "mt-3 mb-4 text-center" style = {{ color: "#2F3E46" }}>Completa los datos de tu mascota y elige el día y la hora.</h4>

            <div className = "row justify-content-center">
                <div className = "col-12 col-md-8 col-lg-6">
                    <div className = "card shadow-sm p-4 text-start">
                        <FormularioReserva servicio = {String(servicio)} idServicio = {idServicio} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservarHora
