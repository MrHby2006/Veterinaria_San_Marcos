import { useEffect, useState } from "react";
import CardServicio from "../molecules/CardServicio";
import type { Servicio } from "../molecules/CardServicio";
import FiltroCategoria from "../molecules/FiltroCategoria";
import CampoFormulario from "../molecules/CampoFormulario";
import { API } from "../../data/api";

function Servicios() {

    // Servicios que llegan del backend (microservicio catalogo)
    const [servicios, setServicios] = useState<Servicio[]>([]);

    // Estados para guardar la categoría elegida y lo que se escribe en el buscador
    const [categoria, setCategoria] = useState("Todas");
    const [busqueda, setBusqueda] = useState("");

    // Consulta los servicios al abrir la página
    useEffect(() => {
        fetch(API + "/api/servicios")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al consultar los servicios");
                }
                return respuesta.json();
            })
            .then((datos) => setServicios(datos))
            .catch(() => alert("No se pudieron cargar los servicios"));
    }, []);

    // Decide si una tarjeta se muestra (true) o se esconde (false)
    const mostrar = (categoriaServicio: string, nombre: string) => {

        // Si se eligió una categoría y el servicio no es de esa categoría, se esconde
        if (categoria !== "Todas" && categoriaServicio !== categoria) {
            return false;
        }
        // Si el nombre no contiene lo escrito en el buscador, se esconde
        // (toLowerCase pasa todo a minúsculas para que no importen las mayúsculas)
        if (!nombre.toLowerCase().includes(busqueda.toLowerCase())) {
            return false;
        }
        return true;
    };

    // Solo los servicios que pasan los filtros
    const serviciosFiltrados = servicios.filter((servicio) => mostrar(servicio.categoria, servicio.nombre));

    return (
        <div className = "container my-4">
            <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46" }}>Nuestros servicios</h2>
            <p className = "text-center" style = {{ color: "#2F3E46" }}>Elige un servicio y reserva tu hora. Debes estar registrado.</p>

            {/* Filtros: en celular uno debajo del otro, en pantallas medianas lado a lado */}
            <div className = "row justify-content-center text-start mt-3">
                <div className = "col-12 col-md-4">
                    <FiltroCategoria
                        valor = {categoria}
                        alCambiar = {setCategoria}
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
                {/* Una tarjeta por cada servicio que llegó del backend */}
                {serviciosFiltrados.map((servicio) => (
                    <div className = "col-12 col-md-6 col-lg-4" key = {servicio.id}>
                        <CardServicio
                            nombre = {servicio.nombre}
                            categoria = {servicio.categoria}
                            descripcion = {servicio.descripcion}
                            precio = {servicio.precio}
                            imagen = {servicio.imagen}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Servicios
