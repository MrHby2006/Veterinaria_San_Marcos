interface FiltroEspecieProps {
    valor: string; // Especie elegida
    alCambiar: (valor: string) => void; // Función para actualizar la especie
}

function FiltroEspecie({valor, alCambiar}: FiltroEspecieProps) {
    return (
        <div className = "mb-3">
            <label className = "form-label fw-bold" htmlFor = "filtroEspecie">
                Filtrar por especie
            </label>

            <select
                id = "filtroEspecie"
                className = "form-select"
                value = {valor}
                onChange = {(e) => alCambiar(e.target.value)}
            >
                <option value = "Todas">Todas</option>
                <option value = "Perro">Perro</option>
                <option value = "Gato">Gato</option>
            </select>
        </div>
    )
}

export default FiltroEspecie
