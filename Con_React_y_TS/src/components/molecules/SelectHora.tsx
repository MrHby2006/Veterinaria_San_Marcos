interface SelectHoraProps {
    valor: string; // Hora elegida ("" = ninguna)
    alCambiar: (valor: string) => void; // Función para actualizar la hora
}

// Horas que se pueden reservar: en punto o a la media hora.
// El formulario y el backend revisan después el horario de cada día (ej: los sábados)
const horas = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00",
    "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00",
];

function SelectHora({valor, alCambiar}: SelectHoraProps) {
    return (
        <div className = "mb-3">
            <label className = "form-label fw-bold" htmlFor = "hora">
                Hora
            </label>

            <select
                id = "hora"
                className = "form-select"
                value = {valor}
                onChange = {(e) => alCambiar(e.target.value)}
            >
                <option value = "">Seleccione una hora</option>
                {horas.map((hora) => (
                    <option key = {hora} value = {hora}>{hora}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectHora
