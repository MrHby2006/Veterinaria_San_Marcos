import { useState } from "react";
import { Link } from "react-router-dom";
import CampoFormulario from "../molecules/CampoFormulario";
import SelectTipoUsuario from "../molecules/SelectTipoUsuario";

function Admin_usuarios() {
    // Estado con la lista de usuarios (sin base de datos, se reinicia al recargar)
    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: "Cliente de prueba", correo: "cliente@sanmarcos.cl", tipo: "Cliente" },
        { id: 2, nombre: "Recepcionista de prueba", correo: "recepcion@sanmarcos.cl", tipo: "Recepcionista" },
        { id: 3, nombre: "Administrador de prueba", correo: "admin@sanmarcos.cl", tipo: "Administrador" },
    ]);

    // Estados del formulario
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [tipo, setTipo] = useState("Cliente");

    // Id del usuario que se está editando (0 = ninguno, se está agregando uno nuevo)
    const [idEditando, setIdEditando] = useState(0);

    // Id que se le dará al próximo usuario nuevo
    const [siguienteId, setSiguienteId] = useState(4);

    // Deja el formulario vacío otra vez
    const limpiarFormulario = () => {
        setNombre("");
        setCorreo("");
        setTipo("Cliente");
        setIdEditando(0);
    };

    // Agrega un usuario nuevo o guarda los cambios del que se está editando
    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
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

        if (idEditando === 0) {
            // Agregar: se crea el usuario y se suma al final de la lista
            const nuevoUsuario = { id: siguienteId, nombre: nombre, correo: correo, tipo: tipo };
            setUsuarios(usuarios.concat(nuevoUsuario));
            setSiguienteId(siguienteId + 1);
            alert("Usuario agregado");
        } else {
            // Editar: se reemplaza solo el usuario que tiene ese id
            setUsuarios(usuarios.map((usuario) => {
                if (usuario.id === idEditando) {
                    return { id: usuario.id, nombre: nombre, correo: correo, tipo: tipo };
                }
                return usuario;
            }));
            alert("Usuario actualizado");
        }

        limpiarFormulario();
    };

    // Pasa los datos del usuario al formulario para editarlo
    const editarUsuario = (id: number, nombreUsuario: string, correoUsuario: string, tipoUsuario: string) => {
        setNombre(nombreUsuario);
        setCorreo(correoUsuario);
        setTipo(tipoUsuario);
        setIdEditando(id);
    };

    // Quita un usuario de la lista
    const eliminarUsuario = (id: number) => {
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    };

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

                            <SelectTipoUsuario
                                valor = {tipo}
                                alCambiar = {setTipo}
                            />

                            <div className = "text-center">
                                <button type = "submit" className = "btn btn-primary">
                                    {idEditando === 0 ? "Agregar usuario" : "Guardar cambios"}
                                </button>
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
                                        <td>{usuario.tipo}</td>
                                        <td>
                                            <button className = "btn btn-primary btn-sm me-2" onClick = {() => editarUsuario(usuario.id, usuario.nombre, usuario.correo, usuario.tipo)}>Editar</button>
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
