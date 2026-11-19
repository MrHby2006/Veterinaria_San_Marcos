import { useEffect, useState } from "react";
import { API } from "../../data/api";

// Datos de cada especie que manda el microservicio catalogo
interface Especie {
    id: number;
    nombre: string;
}

interface SelectEspecieProps {
    valor: string; // Id de la especie elegida ("" = ninguna)
    alCambiar: (valor: string) => void; // Función para actualizar la especie
}

function SelectEspecie({valor, alCambiar}: SelectEspecieProps) {
    const [especies, setEspecies] = useState<Especie[]>([]);

    // Consulta las especies al backend cuando aparece el select
    useEffect(() => {
        fetch(API + "/api/especies")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al consultar las especies");
                }
                return respuesta.json();
            })
            .then((datos) => setEspecies(datos))
            .catch(() => alert("No se pudieron cargar las especies"));
    }, []);

    return (
        <div className = "mb-3">
            <label className = "form-label fw-bold" htmlFor = "especie">
                Especie
            </label>

            <select
                id = "especie"
                className = "form-select"
                value = {valor}
                onChange = {(e) => alCambiar(e.target.value)}
            >
                <option value = "">Seleccione una especie</option>
                {especies.map((especie) => (
                    <option key = {especie.id} value = {especie.id}>{especie.nombre}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectEspecie
