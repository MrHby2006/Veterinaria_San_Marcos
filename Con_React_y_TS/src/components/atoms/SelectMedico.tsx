interface SelectMedicoProps {
    valor: string; // Médico elegido ("" = no asignado)
    alCambiar: (valor: string) => void; // Función para actualizar el médico
}

function SelectMedico({valor, alCambiar}: SelectMedicoProps) {
    return (
        <select
            className = "form-select form-select-sm"
            aria-label = "Médico veterinario"
            value = {valor}
            onChange = {(e) => alCambiar(e.target.value)}
        >
            <option value = "">No asignado</option>
            <option value = "Dra. Camila Rojas">Dra. Camila Rojas</option>
            <option value = "Dr. Felipe Soto">Dr. Felipe Soto</option>
            <option value = "Dra. Valentina Muñoz">Dra. Valentina Muñoz</option>
            <option value = "Dr. Andrés Pérez">Dr. Andrés Pérez</option>
        </select>
    )
}

export default SelectMedico
