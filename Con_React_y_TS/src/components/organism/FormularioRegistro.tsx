import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import { API, leerError } from "../../data/api";

function FormularioRegistro() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [direccion, setDireccion] = useState("");

    // true mientras se espera la respuesta del backend
    const [enviando, setEnviando] = useState(false);

    const manejarRegistro = async (e: React.SubmitEvent<HTMLFormElement>) => {
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

        if (contrasena.length < 8) {
            alert("la contraseña debe ser de mínimo 8 caracteres");
            return;
        }

        if (direccion.trim() === "") {
            alert("Debe ingresar una dirección");
            return;
        }

        // Comienza el envío
        setEnviando(true);

        try {
            // El backend encripta la contraseña y crea al usuario como Cliente
            const respuesta = await fetch(API + "/api/usuarios/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: nombre.trim(),
                    correo: correo.trim(),
                    contrasena: contrasena,
                    direccion: direccion.trim(),
                }),
            });

            if (!respuesta.ok) {
                alert(await leerError(respuesta));
                return;
            }

            alert("Cuenta creada con éxito, ahora puede iniciar sesión");
            window.location.href = "/login";
        } catch {
            alert("No se pudo conectar con el servidor");
        } finally {
            setEnviando(false);
        }
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
                tipo="password"
                nombre="contrasena"
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

            <div className="text-center">
                <button type="submit" className="btn btn-primary" disabled={enviando}>
                    {enviando ? "Enviando..." : "Crear Cuenta"}
                </button>
            </div>
        </form>
    );
}

export default FormularioRegistro;
