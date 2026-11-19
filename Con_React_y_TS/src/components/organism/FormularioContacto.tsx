import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import { API, leerError } from "../../data/api";

function FormularioContacto() {

    // Estados para guardar los datos del formulario
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [enviando, setEnviando] = useState(false);

    // Valida los datos y los envía al backend (microservicio contenido)
    const manejarEnvio = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita recargar la página

        if (nombre.trim() === "") {
            alert("Debe ingresar su nombre");
            return;
        }
        if (correo.trim() === "") {
            alert("Debe ingresar su correo");
            return;
        }
        // Comprueba que el correo tenga un formato válido
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            alert("Ingrese un correo válido");
            return;
        }
        if (mensaje.trim() === "") {
            alert("Debe ingresar un mensaje");
            return;
        }

        setEnviando(true);

        // No hace falta iniciar sesión: cualquiera puede escribir a la clínica
        try {
            const respuesta = await fetch(API + "/api/contactos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: nombre.trim(),
                    correo: correo.trim(),
                    mensaje: mensaje.trim(),
                }),
            });
            if (!respuesta.ok) {
                alert(await leerError(respuesta));
                return;
            }
            alert("Mensaje enviado correctamente. Te responderemos a la brevedad.");
            // Deja el formulario vacío para otro mensaje
            setNombre("");
            setCorreo("");
            setMensaje("");
        } catch {
            alert("No se pudo conectar con el servidor");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <form onSubmit = {manejarEnvio} noValidate>

            <CampoFormulario
                etiqueta = "Nombre"
                tipo = "text"
                nombre = "nombre"
                valor = {nombre}
                alCambiar = {setNombre}
            />

            <CampoFormulario
                etiqueta = "Correo Electrónico"
                tipo = "email"
                nombre = "correo"
                valor = {correo}
                alCambiar = {setCorreo}
            />

            <CampoFormulario
                etiqueta = "Mensaje o Comentario"
                tipo = "text"
                nombre = "mensaje"
                valor = {mensaje}
                alCambiar = {setMensaje}
            />

            <div className = "text-center">
                <button type = "submit" className = "btn btn-primary" disabled = {enviando}>
                    {enviando ? "Enviando..." : "Enviar mensaje"}
                </button>
            </div>

        </form>
    )
}

export default FormularioContacto
