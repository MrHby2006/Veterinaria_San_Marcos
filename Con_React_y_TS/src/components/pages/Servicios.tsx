import CardServicio from "../molecules/CardServicio";

function Servicios() {
    return (
        <div className = "container my-4">
            <h2 className = "fw-bold" style = {{ color: "#2F3E46" }}>Nuestros servicios</h2>
            <p style = {{ color: "#2F3E46" }}>Elige un servicio y reserva tu hora. Debes estar registrado.</p>

            <div className = "d-flex flex-wrap justify-content-center gap-3 mt-4">
                <CardServicio
                    nombre = "Consulta general"
                    categoria = "Consultas"
                    descripcion = "Revisión completa del estado de salud de tu mascota."
                    precio = {15000}
                    imagen = "/img/Servicios/consulta.jpg"
                />

                <CardServicio
                    nombre = "Consulta de urgencia"
                    categoria = "Consultas"
                    descripcion = "Atención prioritaria fuera del horario habitual."
                    precio = {25000}
                    imagen = "/img/Servicios/urgencia.jpg"
                />

                <CardServicio
                    nombre = "Control post-operatorio"
                    categoria = "Consultas"
                    descripcion = "Revisión después de una cirugía importante."
                    precio = {10000}
                    imagen = "/img/Servicios/postoperatorio.jpg"
                />

                <CardServicio
                    nombre = "Consulta ave o conejo"
                    categoria = "Consultas"
                    descripcion = "Consulta especializada para aves y conejos."
                    precio = {18000}
                    imagen = "/img/Servicios/ave-conejo.jpg"
                />

                <CardServicio
                    nombre = "Segunda opinión médica"
                    categoria = "Consultas"
                    descripcion = "Evaluación adicional, requiere ficha clínica previa."
                    precio = {20000}
                    imagen = "/img/Servicios/segunda-opinion.jpg"
                />

                <CardServicio
                    nombre = "Vacuna antirrábica canina"
                    categoria = "Vacunación"
                    descripcion = "Vacuna obligatoria por ley para la prevención de la rabia."
                    precio = {12000}
                    imagen = "/img/Servicios/vacuna-perro.jpg"
                />

                <CardServicio
                    nombre = "Vacuna sextuple canina"
                    categoria = "Vacunación"
                    descripcion = "Refuerzo anual contra 6 enfermedades caninas."
                    precio = {18000}
                    imagen = "/img/Servicios/vacuna-cachorro.jpg"
                />

                <CardServicio
                    nombre = "Vacuna bivalente felina"
                    categoria = "Vacunación"
                    descripcion = "Refuerzo anual para gatos."
                    precio = {15000}
                    imagen = "/img/Servicios/vacuna-gato.jpg"
                />

                <CardServicio
                    nombre = "Vacuna triple felina"
                    categoria = "Vacunación"
                    descripcion = "Protege contra tres enfermedades felinas."
                    precio = {17000}
                    imagen = "/img/Servicios/vacuna-gato.jpg"
                />

                <CardServicio
                    nombre = "Vacuna Bordetella canina"
                    categoria = "Vacunación"
                    descripcion = "Previene la tos de las perreras."
                    precio = {14000}
                    imagen = "/img/Servicios/vacuna-perro.jpg"
                />

                <CardServicio
                    nombre = "Vacuna antirrábica felina"
                    categoria = "Vacunación"
                    descripcion = "Vacuna obligatoria contra la rabia en gatos."
                    precio = {12000}
                    imagen = "/img/Servicios/vacuna-gato.jpg"
                />

                <CardServicio
                    nombre = "Esterilización hembra canina"
                    categoria = "Cirugía"
                    descripcion = "Cirugía programada, incluye anestesia y hospitalización 24h."
                    precio = {80000}
                    imagen = "/img/Servicios/esterilizacion-perro.jpg"
                />

                <CardServicio
                    nombre = "Esterilización macho canino"
                    categoria = "Cirugía"
                    descripcion = "Cirugía programada, incluye anestesia."
                    precio = {60000}
                    imagen = "/img/Servicios/esterilizacion-perro.jpg"
                />

                <CardServicio
                    nombre = "Esterilización hembra felina"
                    categoria = "Cirugía"
                    descripcion = "Incluye anestesia y hospitalización 12h."
                    precio = {65000}
                    imagen = "/img/Servicios/esterilizacion-gato.jpg"
                />

                <CardServicio
                    nombre = "Esterilización macho felino"
                    categoria = "Cirugía"
                    descripcion = "Cirugía programada, incluye anestesia."
                    precio = {50000}
                    imagen = "/img/Servicios/esterilizacion-gato.jpg"
                />

                <CardServicio
                    nombre = "Extirpación de tumor cutáneo"
                    categoria = "Cirugía"
                    descripcion = "Precio referencial, varía según el tamaño."
                    precio = {120000}
                    imagen = "/img/Servicios/cirugia.jpg"
                />

                <CardServicio
                    nombre = "Cesárea de urgencia"
                    categoria = "Cirugía"
                    descripcion = "Cirugía de urgencia para partos complicados."
                    precio = {180000}
                    imagen = "/img/Servicios/cesarea.jpg"
                />

                <CardServicio
                    nombre = "Desparasitación interna (menos de 10kg)"
                    categoria = "Desparasitación"
                    descripcion = "Tratamiento contra parásitos internos."
                    precio = {8000}
                    imagen = "/img/Servicios/desparasitacion-perro.jpg"
                />

                <CardServicio
                    nombre = "Desparasitación interna (10 a 25kg)"
                    categoria = "Desparasitación"
                    descripcion = "Tratamiento contra parásitos internos."
                    precio = {9500}
                    imagen = "/img/Servicios/desparasitacion-perro.jpg"
                />

                <CardServicio
                    nombre = "Desparasitación interna (más de 25kg)"
                    categoria = "Desparasitación"
                    descripcion = "Tratamiento contra parásitos internos."
                    precio = {11000}
                    imagen = "/img/Servicios/desparasitacion-perro.jpg"
                />

                <CardServicio
                    nombre = "Desparasitación interna felina"
                    categoria = "Desparasitación"
                    descripcion = "Tratamiento contra parásitos internos para gatos."
                    precio = {8000}
                    imagen = "/img/Servicios/desparasitacion-gato.jpg"
                />

                <CardServicio
                    nombre = "Antiparasitario externo (pipeta)"
                    categoria = "Desparasitación"
                    descripcion = "Incluye la aplicación de la pipeta."
                    precio = {7500}
                    imagen = "/img/Servicios/pipeta.jpg"
                />

                <CardServicio
                    nombre = "Hemograma completo"
                    categoria = "Exámenes"
                    descripcion = "Examen de sangre para revisar el estado general del paciente."
                    precio = {22000}
                    imagen = "/img/Servicios/laboratorio.jpg"
                />

                <CardServicio
                    nombre = "Perfil bioquímico completo"
                    categoria = "Exámenes"
                    descripcion = "Resultado en 24 a 48 horas."
                    precio = {35000}
                    imagen = "/img/Servicios/laboratorio.jpg"
                />

                <CardServicio
                    nombre = "Radiografía (1 proyección)"
                    categoria = "Exámenes"
                    descripcion = "Diagnóstico por imagen."
                    precio = {28000}
                    imagen = "/img/Servicios/radiografia.jpg"
                />

                <CardServicio
                    nombre = "Ecografía abdominal"
                    categoria = "Exámenes"
                    descripcion = "Diagnóstico por imagen no invasivo."
                    precio = {45000}
                    imagen = "/img/Servicios/ecografia.jpg"
                />

                <CardServicio
                    nombre = "Test de leishmaniasis"
                    categoria = "Exámenes"
                    descripcion = "Examen de detección para perros."
                    precio = {18000}
                    imagen = "/img/Servicios/laboratorio.jpg"
                />

                <CardServicio
                    nombre = "Corte de uñas"
                    categoria = "Otros"
                    descripcion = "Servicio rápido de higiene y cuidado de uñas."
                    precio = {5000}
                    imagen = "/img/Servicios/unas.jpg"
                />

                <CardServicio
                    nombre = "Limpieza dental"
                    categoria = "Otros"
                    descripcion = "Requiere anestesia."
                    precio = {55000}
                    imagen = "/img/Servicios/dental.jpg"
                />

                <CardServicio
                    nombre = "Microchip de identificación"
                    categoria = "Otros"
                    descripcion = "Incluye registro en el sistema nacional."
                    precio = {15000}
                    imagen = "/img/Servicios/microchip.jpg"
                />

                <CardServicio
                    nombre = "Hospitalización (por día)"
                    categoria = "Otros"
                    descripcion = "Incluye monitoreo y alimentación básica."
                    precio = {30000}
                    imagen = "/img/Servicios/hospitalizacion.jpg"
                />
            </div>
        </div>
    )
}

export default Servicios
