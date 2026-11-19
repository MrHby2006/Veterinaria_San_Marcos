import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BotonVolverMed from "../atoms/BotonVolverMed";
import BotonAddCarro from "../atoms/BotonAddCarro";
import type { Medicamento } from "../molecules/CardMedicamento";
import { API } from "../../data/api";

function DetalleMedicamento() {
    const { id } = useParams()

    // Medicamento que llega del backend (null = todavía no llega o no existe)
    const [medicamento, setMedicamento] = useState<Medicamento | null>(null);

    // true mientras se espera la respuesta del backend
    const [cargando, setCargando] = useState(true);

    // Pide al backend solo el medicamento de la URL (ej: /medicamento/3)
    useEffect(() => {
        fetch(API + "/api/medicamentos/" + id)
            .then((respuesta) => {
                // 404 = no existe ese id: se muestra "Medicamento no encontrado"
                if (respuesta.status === 404) {
                    return null;
                }
                if (!respuesta.ok) {
                    throw new Error("Error al consultar el medicamento");
                }
                return respuesta.json();
            })
            .then((datos) => setMedicamento(datos))
            .catch(() => alert("No se pudo cargar el medicamento"))
            .finally(() => setCargando(false));
    }, [id]);

    if (cargando) {
        return (
            <div className = "container my-4">
                <p className = "text-center fs-5">Cargando...</p>
            </div>
        )
    }

    // Si el id no existe (ej: /medicamento/99), mostramos un mensaje
    if (!medicamento) {
        return (
            <div className = "container my-4">
                <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>Medicamento no encontrado</h2>

                <div className = "mt-4 text-center">
                    <BotonVolverMed />
                </div>
            </div>
        )
    }

    return (
        <div className = "container my-4">
            <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>Detalle del Medicamento</h2>

            <section className = "row align-items-center g-4 mt-2 p-4 rounded text-white text-start" style = {{ backgroundColor: "#2A9D8F" }}>
                <div className = "col-12 col-md-5">
                    <div className = "bg-white rounded p-3">
                        <img
                            src = {medicamento.imagen}
                            alt = {medicamento.nombreComercial}
                            className = "img-fluid w-100"
                            style = {{ height: '300px', objectFit: 'contain' }}
                        />
                    </div>
                </div>

                <div className = "col-12 col-md-7">
                    <h3 className = "fw-bold">{medicamento.nombreComercial}</h3>

                    <p className = "fs-5 mb-1">Categoría: {medicamento.categoria}</p>

                    <p className = "fs-5 mb-1">Principio activo: {medicamento.principioActivo}</p>

                    <p className = "fs-5 mb-1">Presentación: {medicamento.presentacion}</p>

                    {/* Junta los nombres de las especies, ej: "Perro / Gato" */}
                    <p className = "fs-5 mb-1">Especie: {medicamento.especies.map((especie) => especie.nombre).join(" / ")}</p>

                    <p className = "fs-5 mb-1">Stock actual: {medicamento.stockActual}</p>

                    <p className = "fs-3 fw-bold mt-3">Precio: ${medicamento.precioUnitario}</p>

                    <div className = "d-flex flex-wrap gap-3 mt-3">
                        <BotonAddCarro idMedicamento = {medicamento.id} />
                        <BotonVolverMed />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DetalleMedicamento
