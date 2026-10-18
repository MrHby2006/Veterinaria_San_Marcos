import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";

function FormularioRegistro() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [direccion, setDireccion] = useState("");

    const manejarRegistro = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nombre.trim() === "") {
            alert("Debe ingresar un nombre");
            return;
        }

        if (correo.trim() === "") {
            alert("Debe ingresar un correo");
            return;
        }

        // Comprueba que el correo tenga un formato válido
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo)) {
            alert("Ingrese un correo válido");
            return;
        }

        if (contrasena.trim() === "") {
            alert("Debe ingresar una contraseña");
            return;
        }

        if (contrasena.length < 7) {
            alert("la contraseña debe ser de mínimo 8 caracteres");
            return;
        }

        if (direccion.trim() === "") {
            alert("Debe ingresar una dirección");
            return;
        }

        alert("Datos ingresados correctamente")
    };

    return (
        <form onSubmit={manejarRegistro} noValidate>
            <CampoFormulario
                etiqueta="Nombre completo"
                tipo="text"
                nombre="nombre"
                valor={nombre}
                alCambiar={setNombre}
            />
            
            <CampoFormulario
                etiqueta="Correo electrónico"
                tipo="email"
                nombre="correo"
                valor={correo}
                alCambiar={setCorreo}
            />

            <CampoFormulario
                etiqueta="Contraseña"
                tipo="text"
                nombre="mensaje"
                valor={contrasena}
                alCambiar={setContrasena}
            />

            <CampoFormulario
                etiqueta="Dirección"
                tipo="text"
                nombre="direccion"
                valor={direccion}
                alCambiar={setDireccion}
            />

            <button type="submit" className="btn btn-primary">
                Crear Cuenta
            </button>
        </form>
    );
}

export default FormularioRegistro;