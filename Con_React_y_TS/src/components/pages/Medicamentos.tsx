import { useEffect, useState } from "react";
import CardMedicamento from "../molecules/CardMedicamento";
import type { Medicamento } from "../molecules/CardMedicamento";
import FiltroEspecie from "../molecules/FiltroEspecie";
import CampoFormulario from "../molecules/CampoFormulario";
import { API } from "../../data/api";

function Medicamentos() {

    // Medicamentos que llegan del backend (microservicio catalogo)
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

    // Estados para guardar la especie elegida y lo que se escribe en el buscador
    const [especie, setEspecie] = useState("Todas");
    const [busqueda, setBusqueda] = useState("");

    // Consulta los medicamentos al abrir la página
    useEffect(() => {
        fetch(API + "/api/medicamentos")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al consultar los medicamentos");
                }
                return respuesta.json();
            })
            .then((datos) => setMedicamentos(datos))
            .catch(() => alert("No se pudieron cargar los medicamentos"));
    }, []);

    // Decide si una tarjeta se muestra (true) o se esconde (false)
    const mostrar = (especieMedicamento: string, nombre: string) => {

        // Si se eligió una especie y el medicamento no es para ella, se esconde
        if (especie !== "Todas" && !especieMedicamento.includes(especie)) {
            return false;
        }
        // Si el nombre no contiene lo escrito en el buscador, se esconde
        // (toLowerCase pasa todo a minúsculas para que no importen las mayúsculas)
        if (!nombre.toLowerCase().includes(busqueda.toLowerCase())) {
            return false;
        }
        return true;
    };

    // Junta los nombres de las especies en un texto, ej: "Perro / Gato"
    const textoEspecies = (medicamento: Medicamento) => {
        return medicamento.especies.map((especieMed) => especieMed.nombre).join(" / ");
    };

    // Solo los medicamentos que pasan los filtros
    const medicamentosFiltrados = medicamentos.filter((medicamento) => mostrar(textoEspecies(medicamento), medicamento.nombreComercial));

    return (
        <div className = "container my-4">
            <h1 className = "fs-2 fw-bold text-center" style = {{ color: "#2F3E46" }}>Medicamentos y Vacunas</h1>

            {/* Filtros: en celular uno debajo del otro, en pantallas medianas lado a lado */}
            <div className = "row justify-content-center text-start mt-3">
                <div className = "col-12 col-md-4">
                    <FiltroEspecie
                        valor = {especie}
                        alCambiar = {setEspecie}
                    />
                </div>

                <div className = "col-12 col-md-4">
                    <CampoFormulario
                        etiqueta = "Buscar por nombre"
                        tipo = "text"
                        nombre = "busqueda"
                        valor = {busqueda}
                        alCambiar = {setBusqueda}
                    />
                </div>
            </div>

            <div className = "row g-3 mt-4">
                {/* Una tarjeta por cada medicamento que llegó del backend */}
                {medicamentosFiltrados.map((medicamento) => (
                    <div className = "col-12 col-md-6 col-lg-4" key = {medicamento.id}>
                        <CardMedicamento
                            id = {medicamento.id}
                            categoria = {medicamento.categoria}
                            nombre_comercial = {medicamento.nombreComercial}
                            principio_activo = {medicamento.principioActivo}
                            presentacion = {medicamento.presentacion}
                            especie = {textoEspecies(medicamento)}
                            stock_actual = {medicamento.stockActual}
                            precio_unitario = {medicamento.precioUnitario}
                            imagen = {medicamento.imagen}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Medicamentos
