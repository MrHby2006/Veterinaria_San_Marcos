import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CampoFormulario from "../molecules/CampoFormulario";
import type { Medico } from "../atoms/SelectMedico";
import { API, leerError } from "../../data/api";
import { obtenerUsuario } from "../../data/sesion";

// Mantenedor de médicos: el admin los agrega, edita y elimina; la recepcionista los elige en las citas.
// Los médicos no tienen cuenta, por eso no tienen correo ni contraseña.
function Admin_medicos() {
    const usuarioSesion = obtenerUsuario();
    const esAdmin = usuarioSesion !== null && usuarioSesion.rol === "Administrador";

    // Médicos activos, vienen del backend
    const [medicos, setMedicos] = useState<Medico[]>([]);

    // Estados del formulario
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [enviando, setEnviando] = useState(false);

    // Id del médico que se está editando (0 = ninguno, se está agregando uno nuevo)
    const [idEditando, setIdEditando] = useState(0);

    // Consulta los médicos al abrir la página
    useEffect(() => {
        fetch(API + "/api/medicos")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al consultar los médicos");
                }
                return respuesta.json();
            })
            .then((datos) => setMedicos(datos))
            .catch(() => alert("No se pudieron cargar los médicos"));
    }, []);

    // Deja el formulario vacío otra vez
    const limpiarFormulario = () => {
        setNombre("");
        setApellido("");
        setIdEditando(0);
    };

    // Pasa los datos del médico al formulario para editarlo
    const editarMedico = (medico: Medico) => {
        setNombre(medico.nombre);
        setApellido(medico.apellido);
        setIdEditando(medico.id);
    };

    // Agrega un médico nuevo o guarda los cambios del que se está editando.
    // Se manda ?idUsuario= para que el backend revise que sea el administrador
    const guardarMedico = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nombre.trim() === "") {
            alert("Debe ingresar el nombre del médico");
            return;
        }
        if (apellido.trim() === "") {
            alert("Debe ingresar el apellido del médico");
            return;
        }

        setEnviando(true);

        // Agregar = POST a /api/medicos, Editar = PUT a /api/medicos/{id}
        let url = API + "/api/medicos?idUsuario=" + usuarioSesion?.id;
        let metodo = "POST";
        if (idEditando !== 0) {
            url = API + "/api/medicos/" + idEditando + "?idUsuario=" + usuarioSesion?.id;
            metodo = "PUT";
        }

        try {
            const respuesta = await fetch(url, {
                method: metodo,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: nombre.trim(),
                    apellido: apellido.trim(),
                }),
            });
            if (!respuesta.ok) {
                alert(await leerError(respuesta));
                return;
            }
            const medicoGuardado: Medico = await respuesta.json();
            if (idEditando === 0) {
                setMedicos(medicos.concat(medicoGuardado));
                alert("Médico agregado");
            } else {
                // Reemplaza en la tabla el médico que se editó
                setMedicos(medicos.map((medico) => {
                    if (medico.id === medicoGuardado.id) {
                        return medicoGuardado;
                    }
                    return medico;
                }));
                alert("Médico actualizado");
            }
            limpiarFormulario();
        } catch {
            alert("No se pudo conectar con el servidor");
        } finally {
            setEnviando(false);
        }
    };

    // No se borra: queda desactivado, así sus citas antiguas siguen mostrando su nombre
    const eliminarMedico = async (id: number) => {
        if (!confirm("¿Seguro que quiere eliminar este médico?")) {
            return;
        }
        try {
            const respuesta = await fetch(API + "/api/medicos/" + id + "?idUsuario=" + usuarioSesion?.id, { method: "DELETE" });
            if (!respuesta.ok) {
                alert(await leerError(respuesta));
                return;
            }
            setMedicos(medicos.filter((medico) => medico.id !== id));
        } catch {
            alert("No se pudo conectar con el servidor");
        }
    };

    if (!esAdmin) {
        return (
            <div className = "container my-4">
                <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>Mantenedor de médicos</h2>
                <p className = "text-center mt-4">Solo el administrador puede ver esta página. <a href = "/login">Iniciar sesión</a></p>
            </div>
        )
    }

    return (
        <div className = "container my-4">
            <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>Mantenedor de médicos</h2>

            <div className = "row justify-content-center mt-4">
                <div className = "col-12 col-md-10 col-lg-8">

                    <Link className = "btn btn-primary mb-3" to = "/admin">
                        Volver al panel
                    </Link>

                    <div className = "card shadow-sm p-4 mb-4 text-start">
                        <form onSubmit = {guardarMedico} noValidate>
                            <CampoFormulario
                                etiqueta = "Nombre"
                                tipo = "text"
                                nombre = "nombre"
                                valor = {nombre}
                                alCambiar = {setNombre}
                            />

                            <CampoFormulario
                                etiqueta = "Apellido"
                                tipo = "text"
                                nombre = "apellido"
                                valor = {apellido}
                                alCambiar = {setApellido}
                            />

                            <div className = "text-center">
                                <button type = "submit" className = "btn btn-primary" disabled = {enviando}>
                                    {enviando ? "Enviando..." : idEditando === 0 ? "Agregar médico" : "Guardar cambios"}
                                </button>
                                {/* Mientras se edita, se puede volver a modo agregar */}
                                {idEditando !== 0 && (
                                    <button type = "button" className = "btn btn-secondary ms-2" onClick = {limpiarFormulario}>Cancelar</button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className = "table-responsive">
                        <table className = "table table-bordered align-middle bg-white">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicos.map((medico) => (
                                    <tr key = {medico.id}>
                                        <td>{medico.nombre}</td>
                                        <td>{medico.apellido}</td>
                                        <td>
                                            <button className = "btn btn-warning btn-sm me-2" onClick = {() => editarMedico(medico)}>Editar</button>
                                            <button className = "btn btn-danger btn-sm" onClick = {() => eliminarMedico(medico.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin_medicos
