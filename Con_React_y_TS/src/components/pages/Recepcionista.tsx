import { useEffect, useState } from "react";
import SelectMedico from "../atoms/SelectMedico";
import type { Medico } from "../atoms/SelectMedico";
import { API, leerError } from "../../data/api";
import { obtenerUsuario } from "../../data/sesion";

// Datos de cada cita pagada que manda el microservicio citas
interface CitaRecepcion {
    id: number;
    correoCliente: string;
    nombreMascota: string;
    nombreServicio: string;
    fecha: string;
    hora: string;
    precio: number;
    estado: string;
    idMedico: number | null; // null = todavía no tiene médico
    nombreMedico: string;
}

// Datos de cada medicamento pagado que manda el microservicio ventas
interface Pedido {
    id: number;
    correoCliente: string;
    nombreMedicamento: string;
    cantidad: number;
    subtotal: number;
    entregado: boolean;
}

// Datos de cada mensaje del formulario de Contacto que manda el microservicio contenido
interface MensajeContacto {
    id: number;
    nombre: string;
    correo: string;
    mensaje: string;
    fecha: string; // Ej: "2026-11-19T17:33:50"
    estado: string; // PENDIENTE o ATENDIDO
}

// Pide datos al backend y los guarda con la función que se le pase
function cargar(url: string, guardar: (datos: []) => void, mensaje: string) {
    fetch(API + url)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(mensaje);
            }
            return respuesta.json();
        })
        .then((datos) => guardar(datos))
        .catch(() => alert(mensaje));
}

function Recepcionista() {
    const usuario = obtenerUsuario();
    const puedeEntrar = usuario !== null && (usuario.rol === "Recepcionista" || usuario.rol === "Administrador");

    // El backend solo manda las citas que el cliente ya pagó
    const [citas, setCitas] = useState<CitaRecepcion[]>([]);
    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [mensajes, setMensajes] = useState<MensajeContacto[]>([]);

    // Consulta todo al abrir la página
    useEffect(() => {
        const usuarioActual = obtenerUsuario();
        if (usuarioActual === null || usuarioActual.rol === "Cliente") {
            return;
        }
        // Se manda ?idUsuario= para que el backend revise que sea personal de la clínica
        cargar("/api/citas/pagadas?idUsuario=" + usuarioActual.id, setCitas, "No se pudieron cargar las citas");
        cargar("/api/medicos", setMedicos, "No se pudieron cargar los médicos");
        cargar("/api/compras/pagadas?idUsuario=" + usuarioActual.id, setPedidos, "No se pudieron cargar los medicamentos");
        cargar("/api/contactos?idUsuario=" + usuarioActual.id, setMensajes, "No se pudieron cargar los mensajes");
    }, []);

    // Reemplaza en la tabla la cita que cambió por la que devolvió el backend
    const actualizarCita = (citaNueva: CitaRecepcion) => {
        setCitas(citas.map((cita) => {
            if (cita.id === citaNueva.id) {
                return citaNueva;
            }
            return cita;
        }));
    };

    // Envía un PUT de citas y actualiza la fila (lo usan asignar, confirmar y cancelar).
    // Siempre se agrega ?idUsuario= de la recepcionista
    const cambiarCita = async (url: string) => {
        try {
            const respuesta = await fetch(API + url + "?idUsuario=" + usuario?.id, { method: "PUT" });
            if (!respuesta.ok) {
                alert(await leerError(respuesta));
                return;
            }
            actualizarCita(await respuesta.json());
        } catch {
            alert("No se pudo conectar con el servidor");
        }
    };

    // Guarda el médico elegido en el selector. El backend revisa que esté libre a esa hora
    const asignarMedico = (id: number, idMedico: string) => {
        if (idMedico === "") {
            return;
        }
        cambiarCita("/api/citas/" + id + "/medico/" + idMedico);
    };

    const confirmarCita = (id: number) => {
        cambiarCita("/api/citas/" + id + "/confirmar");
    };

    // Si cancela la clínica, al cliente se le devuelve todo lo que pagó.
    // El backend sabe que cancela la clínica por el rol de quien lo pide
    const cancelarCita = (id: number, precio: number) => {
        if (!confirm("Se le devolverán $" + precio + " al cliente. ¿Seguro que quiere cancelar esta cita?")) {
            return;
        }
        cambiarCita("/api/citas/" + id + "/cancelar");
    };

    // Marca un medicamento como entregado al cliente
    const marcarEntregado = async (id: number) => {
        try {
            const respuesta = await fetch(API + "/api/compras/" + id + "/entregar?idUsuario=" + usuario?.id, { method: "PUT" });
            if (!respuesta.ok) {
                alert(await leerError(respuesta));
                return;
            }
            const pedidoNuevo: Pedido = await respuesta.json();
            setPedidos(pedidos.map((pedido) => {
                if (pedido.id === pedidoNuevo.id) {
                    // El backend no manda el correo al entregar, así que se mantiene el que ya estaba
                    return { id: pedido.id, correoCliente: pedido.correoCliente, nombreMedicamento: pedido.nombreMedicamento, cantidad: pedido.cantidad, subtotal: pedido.subtotal, entregado: true };
                }
                return pedido;
            }));
        } catch {
            alert("No se pudo conectar con el servidor");
        }
    };

    // Marca un mensaje de Contacto como ATENDIDO (cuando ya se le respondió a la persona)
    const marcarAtendido = async (id: number) => {
        try {
            const respuesta = await fetch(API + "/api/contactos/" + id + "/estado?idUsuario=" + usuario?.id, { method: "PUT" });
            if (!respuesta.ok) {
                alert(await leerError(respuesta));
                return;
            }
            const mensajeNuevo: MensajeContacto = await respuesta.json();
            setMensajes(mensajes.map((mensaje) => {
                if (mensaje.id === mensajeNuevo.id) {
                    return mensajeNuevo;
                }
                return mensaje;
            }));
        } catch {
            alert("No se pudo conectar con el servidor");
        }
    };

    // Pestaña que se está viendo (Citas, Medicamentos o Mensajes)
    const [pestana, setPestana] = useState("Citas");

    if (!puedeEntrar) {
        return (
            <div className = "container my-4">
                <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>📋 Recepción</h2>
                <p className = "text-center mt-4">Solo las recepcionistas pueden ver esta página. <a href = "/login">Iniciar sesión</a></p>
            </div>
        )
    }

    return (
        <div className = "container my-4">
            <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>📋 Recepción</h2>

            {/* Pestañas de Bootstrap: la que está elegida lleva la clase "active" */}
            <ul className = "nav nav-tabs justify-content-center mt-4">
                <li className = "nav-item">
                    <button className = {pestana === "Citas" ? "nav-link active" : "nav-link"} onClick = {() => setPestana("Citas")}>
                        Citas
                    </button>
                </li>
                <li className = "nav-item">
                    <button className = {pestana === "Medicamentos" ? "nav-link active" : "nav-link"} onClick = {() => setPestana("Medicamentos")}>
                        Retiro de medicamentos
                    </button>
                </li>
                <li className = "nav-item">
                    <button className = {pestana === "Mensajes" ? "nav-link active" : "nav-link"} onClick = {() => setPestana("Mensajes")}>
                        Mensajes
                    </button>
                </li>
            </ul>

            {pestana === "Mensajes" && (
                <>
                    <h4 className = "mt-3 mb-4 text-center" style = {{ color: "#2F3E46" }}>Mensajes del formulario de Contacto. Respóndelos por correo y márcalos como atendidos.</h4>

                    <div className = "row justify-content-center">
                        <div className = "col-12 col-lg-10">
                            <div className = "table-responsive">
                                <table className = "table table-bordered align-middle bg-white">
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Nombre</th>
                                            <th>Correo</th>
                                            <th>Mensaje</th>
                                            <th>Estado</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mensajes.map((mensaje) => (
                                            <tr key = {mensaje.id}>
                                                {/* La fecha llega como "2026-11-19T17:33:50": se cambia la T por un espacio */}
                                                <td>{mensaje.fecha.replace("T", " ")}</td>
                                                <td>{mensaje.nombre}</td>
                                                <td>{mensaje.correo}</td>
                                                <td>{mensaje.mensaje}</td>
                                                <td className = {mensaje.estado === "ATENDIDO" ? "text-success fw-bold" : ""}>{mensaje.estado === "ATENDIDO" ? "Atendido" : "Pendiente"}</td>
                                                <td>
                                                    {mensaje.estado === "ATENDIDO" ? (
                                                        <span className = "text-muted">Sin acciones</span>
                                                    ) : (
                                                        <button className = "btn btn-primary btn-sm" onClick = {() => marcarAtendido(mensaje.id)}>Marcar atendido</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {pestana === "Medicamentos" && (
                <>
                    <h4 className = "mt-3 mb-4 text-center" style = {{ color: "#2F3E46" }}>Medicamentos pagados que el cliente debe venir a retirar.</h4>

                    <div className = "row justify-content-center">
                        <div className = "col-12 col-lg-10">
                            <div className = "table-responsive">
                                <table className = "table table-bordered align-middle bg-white">
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Medicamento</th>
                                            <th>Cantidad</th>
                                            <th>Total</th>
                                            <th>Estado</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pedidos.map((pedido) => (
                                            <tr key = {pedido.id}>
                                                <td>{pedido.correoCliente}</td>
                                                <td>{pedido.nombreMedicamento}</td>
                                                <td>{pedido.cantidad}</td>
                                                <td>${pedido.subtotal}</td>
                                                <td className = {pedido.entregado ? "text-success fw-bold" : ""}>{pedido.entregado ? "Entregado" : "En espera de retiro"}</td>
                                                <td>
                                                    {pedido.entregado ? (
                                                        <span className = "text-muted">Sin acciones</span>
                                                    ) : (
                                                        <button className = "btn btn-primary btn-sm" onClick = {() => marcarEntregado(pedido.id)}>Marcar entregado</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {pestana === "Citas" && (
                <>
                    <h4 className = "mt-3 mb-4 text-center" style = {{ color: "#2F3E46" }}>Aquí llegan las citas ya pagadas. Asigna un médico veterinario para poder confirmarlas.</h4>

                    <div className = "row justify-content-center">
                        <div className = "col-12 col-lg-10">
                            <div className = "table-responsive">
                                <table className = "table table-bordered align-middle bg-white">
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Mascota</th>
                                            <th>Servicio</th>
                                            <th>Fecha</th>
                                            <th>Precio</th>
                                            <th>Médico</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {citas.map((cita) => (
                                            <tr key = {cita.id}>
                                                <td>{cita.correoCliente}</td>
                                                <td>{cita.nombreMascota}</td>
                                                <td>{cita.nombreServicio}</td>
                                                <td>{cita.fecha} {cita.hora}</td>
                                                <td>${cita.precio}</td>

                                                {/* Solo se puede elegir médico mientras la cita está pendiente */}
                                                <td>
                                                    {cita.estado === "Pendiente" ? (
                                                        <SelectMedico
                                                            valor = {cita.idMedico === null ? "" : String(cita.idMedico)}
                                                            medicos = {medicos}
                                                            alCambiar = {(idMedico) => asignarMedico(cita.id, idMedico)}
                                                        />
                                                    ) : (
                                                        cita.idMedico === null ? "No asignado" : cita.nombreMedico
                                                    )}
                                                </td>

                                                <td>{cita.estado}</td>

                                                <td>
                                                    {/* Confirmar solo aparece si está pendiente, y se activa cuando ya tiene médico */}
                                                    {cita.estado === "Pendiente" && (
                                                        <button
                                                            className = "btn btn-primary btn-sm me-2"
                                                            disabled = {cita.idMedico === null}
                                                            onClick = {() => confirmarCita(cita.id)}
                                                        >
                                                            Confirmar
                                                        </button>
                                                    )}

                                                    {/* Una cita cancelada ya no se puede volver a cancelar */}
                                                    {cita.estado !== "Cancelada" && (
                                                        <button className = "btn btn-danger btn-sm" onClick = {() => cancelarCita(cita.id, cita.precio)}>Cancelar</button>
                                                    )}

                                                    {cita.estado === "Cancelada" && (
                                                        <span className = "text-muted">Sin acciones</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Recepcionista
