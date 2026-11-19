// Datos de cada médico que manda el microservicio citas
export interface Medico {
    id: number;
    nombre: string;
    apellido: string;
}

interface SelectMedicoProps {
    valor: string; // Id del médico elegido ("" = no asignado)
    medicos: Medico[]; // Médicos activos que vienen del backend
    alCambiar: (valor: string) => void; // Función para guardar el médico
}

function SelectMedico({valor, medicos, alCambiar}: SelectMedicoProps) {
    return (
        <select
            className = "form-select form-select-sm"
            aria-label = "Médico veterinario"
            value = {valor}
            onChange = {(e) => alCambiar(e.target.value)}
        >
            <option value = "">No asignado</option>
            {medicos.map((medico) => (
                <option key = {medico.id} value = {medico.id}>{medico.nombre} {medico.apellido}</option>
            ))}
        </select>
    )
}

export default SelectMedico
