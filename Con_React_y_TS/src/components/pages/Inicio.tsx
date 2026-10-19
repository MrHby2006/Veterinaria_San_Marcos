import BotonReserva from "../atoms/BotonReserva"
import CardBeneficio from "../molecules/CardBeneficio"
import CardServicio from "../molecules/CardServicio"

function Inicio() {
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
                <div className = "col-12 col-md-6 col-lg-4">
                    <CardServicio
                        nombre = "Consulta general"
                        categoria = "Consultas"
                        descripcion = "Revisión completa del estado de salud de tu mascota."
                        precio = {15000}
                        imagen = "/img/Servicios/consulta.jpg"
                    />
                </div>

                <div className = "col-12 col-md-6 col-lg-4">
                    <CardServicio
                        nombre = "Vacuna antirrábica"
                        categoria = "Vacunación"
                        descripcion = "Vacuna obligatoria por ley para la prevención de la rabia."
                        precio = {12000}
                        imagen = "/img/Servicios/vacuna-perro.jpg"
                    />
                </div>

                <div className = "col-12 col-md-6 col-lg-4">
                    <CardServicio
                        nombre = "Esterilización"
                        categoria = "Cirugía"
                        descripcion = "Cirugía programada que incluye anestesia y hospitalización."
                        precio = {80000}
                        imagen = "/img/Servicios/esterilizacion-perro.jpg"
                    />
                </div>
            </div>
        </div>
    )
}

export default Inicio
