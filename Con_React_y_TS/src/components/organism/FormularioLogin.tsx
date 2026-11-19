import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import { API, leerError } from "../../data/api";
import { guardarUsuario } from "../../data/sesion";

function FormularioLogin() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    // true mientras se espera la respuesta del backend
    const [enviando, setEnviando] = useState(false);

    const manejarLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

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

        // Comienza el envío
        setEnviando(true);

        try {
            // El backend compara la contraseña con la que tiene encriptada
            const respuesta = await fetch(API + "/api/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    correo: correo.trim(),
                    contrasena: contrasena,
                }),
            });

            if (!respuesta.ok) {
                alert(await leerError(respuesta));
                return;
            }

            // Guarda al usuario para saber quién es en las otras páginas
            const usuario = await respuesta.json();
            guardarUsuario(usuario);
            alert("Bienvenido, " + usuario.nombre);

            // Lo manda a su panel. Se recarga la página para que el Navbar muestre sus opciones
            if (usuario.rol === "Administrador") {
                window.location.href = "/admin";
            } else if (usuario.rol === "Recepcionista") {
                window.location.href = "/recepcionista";
            } else {
                window.location.href = "/";
            }
        } catch {
            alert("No se pudo conectar con el servidor");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <form onSubmit={manejarLogin} noValidate>
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

            <div className="text-center">
                <button type="submit" className="btn btn-primary" disabled={enviando}>
                    {enviando ? "Enviando..." : "Iniciar Sesión"}
                </button>
            </div>
        </form>
    );
}

export default FormularioLogin;
