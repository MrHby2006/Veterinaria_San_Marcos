import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CampoFormulario from "../molecules/CampoFormulario";
import SelectTipoUsuario from "../molecules/SelectTipoUsuario";
import { API, leerError } from "../../data/api";
import { obtenerUsuario } from "../../data/sesion";

// Datos de cada usuario que manda el microservicio usuarios (nunca trae la contraseña)
interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    rol: string;
}

function Admin_usuarios() {
    const usuarioSesion = obtenerUsuario();
    const esAdmin = usuarioSesion !== null && usuarioSesion.rol === "Administrador";

    // Lista de usuarios activos, viene del backend
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    // Estados del formulario
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [tipo, setTipo] = useState("Cliente");

    // Id del usuario que se está editando (0 = ninguno, se está agregando uno nuevo)
    const [idEditando, setIdEditando] = useState(0);

    // true mientras se espera la respuesta del backend
    const [enviando, setEnviando] = useState(false);

    // Consulta los usuarios al abrir la página (solo si es admin).
    // Se manda ?idAdmin= para que el backend revise que de verdad sea administrador
    useEffect(() => {
        const usuarioActual = obtenerUsuario();
        if (usuarioActual === null || usuarioActual.rol !== "Administrador") {
            return;
        }
        fetch(API + "/api/usuarios?idAdmin=" + usuarioActual.id)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al consultar los usuarios");
                }
                return respuesta.json();
            })
            .then((datos) => setUsuarios(datos))
            .catch(() => alert("No se pudieron cargar los usuarios"));
    }, []);

    // Deja el formulario vacío otra vez
    const limpiarFormulario = () => {
        setNombre("");
        setCorreo("");
        setContrasena("");
        setTipo("Cliente");
        setIdEditando(0);
    };

    // Agrega un usuario nuevo o guarda los cambios del que se está editando
    const manejarEnvio = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita recargar la página

        if (nombre.trim() === "") {
            alert("Debe ingresar el nombre");
            return;
        }
        if (correo.trim() === "") {
            alert("Debe ingresar el correo");
            return;
        }
        // Comprueba que el correo tenga un formato válido
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            alert("Ingrese un correo válido");
            return;
        }
        // La contraseña solo se pide al agregar (al editar no se cambia)
        if (idEditando === 0 && contrasena.length < 8) {
            alert("La contraseña debe ser de mínimo 8 caracteres");
            return;
        }
        // El backend no puede encriptar contraseñas más largas
        if (idEditando === 0 && contrasena.length > 72) {
            alert("La contraseña puede tener máximo 72 caracteres");
            return;
        }

        setEnviando(true);

        try {
            if (idEditando === 0) {
                // Agregar: POST con los datos y la contraseña
                const respuesta = await fetch(API + "/api/usuarios?idAdmin=" + usuarioSesion?.id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: nombre.trim(),
                        correo: correo.trim(),
                        contrasena: contrasena,
                        rol: tipo,
                    }),
                });
                if (!respuesta.ok) {
                    alert(await leerError(respuesta));
                    return;
                }
                const nuevoUsuario: Usuario = await respuesta.json();
                setUsuarios(usuarios.concat(nuevoUsuario));
                alert("Usuario agregado");
            } else {
                // Editar: PUT al usuario que tiene ese id
                const respuesta = await fetch(API + "/api/usuarios/" + idEditando + "?idAdmin=" + usuarioSesion?.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: nombre.trim(),
                        correo: correo.trim(),
                        rol: tipo,
                    }),
                });
                if (!respuesta.ok) {
                    alert(await leerError(respuesta));
                    return;
                }
                const usuarioEditado: Usuario = await respuesta.json();
                setUsuarios(usuarios.map((usuario) => {
                    if (usuario.id === usuarioEditado.id) {
                        return usuarioEditado;
                    }
                    return usuario;
                }));
                alert("Usuario actualizado");
            }

            limpiarFormulario();
        } catch {
            alert("No se pudo conectar con el servidor");
        } finally {
            setEnviando(false);
        }
    };

    // Pasa los datos del usuario al formulario para editarlo
    const editarUsuario = (id: number, nombreUsuario: string, correoUsuario: string, tipoUsuario: string) => {
        setNombre(nombreUsuario);
        setCorreo(correoUsuario);
        setContrasena("");
        setTipo(tipoUsuario);
        setIdEditando(id);
    };

    // Elimina un usuario. En el backend no se borra: queda desactivado
    const eliminarUsuario = async (id: number) => {
        if (!confirm("¿Seguro que quiere eliminar este usuario?")) {
            return;
        }
        try {
            const respuesta = await fetch(API + "/api/usuarios/" + id + "?idAdmin=" + usuarioSesion?.id, { method: "DELETE" });
            if (!respuesta.ok) {
                alert(await leerError(respuesta));
                return;
            }
            setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
            // Si se estaba editando ese usuario, se vacía el formulario
            if (id === idEditando) {
                limpiarFormulario();
            }
        } catch {
            alert("No se pudo conectar con el servidor");
        }
    };

    if (!esAdmin) {
        return (
            <div className = "container my-4">
                <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>Mantenedor de usuarios</h2>
                <p className = "text-center mt-4">Solo el administrador puede ver esta página. <a href = "/login">Iniciar sesión</a></p>
            </div>
        )
    }

    return (
        <div className = "container my-4">
            <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>Mantenedor de usuarios</h2>

            <div className = "row justify-content-center mt-4">
                <div className = "col-12 col-md-10 col-lg-8">

                    <Link className = "btn btn-primary mb-3" to = "/admin">
                        Volver al panel
                    </Link>

                    {/* Formulario para agregar o editar */}
                    <div className = "card shadow-sm p-4 mb-4 text-start">
                        <form onSubmit = {manejarEnvio} noValidate>

                            <CampoFormulario
                                etiqueta = "Nombre"
                                tipo = "text"
                                nombre = "nombre"
                                valor = {nombre}
                                alCambiar = {setNombre}
                            />

                            <CampoFormulario
                                etiqueta = "Correo"
                                tipo = "email"
                                nombre = "correo"
                                valor = {correo}
                                alCambiar = {setCorreo}
                            />

                            {/* La contraseña solo se escribe al agregar */}
                            {idEditando === 0 && (
                                <CampoFormulario
                                    etiqueta = "Contraseña"
                                    tipo = "password"
                                    nombre = "contrasena"
                                    valor = {contrasena}
                                    alCambiar = {setContrasena}
                                />
                            )}

                            <SelectTipoUsuario
                                valor = {tipo}
                                alCambiar = {setTipo}
                            />

                            <div className = "text-center">
                                <button type = "submit" className = "btn btn-primary" disabled = {enviando}>
                                    {enviando ? "Enviando..." : idEditando === 0 ? "Agregar usuario" : "Guardar cambios"}
                                </button>
                                {/* Mientras se edita, se puede volver a modo agregar */}
                                {idEditando !== 0 && (
                                    <button type = "button" className = "btn btn-secondary ms-2" onClick = {limpiarFormulario}>Cancelar</button>
                                )}
                            </div>

                        </form>
                    </div>

                    {/* Tabla con los usuarios */}
                    <div className = "table-responsive">
                        <table className = "table table-bordered align-middle bg-white">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Tipo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario) => (
                                    <tr key = {usuario.id}>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.rol}</td>
                                        <td>
                                            <button className = "btn btn-primary btn-sm me-2" onClick = {() => editarUsuario(usuario.id, usuario.nombre, usuario.correo, usuario.rol)}>Editar</button>
                                            <button className = "btn btn-danger btn-sm" onClick = {() => eliminarUsuario(usuario.id)}>Eliminar</button>
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

export default Admin_usuarios
