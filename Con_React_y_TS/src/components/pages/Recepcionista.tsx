import { useState } from "react";
import SelectMedico from "../atoms/SelectMedico";

function Recepcionista() {
    // Estado con las citas que pidieron los clientes (sin base de datos, se reinicia al recargar)
    // medico "" significa que todavía no se le asigna un médico
    const [citas, setCitas] = useState([
        { id: 1, cliente: "cliente@sanmarcos.cl", servicio: "Consulta general", precio: 15000, estado: "Pendiente", medico: "", pago: "Pagado" },
        { id: 2, cliente: "maria@correo.cl", servicio: "Vacuna triple felina", precio: 17000, estado: "Pendiente", medico: "", pago: "Pagado" },
        { id: 3, cliente: "juan@correo.cl", servicio: "Limpieza dental", precio: 55000, estado: "Confirmada", medico: "Dr. Felipe Soto", pago: "Pagado" },
        { id: 4, cliente: "pedro@correo.cl", servicio: "Corte de uñas", precio: 5000, estado: "Pendiente", medico: "", pago: "Por pagar" },
    ]);

    // La recepcionista solo ve las citas que el cliente ya pagó
    const citasPagadas = citas.filter((cita) => cita.pago === "Pagado");

    // Guarda el médico elegido en el selector de una cita
    const asignarMedico = (id: number, nuevoMedico: string) => {
        setCitas(citas.map((cita) => {
            if (cita.id === id) {
                return { id: cita.id, cliente: cita.cliente, servicio: cita.servicio, precio: cita.precio, estado: cita.estado, medico: nuevoMedico, pago: cita.pago };
            }
            return cita;
        }));
    };

    // Cambia el estado de una cita (Confirmada o Cancelada)
    const cambiarEstado = (id: number, nuevoEstado: string) => {
        setCitas(citas.map((cita) => {
            if (cita.id === id) {
                return { id: cita.id, cliente: cita.cliente, servicio: cita.servicio, precio: cita.precio, estado: nuevoEstado, medico: cita.medico, pago: cita.pago };
            }
            return cita;
        }));
    };

    // Estado con los medicamentos que compraron los clientes en el carrito
    // retiro = si el cliente ya vino a buscarlo (En espera de retiro o Entregado)
    const [pedidos, setPedidos] = useState([
        { id: 1, cliente: "cliente@sanmarcos.cl", medicamento: "Amoxibay 250mg", precio: 4200, pago: "Pagado", retiro: "En espera de retiro" },
        { id: 2, cliente: "maria@correo.cl", medicamento: "Nexgard", precio: 9500, pago: "Pagado", retiro: "En espera de retiro" },
        { id: 3, cliente: "juan@correo.cl", medicamento: "Apoquel 16mg", precio: 22000, pago: "Pagado", retiro: "Entregado" },
        { id: 4, cliente: "pedro@correo.cl", medicamento: "Bravecto", precio: 18900, pago: "Por pagar", retiro: "En espera de retiro" },
    ]);

    // Igual que las citas, solo se ven los medicamentos que ya se pagaron
    const pedidosPagados = pedidos.filter((pedido) => pedido.pago === "Pagado");

    // Marca un medicamento como entregado al cliente
    // (con una base de datos, aquí también se quitaría del carrito del cliente)
    const marcarEntregado = (id: number) => {
        setPedidos(pedidos.map((pedido) => {
            if (pedido.id === id) {
                return { id: pedido.id, cliente: pedido.cliente, medicamento: pedido.medicamento, precio: pedido.precio, pago: pedido.pago, retiro: "Entregado" };
            }
            return pedido;
        }));
    };

    // Pestaña que se está viendo (Citas o Medicamentos)
    const [pestana, setPestana] = useState("Citas");

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
            </ul>

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
                                            <th>Precio</th>
                                            <th>Estado</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pedidosPagados.map((pedido) => (
                                            <tr key = {pedido.id}>
                                                <td>{pedido.cliente}</td>
                                                <td>{pedido.medicamento}</td>
                                                <td>${pedido.precio}</td>
                                                <td className = {pedido.retiro === "Entregado" ? "text-success fw-bold" : ""}>{pedido.retiro}</td>
                                                <td>
                                                    {pedido.retiro === "En espera de retiro" ? (
                                                        <button className = "btn btn-primary btn-sm" onClick = {() => marcarEntregado(pedido.id)}>Marcar entregado</button>
                                                    ) : (
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
                                            <th>Servicio</th>
                                            <th>Precio</th>
                                            <th>Médico</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {citasPagadas.map((cita) => (
                                            <tr key = {cita.id}>
                                                <td>{cita.cliente}</td>
                                                <td>{cita.servicio}</td>
                                                <td>${cita.precio}</td>

                                                {/* Solo se puede elegir médico mientras la cita está pendiente */}
                                                <td>
                                                    {cita.estado === "Pendiente" ? (
                                                        <SelectMedico
                                                            valor = {cita.medico}
                                                            alCambiar = {(medico) => asignarMedico(cita.id, medico)}
                                                        />
                                                    ) : (
                                                        cita.medico === "" ? "No asignado" : cita.medico
                                                    )}
                                                </td>

                                                <td>{cita.estado}</td>

                                                <td>
                                                    {/* Confirmar solo aparece si está pendiente, y se activa cuando ya tiene médico */}
                                                    {cita.estado === "Pendiente" && (
                                                        <button
                                                            className = "btn btn-primary btn-sm me-2"
                                                            disabled = {cita.medico === ""}
                                                            onClick = {() => cambiarEstado(cita.id, "Confirmada")}
                                                        >
                                                            Confirmar
                                                        </button>
                                                    )}

                                                    {/* Una cita cancelada ya no se puede volver a cancelar */}
                                                    {cita.estado !== "Cancelada" && (
                                                        <button className = "btn btn-danger btn-sm" onClick = {() => cambiarEstado(cita.id, "Cancelada")}>Cancelar</button>
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
