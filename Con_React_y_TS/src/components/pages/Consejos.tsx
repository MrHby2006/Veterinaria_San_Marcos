import { useEffect, useState } from "react";
import CardConsejo from "../molecules/CardConsejo";
import type { Consejo } from "../molecules/CardConsejo";
import { API } from "../../data/api";

function Consejos() {

    // Consejos que llegan del backend (microservicio contenido)
    const [consejos, setConsejos] = useState<Consejo[]>([]);

    // Consulta los consejos al abrir la página
    useEffect(() => {
        fetch(API + "/api/consejos")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al consultar los consejos");
                }
                return respuesta.json();
            })
            .then((datos) => setConsejos(datos))
            .catch(() => alert("No se pudieron cargar los consejos"));
    }, []);

    return (
        <div className = "container my-4">
            <h1 className = "fs-2 fw-bold text-center" style = {{ color: "#2F3E46" }}>Consejos de cuidados de Mascotas</h1>

            <div className = "row g-3 mt-4">
                {/* Una tarjeta por cada consejo que llegó del backend */}
                {consejos.map((consejo) => (
                    <div className = "col-12 col-md-6 col-lg-4" key = {consejo.id}>
                        <CardConsejo
                            id = {consejo.id}
                            nombre = {consejo.titulo}
                            descripcion = {consejo.descripcion}
                            imagen = {consejo.imagen}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Consejos
