import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import SelectEspecie from "../molecules/SelectEspecie";
import { API, leerError } from "../../data/api";
import { obtenerUsuario } from "../../data/sesion";

interface FormularioReservaProps {
    servicio: string; // Nombre del servicio elegido en la página de Servicios
    idServicio: number; // Id de ese servicio en la base de datos (0 = no se encontró)
}

function FormularioReserva({servicio, idServicio}: FormularioReservaProps) {

    // Estados para guardar los datos del formulario
    const [mascota, setMascota] = useState("");
    const [especie, setEspecie] = useState(""); // guarda el id de la especie
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

    // true mientras se espera la respuesta del backend
    const [enviando, setEnviando] = useState(false);

    // Valida los datos y los envía al backend
    const manejarReserva = async (e: React.SubmitEvent<HTMLFormElement>) => {
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

        // Para reservar hay que haber iniciado sesión (el backend necesita el id del cliente)
        const usuario = obtenerUsuario();
        if (usuario === null) {
            alert("Debe iniciar sesión para reservar una hora");
            return;
        }
        if (idServicio === 0) {
            alert("Este servicio no está disponible por ahora");
            return;
        }

        // Comienza el envío
        setEnviando(true);

        try {
            const respuesta = await fetch(API + "/api/citas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idUsuario: usuario.id,
                    nombreMascota: mascota.trim(),
                    idEspecie: Number(especie),
                    idServicio: idServicio,
                    fecha: fecha,
                    hora: hora,
                }),
            });

            if (!respuesta.ok) {
                alert(await leerError(respuesta));
                return;
            }

            alert("Hora reservada con éxito para " + mascota + ": " + servicio + " el " + fecha + " a las " + hora);

            // Deja el formulario vacío para otra reserva
            setMascota("");
            setEspecie("");
            setFecha("");
            setHora("");
        } catch {
            alert("No se pudo conectar con el servidor");
        } finally {
            setEnviando(false);
        }
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
                <button type = "submit" className = "btn btn-primary" disabled = {enviando}>
                    {enviando ? "Enviando..." : "Reservar hora"}
                </button>
            </div>

        </form>
    )
}

export default FormularioReserva
