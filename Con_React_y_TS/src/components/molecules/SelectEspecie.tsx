interface SelectEspecieProps {
    valor: string; // Especie elegida
    alCambiar: (valor: string) => void; // Función para actualizar la especie
}

function SelectEspecie({valor, alCambiar}: SelectEspecieProps) {
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
                <option value = "Perro">Perro</option>
                <option value = "Gato">Gato</option>
                <option value = "Conejo">Conejo</option>
                <option value = "Ave">Ave</option>
            </select>
        </div>
    )
}

export default SelectEspecie
