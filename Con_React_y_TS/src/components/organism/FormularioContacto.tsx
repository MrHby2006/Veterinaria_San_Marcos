import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";

function FormularioContacto() {

    // Estados para guardar los datos del formulario
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    // Valida los datos al enviar el formulario
    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
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
        alert("Mensaje enviado correctamente. Te responderemos a la brevedad.");
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
                <button type = "submit" className = "btn btn-primary">
                    Enviar mensaje
                </button>
            </div>

        </form>
    )
}

export default FormularioContacto
