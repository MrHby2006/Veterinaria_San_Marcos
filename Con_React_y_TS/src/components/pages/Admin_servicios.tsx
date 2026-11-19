import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Servicio } from "../molecules/CardServicio";
import type { Medicamento } from "../molecules/CardMedicamento";
import { API, leerError } from "../../data/api";
import { obtenerUsuario } from "../../data/sesion";

// Cada fila de la tabla: sirve igual para un servicio o un medicamento
interface FilaPrecio {
    id: number;
    nombre: string;
    precio: number;
}

function Admin_servicios() {
    // Solo el administrador puede cambiar precios
    const usuarioSesion = obtenerUsuario();
    const esAdmin = usuarioSesion !== null && usuarioSesion.rol === "Administrador";

    // Servicios y medicamentos con sus precios, vienen del backend (microservicio catalogo)
    const [servicios, setServicios] = useState<FilaPrecio[]>([]);
    const [medicamentos, setMedicamentos] = useState<FilaPrecio[]>([]);

    // Qué lista se está mostrando en la tabla (Servicios o Medicamentos)
    const [tipo, setTipo] = useState("Servicios");

    // Consulta las dos listas al abrir la página
    useEffect(() => {
        fetch(API + "/api/servicios")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al consultar los servicios");
                }
                return respuesta.json();
            })
            .then((datos: Servicio[]) => setServicios(datos.map((servicio) => ({ id: servicio.id, nombre: servicio.nombre, precio: servicio.precio }))))
            .catch(() => alert("No se pudieron cargar los servicios"));

        // Los medicamentos traen el nombre y el precio con otros nombres de campo
        fetch(API + "/api/medicamentos")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al consultar los medicamentos");
                }
                return respuesta.json();
            })
            .then((datos: Medicamento[]) => setMedicamentos(datos.map((medicamento) => ({ id: medicamento.id, nombre: medicamento.nombreComercial, precio: medicamento.precioUnitario }))))
            .catch(() => alert("No se pudieron cargar los medicamentos"));
    }, []);

    // Cambia el precio mientras se escribe en el input, en la lista que esté elegida
    const cambiarPrecio = (id: number, nuevoPrecio: number) => {
        if (tipo === "Servicios") {
            setServicios(servicios.map((servicio) => {
                if (servicio.id === id) {
                    return { id: servicio.id, nombre: servicio.nombre, precio: nuevoPrecio };
                }
                return servicio;
            }));
        } else {
            setMedicamentos(medicamentos.map((medicamento) => {
                if (medicamento.id === id) {
                    return { id: medicamento.id, nombre: medicamento.nombre, precio: nuevoPrecio };
                }
                return medicamento;
            }));
        }
    };

    // La tabla muestra los servicios o los medicamentos según el selector
    const lista = tipo === "Servicios" ? servicios : medicamentos;

    // Guarda el precio en el backend al apretar "Guardar".
    // Se manda ?idUsuario= para que el backend revise que sea el administrador
    const guardarPrecio = async (id: number, precio: number) => {
        if (precio <= 0) {
            alert("El precio debe ser mayor a 0");
            return;
        }

        // Servicios = PUT /api/servicios/{id}, Medicamentos = PUT /api/medicamentos/{id}
        let url = API + "/api/servicios/" + id + "?idUsuario=" + usuarioSesion?.id;
        if (tipo === "Medicamentos") {
            url = API + "/api/medicamentos/" + id + "?idUsuario=" + usuarioSesion?.id;
        }

        try {
            const respuesta = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    precio: precio,
                }),
            });
            if (!respuesta.ok) {
                alert(await leerError(respuesta));
                return;
            }
            alert("Precio actualizado");
        } catch {
            alert("No se pudo conectar con el servidor");
        }
    };

    if (!esAdmin) {
        return (
            <div className = "container my-4">
                <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>Mantenedor de precios</h2>
                <p className = "text-center mt-4">Solo el administrador puede ver esta página. <a href = "/login">Iniciar sesión</a></p>
            </div>
        )
    }

    return (
        <div className = "container my-4">
            <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>Mantenedor de precios</h2>

            <h4 className = "mt-3 mb-4 text-center" style = {{ color: "#2F3E46" }}>Aquí puedes cambiar el precio de un servicio o de un medicamento.</h4>

            <div className = "row justify-content-center">
                <div className = "col-12 col-md-10 col-lg-8">

                    <Link className = "btn btn-primary mb-3" to = "/admin">
                        Volver al panel
                    </Link>

                    {/* Selector para elegir qué precios se van a editar */}
                    <div className = "mb-3">
                        <label className = "form-label fw-bold" htmlFor = "tipoPrecio">
                            Editar precios de
                        </label>

                        <select
                            id = "tipoPrecio"
                            className = "form-select"
                            value = {tipo}
                            onChange = {(e) => setTipo(e.target.value)}
                        >
                            <option value = "Servicios">Servicios</option>
                            <option value = "Medicamentos">Medicamentos</option>
                        </select>
                    </div>

                    <div className = "table-responsive">
                        <table className = "table table-bordered align-middle bg-white">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.map((item) => (
                                    <tr key = {item.id}>
                                        <td>{item.nombre}</td>
                                        <td>
                                            <input
                                                type = "number"
                                                className = "form-control"
                                                aria-label = {"Precio de " + item.nombre}
                                                value = {item.precio}
                                                onChange = {(e) => cambiarPrecio(item.id, Number(e.target.value))}
                                            />
                                        </td>
                                        <td>
                                            <button className = "btn btn-primary btn-sm" onClick = {() => guardarPrecio(item.id, item.precio)}>Guardar</button>
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

export default Admin_servicios
