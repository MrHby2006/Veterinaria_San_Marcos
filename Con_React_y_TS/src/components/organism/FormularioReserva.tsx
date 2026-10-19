import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import SelectEspecie from "../molecules/SelectEspecie";

interface FormularioReservaProps {
    servicio: string; // Servicio elegido en la página de Servicios
}

function FormularioReserva({servicio}: FormularioReservaProps) {

    // Estados para guardar los datos del formulario
    const [mascota, setMascota] = useState("");
    const [especie, setEspecie] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

    // Valida los datos al enviar el formulario
    const manejarReserva = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita recargar la página

        if (mascota.trim() === "") {
            alert("Debe ingresar el nombre de su mascota");
            return;
        }
        if (especie === "") {
            alert("Debe seleccionar una especie");
            return;
        }
        if (fecha === "") {
            alert("Debe seleccionar una fecha");
            return;
        }

        // Fecha de hoy a las 00:00, para comparar solo el día y no la hora
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        // "T00:00" hace que la fecha elegida también quede a las 00:00
        const fechaElegida = new Date(fecha + "T00:00");

        if (fechaElegida < hoy) {
            alert("La fecha no puede ser anterior a hoy");
            return;
        }
        // getDay() devuelve el día de la semana: 0 = domingo, 6 = sábado
        if (fechaElegida.getDay() === 0) {
            alert("Los domingos no atendemos");
            return;
        }
        if (hora === "") {
            alert("Debe seleccionar una hora");
            return;
        }
        // Las horas vienen como texto "HH:MM", así que se pueden comparar directamente
        if (fechaElegida.getDay() === 6 && (hora < "10:00" || hora > "14:00")) {
            alert("Los sábados atendemos de 10:00 a 14:00");
            return;
        }
        if (hora < "09:00" || hora > "19:00") {
            alert("De lunes a viernes atendemos de 09:00 a 19:00");
            return;
        }
        alert("Hora reservada con éxito para " + mascota + ": " + servicio + " el " + fecha + " a las " + hora);
    };

    return (
        <form onSubmit = {manejarReserva} noValidate>

            <p className = "fs-5">
                Servicio: <strong>{servicio}</strong>
            </p>

            <CampoFormulario
                etiqueta = "Nombre de la mascota"
                tipo = "text"
                nombre = "mascota"
                valor = {mascota}
                alCambiar = {setMascota}
            />

            <SelectEspecie
                valor = {especie}
                alCambiar = {setEspecie}
            />

            <CampoFormulario
                etiqueta = "Fecha"
                tipo = "date"
                nombre = "fecha"
                valor = {fecha}
                alCambiar = {setFecha}
            />

            <CampoFormulario
                etiqueta = "Hora"
                tipo = "time"
                nombre = "hora"
                valor = {hora}
                alCambiar = {setHora}
            />

            <div className = "text-center">
                <button type = "submit" className = "btn btn-primary">
                    Reservar hora
                </button>
            </div>

        </form>
    )
}

export default FormularioReserva
