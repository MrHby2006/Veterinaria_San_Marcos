import { useState } from "react";
import CardServicio from "../molecules/CardServicio";
import FiltroCategoria from "../molecules/FiltroCategoria";
import CampoFormulario from "../molecules/CampoFormulario";

function Servicios() {

    // Estados para guardar la categoría elegida y lo que se escribe en el buscador
    const [categoria, setCategoria] = useState("Todas");
    const [busqueda, setBusqueda] = useState("");

    // Decide si una tarjeta se muestra (true) o se esconde (false)
    const mostrar = (categoriaServicio: string, nombre: string) => {

        // Si se eligió una categoría y el servicio no es de esa categoría, se esconde
        if (categoria !== "Todas" && categoriaServicio !== categoria) {
            return false;
        }
        // Si el nombre no contiene lo escrito en el buscador, se esconde
        // (toLowerCase pasa todo a minúsculas para que no importen las mayúsculas)
        if (!nombre.toLowerCase().includes(busqueda.toLowerCase())) {
            return false;
        }
        return true;
    };

    return (
        <div className = "container my-4">
            <h2 className = "fw-bold" style = {{ color: "#2F3E46" }}>Nuestros servicios</h2>
            <p style = {{ color: "#2F3E46" }}>Elige un servicio y reserva tu hora. Debes estar registrado.</p>

            {/* Filtros: en celular uno debajo del otro, en pantallas medianas lado a lado */}
            <div className = "row justify-content-center text-start mt-3">
                <div className = "col-12 col-md-4">
                    <FiltroCategoria
                        valor = {categoria}
                        alCambiar = {setCategoria}
                    />
                </div>

                <div className = "col-12 col-md-4">
                    <CampoFormulario
                        etiqueta = "Buscar por nombre"
                        tipo = "text"
                        nombre = "busqueda"
                        valor = {busqueda}
                        alCambiar = {setBusqueda}
                    />
                </div>
            </div>

            <div className = "d-flex flex-wrap justify-content-center gap-3 mt-4">
                {mostrar("Consultas", "Consulta general") && (
                    <CardServicio
                        nombre = "Consulta general"
                        categoria = "Consultas"
                        descripcion = "Revisión completa del estado de salud de tu mascota."
                        precio = {15000}
                        imagen = "/img/Servicios/consulta.jpg"
                    />
                )}

                {mostrar("Consultas", "Consulta de urgencia") && (
                    <CardServicio
                        nombre = "Consulta de urgencia"
                        categoria = "Consultas"
                        descripcion = "Atención prioritaria fuera del horario habitual."
                        precio = {25000}
                        imagen = "/img/Servicios/urgencia.jpg"
                    />
                )}

                {mostrar("Consultas", "Control post-operatorio") && (
                    <CardServicio
                        nombre = "Control post-operatorio"
                        categoria = "Consultas"
                        descripcion = "Revisión después de una cirugía importante."
                        precio = {10000}
                        imagen = "/img/Servicios/postoperatorio.jpg"
                    />
                )}

                {mostrar("Consultas", "Consulta ave o conejo") && (
                    <CardServicio
                        nombre = "Consulta ave o conejo"
                        categoria = "Consultas"
                        descripcion = "Consulta especializada para aves y conejos."
                        precio = {18000}
                        imagen = "/img/Servicios/ave-conejo.jpg"
                    />
                )}

                {mostrar("Consultas", "Segunda opinión médica") && (
                    <CardServicio
                        nombre = "Segunda opinión médica"
                        categoria = "Consultas"
                        descripcion = "Evaluación adicional, requiere ficha clínica previa."
                        precio = {20000}
                        imagen = "/img/Servicios/segunda-opinion.jpg"
                    />
                )}

                {mostrar("Vacunación", "Vacuna antirrábica canina") && (
                    <CardServicio
                        nombre = "Vacuna antirrábica canina"
                        categoria = "Vacunación"
                        descripcion = "Vacuna obligatoria por ley para la prevención de la rabia."
                        precio = {12000}
                        imagen = "/img/Servicios/vacuna-perro.jpg"
                    />
                )}

                {mostrar("Vacunación", "Vacuna sextuple canina") && (
                    <CardServicio
                        nombre = "Vacuna sextuple canina"
                        categoria = "Vacunación"
                        descripcion = "Refuerzo anual contra 6 enfermedades caninas."
                        precio = {18000}
                        imagen = "/img/Servicios/vacuna-cachorro.jpg"
                    />
                )}

                {mostrar("Vacunación", "Vacuna bivalente felina") && (
                    <CardServicio
                        nombre = "Vacuna bivalente felina"
                        categoria = "Vacunación"
                        descripcion = "Refuerzo anual para gatos."
                        precio = {15000}
                        imagen = "/img/Servicios/vacuna-gato.jpg"
                    />
                )}

                {mostrar("Vacunación", "Vacuna triple felina") && (
                    <CardServicio
                        nombre = "Vacuna triple felina"
                        categoria = "Vacunación"
                        descripcion = "Protege contra tres enfermedades felinas."
                        precio = {17000}
                        imagen = "/img/Servicios/vacuna-gato.jpg"
                    />
                )}

                {mostrar("Vacunación", "Vacuna Bordetella canina") && (
                    <CardServicio
                        nombre = "Vacuna Bordetella canina"
                        categoria = "Vacunación"
                        descripcion = "Previene la tos de las perreras."
                        precio = {14000}
                        imagen = "/img/Servicios/vacuna-perro.jpg"
                    />
                )}

                {mostrar("Vacunación", "Vacuna antirrábica felina") && (
                    <CardServicio
                        nombre = "Vacuna antirrábica felina"
                        categoria = "Vacunación"
                        descripcion = "Vacuna obligatoria contra la rabia en gatos."
                        precio = {12000}
                        imagen = "/img/Servicios/vacuna-gato.jpg"
                    />
                )}

                {mostrar("Cirugía", "Esterilización hembra canina") && (
                    <CardServicio
                        nombre = "Esterilización hembra canina"
                        categoria = "Cirugía"
                        descripcion = "Cirugía programada, incluye anestesia y hospitalización 24h."
                        precio = {80000}
                        imagen = "/img/Servicios/esterilizacion-perro.jpg"
                    />
                )}

                {mostrar("Cirugía", "Esterilización macho canino") && (
                    <CardServicio
                        nombre = "Esterilización macho canino"
                        categoria = "Cirugía"
                        descripcion = "Cirugía programada, incluye anestesia."
                        precio = {60000}
                        imagen = "/img/Servicios/esterilizacion-perro.jpg"
                    />
                )}

                {mostrar("Cirugía", "Esterilización hembra felina") && (
                    <CardServicio
                        nombre = "Esterilización hembra felina"
                        categoria = "Cirugía"
                        descripcion = "Incluye anestesia y hospitalización 12h."
                        precio = {65000}
                        imagen = "/img/Servicios/esterilizacion-gato.jpg"
                    />
                )}

                {mostrar("Cirugía", "Esterilización macho felino") && (
                    <CardServicio
                        nombre = "Esterilización macho felino"
                        categoria = "Cirugía"
                        descripcion = "Cirugía programada, incluye anestesia."
                        precio = {50000}
                        imagen = "/img/Servicios/esterilizacion-gato.jpg"
                    />
                )}

                {mostrar("Cirugía", "Extirpación de tumor cutáneo") && (
                    <CardServicio
                        nombre = "Extirpación de tumor cutáneo"
                        categoria = "Cirugía"
                        descripcion = "Precio referencial, varía según el tamaño."
                        precio = {120000}
                        imagen = "/img/Servicios/cirugia.jpg"
                    />
                )}

                {mostrar("Cirugía", "Cesárea de urgencia") && (
                    <CardServicio
                        nombre = "Cesárea de urgencia"
                        categoria = "Cirugía"
                        descripcion = "Cirugía de urgencia para partos complicados."
                        precio = {180000}
                        imagen = "/img/Servicios/cesarea.jpg"
                    />
                )}

                {mostrar("Desparasitación", "Desparasitación interna (menos de 10kg)") && (
                    <CardServicio
                        nombre = "Desparasitación interna (menos de 10kg)"
                        categoria = "Desparasitación"
                        descripcion = "Tratamiento contra parásitos internos."
                        precio = {8000}
                        imagen = "/img/Servicios/desparasitacion-perro.jpg"
                    />
                )}

                {mostrar("Desparasitación", "Desparasitación interna (10 a 25kg)") && (
                    <CardServicio
                        nombre = "Desparasitación interna (10 a 25kg)"
                        categoria = "Desparasitación"
                        descripcion = "Tratamiento contra parásitos internos."
                        precio = {9500}
                        imagen = "/img/Servicios/desparasitacion-perro.jpg"
                    />
                )}

                {mostrar("Desparasitación", "Desparasitación interna (más de 25kg)") && (
                    <CardServicio
                        nombre = "Desparasitación interna (más de 25kg)"
                        categoria = "Desparasitación"
                        descripcion = "Tratamiento contra parásitos internos."
                        precio = {11000}
                        imagen = "/img/Servicios/desparasitacion-perro.jpg"
                    />
                )}

                {mostrar("Desparasitación", "Desparasitación interna felina") && (
                    <CardServicio
                        nombre = "Desparasitación interna felina"
                        categoria = "Desparasitación"
                        descripcion = "Tratamiento contra parásitos internos para gatos."
                        precio = {8000}
                        imagen = "/img/Servicios/desparasitacion-gato.jpg"
                    />
                )}

                {mostrar("Desparasitación", "Antiparasitario externo (pipeta)") && (
                    <CardServicio
                        nombre = "Antiparasitario externo (pipeta)"
                        categoria = "Desparasitación"
                        descripcion = "Incluye la aplicación de la pipeta."
                        precio = {7500}
                        imagen = "/img/Servicios/pipeta.jpg"
                    />
                )}

                {mostrar("Exámenes", "Hemograma completo") && (
                    <CardServicio
                        nombre = "Hemograma completo"
                        categoria = "Exámenes"
                        descripcion = "Examen de sangre para revisar el estado general del paciente."
                        precio = {22000}
                        imagen = "/img/Servicios/laboratorio.jpg"
                    />
                )}

                {mostrar("Exámenes", "Perfil bioquímico completo") && (
                    <CardServicio
                        nombre = "Perfil bioquímico completo"
                        categoria = "Exámenes"
                        descripcion = "Resultado en 24 a 48 horas."
                        precio = {35000}
                        imagen = "/img/Servicios/laboratorio.jpg"
                    />
                )}

                {mostrar("Exámenes", "Radiografía (1 proyección)") && (
                    <CardServicio
                        nombre = "Radiografía (1 proyección)"
                        categoria = "Exámenes"
                        descripcion = "Diagnóstico por imagen."
                        precio = {28000}
                        imagen = "/img/Servicios/radiografia.jpg"
                    />
                )}

                {mostrar("Exámenes", "Ecografía abdominal") && (
                    <CardServicio
                        nombre = "Ecografía abdominal"
                        categoria = "Exámenes"
                        descripcion = "Diagnóstico por imagen no invasivo."
                        precio = {45000}
                        imagen = "/img/Servicios/ecografia.jpg"
                    />
                )}

                {mostrar("Exámenes", "Test de leishmaniasis") && (
                    <CardServicio
                        nombre = "Test de leishmaniasis"
                        categoria = "Exámenes"
                        descripcion = "Examen de detección para perros."
                        precio = {18000}
                        imagen = "/img/Servicios/laboratorio.jpg"
                    />
                )}

                {mostrar("Otros", "Corte de uñas") && (
                    <CardServicio
                        nombre = "Corte de uñas"
                        categoria = "Otros"
                        descripcion = "Servicio rápido de higiene y cuidado de uñas."
                        precio = {5000}
                        imagen = "/img/Servicios/unas.jpg"
                    />
                )}

                {mostrar("Otros", "Limpieza dental") && (
                    <CardServicio
                        nombre = "Limpieza dental"
                        categoria = "Otros"
                        descripcion = "Requiere anestesia."
                        precio = {55000}
                        imagen = "/img/Servicios/dental.jpg"
                    />
                )}

                {mostrar("Otros", "Microchip de identificación") && (
                    <CardServicio
                        nombre = "Microchip de identificación"
                        categoria = "Otros"
                        descripcion = "Incluye registro en el sistema nacional."
                        precio = {15000}
                        imagen = "/img/Servicios/microchip.jpg"
                    />
                )}

                {mostrar("Otros", "Hospitalización (por día)") && (
                    <CardServicio
                        nombre = "Hospitalización (por día)"
                        categoria = "Otros"
                        descripcion = "Incluye monitoreo y alimentación básica."
                        precio = {30000}
                        imagen = "/img/Servicios/hospitalizacion.jpg"
                    />
                )}
            </div>
        </div>
    )
}

export default Servicios
