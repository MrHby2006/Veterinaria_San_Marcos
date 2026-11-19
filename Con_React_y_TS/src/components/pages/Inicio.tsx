import { useEffect, useState } from "react"
import BotonReserva from "../atoms/BotonReserva"
import CardBeneficio from "../molecules/CardBeneficio"
import CardServicio from "../molecules/CardServicio"
import type { Servicio } from "../molecules/CardServicio"
import { API } from "../../data/api"

// Ids de los servicios que se muestran como destacados:
// 1 = Consulta general, 6 = Vacuna antirrábica canina, 12 = Esterilización hembra canina
const idsDestacados = [1, 6, 12];

function Inicio() {

    // Servicios destacados, vienen del backend (asi el precio es siempre el actual)
    const [destacados, setDestacados] = useState<Servicio[]>([]);

    useEffect(() => {
        fetch(API + "/api/servicios")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al consultar los servicios");
                }
                return respuesta.json();
            })
            .then((datos: Servicio[]) => setDestacados(datos.filter((servicio) => idsDestacados.includes(servicio.id))))
            .catch(() => alert("No se pudieron cargar los servicios destacados"));
    }, []);

    return (
        <div className = "container my-4">
            <section className = "row align-items-center g-4 mt-2 p-4 rounded text-white text-start" style = {{ backgroundColor: "#2A9D8F" }}>
                <div className = "col-12 col-md-6">
                    <h2 className = "fw-bold text-white" style = {{ fontSize: "30px" }}>El cuidado que tu mascota merece</h2>
                    <p className = "mb-4">Clínica veterinaria en Rancagua, atendiendo perros, gatos, conejos y aves.</p>

                    <BotonReserva />
                </div>

                <div className = "col-12 col-md-6">
                    <img
                        src = "/img/Inicio/inicio.jpg"
                        alt = "Veterinario con un perro"
                        className = "img-fluid rounded"
                    />
                </div>
            </section>

            <h2 className = "fw-bold mt-5 text-center" style = {{ color: "#2F3E46" }}>¿Por qué preferirnos?</h2>

            <div className = "row g-3 mt-4">
                <div className = "col-12 col-md-6 col-lg-4">
                    <CardBeneficio
                        icono = "❤️"
                        titulo = "Trato Empático"
                        descripcion = "Tratamos a tu mascota como parte de la familia."
                    />
                </div>

                <div className = "col-12 col-md-6 col-lg-4">
                    <CardBeneficio
                        icono = "🩺"
                        titulo = "Profesionales Expertos"
                        descripcion = "Equipo con años de experiencia en distintas especialidades."
                    />
                </div>

                <div className = "col-12 col-md-6 col-lg-4">
                    <CardBeneficio
                        icono = "📅"
                        titulo = "Reserva Fácil"
                        descripcion = "Agenda tu hora desde el sitio, sin llamar por teléfono."
                    />
                </div>
            </div>

            <h2 className = "fw-bold mt-5 text-center" style = {{ color: "#2F3E46" }}>Servicios destacados</h2>

            <div className = "row g-3 mt-4">
                {destacados.map((servicio) => (
                    <div className = "col-12 col-md-6 col-lg-4" key = {servicio.id}>
                        <CardServicio
                            nombre = {servicio.nombre}
                            categoria = {servicio.categoria}
                            descripcion = {servicio.descripcion}
                            precio = {servicio.precio}
                            imagen = {servicio.imagen}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Inicio
