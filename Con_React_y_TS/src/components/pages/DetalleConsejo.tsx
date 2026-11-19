import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BotonVolverConsejo from "../atoms/BotonVolverConsejo";
import BotonReserva from "../atoms/BotonReserva";
import type { Consejo } from "../molecules/CardConsejo";
import type { Especie } from "../molecules/SelectEspecie";
import { API } from "../../data/api";

function DetalleConsejo() {
    const { id } = useParams()

    // Consejo que llega del backend (null = todavía no llega o no existe)
    const [consejo, setConsejo] = useState<Consejo | null>(null);

    // true mientras se espera la respuesta del backend
    const [cargando, setCargando] = useState(true);

    // Especies de catalogo, para mostrar sus nombres en vez de los ids
    const [especies, setEspecies] = useState<Especie[]>([]);

    // Pide al backend el consejo de la URL (ej: /consejo/2)
    useEffect(() => {
        fetch(API + "/api/consejos/" + id)
            .then((respuesta) => {
                // 404 = no existe ese id: se muestra "Consejo no encontrado"
                if (respuesta.status === 404) {
                    return null;
                }
                if (!respuesta.ok) {
                    throw new Error("Error al consultar el consejo");
                }
                return respuesta.json();
            })
            .then((datos) => setConsejo(datos))
            .catch(() => alert("No se pudo cargar el consejo"))
            .finally(() => setCargando(false));
    }, [id]);

    // El consejo solo trae los ids de las especies; los nombres estan en catalogo
    useEffect(() => {
        fetch(API + "/api/especies")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al consultar las especies");
                }
                return respuesta.json();
            })
            .then((datos) => setEspecies(datos))
            .catch(() => alert("No se pudieron cargar las especies"));
    }, []);

    if (cargando) {
        return (
            <div className = "container my-4">
                <p className = "text-center fs-5">Cargando...</p>
            </div>
        )
    }

    // Si el id no existe (ej: /consejo/99), mostramos un mensaje
    if (!consejo) {
        return (
            <div className = "container my-4">
                <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>Consejo no encontrado</h2>

                <div className = "mt-4 text-center">
                    <BotonVolverConsejo />
                </div>
            </div>
        )
    }

    // Nombres de las especies del consejo, ej: "Perro / Gato"
    const textoEspecies = especies
        .filter((especie) => consejo.idEspecies.includes(especie.id))
        .map((especie) => especie.nombre)
        .join(" / ");

    return (
        <div className = "container my-4">
            <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>Detalle del Consejo</h2>

            <section className = "row align-items-center g-4 mt-2 p-4 rounded text-white text-start" style = {{ backgroundColor: "#2A9D8F" }}>
                <div className = "col-12 col-md-5">
                    <img
                        src = {consejo.imagen}
                        alt = {consejo.titulo}
                        className = "img-fluid rounded w-100"
                        style = {{ height: '300px', objectFit: 'cover' }}
                    />
                </div>

                <div className = "col-12 col-md-7">
                    <h3 className = "fw-bold">{consejo.titulo}</h3>

                    <div className = "d-flex flex-wrap gap-2 my-3">
                        <span className = "badge bg-light text-dark fs-6">Categoría: {consejo.categoria}</span>
                        <span className = "badge bg-light text-dark fs-6">Especie: {textoEspecies}</span>
                    </div>

                    <p className = "fs-5">{consejo.descripcion}</p>

                    <div className = "d-flex flex-wrap gap-3 mt-3">
                        <BotonVolverConsejo />
                        <BotonReserva />
                    </div>
                </div>
            </section>

            <div className = "row g-4 mt-2">
                <div className = "col-12 col-md-7">
                    <div className = "card shadow-sm p-4 h-100">
                        <h4 className = "fw-bold" style = {{ color: "#2F3E46" }}>Recomendaciones</h4>

                        {/* Llegan ordenadas desde el backend (columna orden) */}
                        <ul className = "fs-5 mb-0">
                            {consejo.recomendaciones.map((recomendacion) => (
                                <li className = "mb-2" key = {recomendacion.id}>{recomendacion.texto}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className = "col-12 col-md-5">
                    <div className = "alert alert-warning h-100 mb-0 p-4">
                        <h4 className = "fw-bold">¿Cuándo ir al veterinario?</h4>

                        <p className = "fs-5 mb-0">{consejo.alerta}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetalleConsejo
