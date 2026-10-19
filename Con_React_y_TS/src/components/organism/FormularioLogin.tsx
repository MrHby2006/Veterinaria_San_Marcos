import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";

function FormularioLogin() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    const manejarLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
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

        alert("Datos ingresados correctamente")
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
                <button type="submit" className="btn btn-primary">
                    Iniciar Sesión
                </button>
            </div>
        </form>
    );
}

export default FormularioLogin;