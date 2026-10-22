import { useState } from "react";
import { Link } from "react-router-dom";

function Admin_servicios() {
    // Estado con los servicios y sus precios (sin base de datos, se reinicia al recargar)
    const [servicios, setServicios] = useState([
        { id: 1, nombre: "Consulta general", precio: 15000 },
        { id: 2, nombre: "Consulta de urgencia", precio: 25000 },
        { id: 3, nombre: "Control post-operatorio", precio: 10000 },
        { id: 4, nombre: "Consulta ave o conejo", precio: 18000 },
        { id: 5, nombre: "Segunda opinión médica", precio: 20000 },
        { id: 6, nombre: "Vacuna antirrábica canina", precio: 12000 },
        { id: 7, nombre: "Vacuna sextuple canina", precio: 18000 },
        { id: 8, nombre: "Vacuna bivalente felina", precio: 15000 },
        { id: 9, nombre: "Vacuna triple felina", precio: 17000 },
        { id: 10, nombre: "Vacuna Bordetella canina", precio: 14000 },
        { id: 11, nombre: "Vacuna antirrábica felina", precio: 12000 },
        { id: 12, nombre: "Esterilización hembra canina", precio: 80000 },
        { id: 13, nombre: "Esterilización macho canino", precio: 60000 },
        { id: 14, nombre: "Esterilización hembra felina", precio: 65000 },
        { id: 15, nombre: "Esterilización macho felino", precio: 50000 },
        { id: 16, nombre: "Extirpación de tumor cutáneo", precio: 120000 },
        { id: 17, nombre: "Cesárea de urgencia", precio: 180000 },
        { id: 18, nombre: "Desparasitación interna (menos de 10kg)", precio: 8000 },
        { id: 19, nombre: "Desparasitación interna (10 a 25kg)", precio: 9500 },
        { id: 20, nombre: "Desparasitación interna (más de 25kg)", precio: 11000 },
        { id: 21, nombre: "Desparasitación interna felina", precio: 8000 },
        { id: 22, nombre: "Antiparasitario externo (pipeta)", precio: 7500 },
        { id: 23, nombre: "Hemograma completo", precio: 22000 },
        { id: 24, nombre: "Perfil bioquímico completo", precio: 35000 },
        { id: 25, nombre: "Radiografía (1 proyección)", precio: 28000 },
        { id: 26, nombre: "Ecografía abdominal", precio: 45000 },
        { id: 27, nombre: "Test de leishmaniasis", precio: 18000 },
        { id: 28, nombre: "Corte de uñas", precio: 5000 },
        { id: 29, nombre: "Limpieza dental", precio: 55000 },
        { id: 30, nombre: "Microchip de identificación", precio: 15000 },
        { id: 31, nombre: "Hospitalización (por día)", precio: 30000 },
    ]);

    // Estado con los medicamentos y sus precios
    const [medicamentos, setMedicamentos] = useState([
        { id: 1, nombre: "Amoxibay 250mg", precio: 4200 },
        { id: 2, nombre: "Enrox 50mg", precio: 6800 },
        { id: 3, nombre: "Metrobay 250mg", precio: 3900 },
        { id: 4, nombre: "Nexgard", precio: 9500 },
        { id: 5, nombre: "Bravecto", precio: 18900 },
        { id: 6, nombre: "Revolution Plus", precio: 14500 },
        { id: 7, nombre: "Drontal Plus", precio: 3200 },
        { id: 8, nombre: "Milbemax Gato", precio: 6800 },
        { id: 9, nombre: "Meloxicam 1mg", precio: 4500 },
        { id: 10, nombre: "Carprofen 50mg", precio: 9800 },
        { id: 11, nombre: "Clorhexidina Shampoo", precio: 8900 },
        { id: 12, nombre: "Malaseb Shampoo", precio: 12500 },
        { id: 13, nombre: "Apoquel 16mg", precio: 22000 },
        { id: 14, nombre: "Probifor", precio: 5600 },
        { id: 15, nombre: "Omeprazol 10mg vet", precio: 3800 },
        { id: 16, nombre: "Vetmedin 2.5mg", precio: 28000 },
        { id: 17, nombre: "Tramadol 50mg vet", precio: 5200 },
        { id: 18, nombre: "Nobivac DHPPi", precio: 8500 },
        { id: 19, nombre: "Nobivac Rabies", precio: 5800 },
        { id: 20, nombre: "Felocell CVR", precio: 7200 },
        { id: 21, nombre: "Omega vet 3-6-9", precio: 9900 },
        { id: 22, nombre: "Condrovet forte", precio: 14500 },
    ]);

    // Qué lista se está mostrando en la tabla (Servicios o Medicamentos)
    const [tipo, setTipo] = useState("Servicios");

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

    // Valida el precio al apretar "Guardar"
    const guardarPrecio = (precio: number) => {
        if (precio <= 0) {
            alert("El precio debe ser mayor a 0");
            return;
        }
        alert("Precio actualizado");
    };

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
                                            <button className = "btn btn-primary btn-sm" onClick = {() => guardarPrecio(item.precio)}>Guardar</button>
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
