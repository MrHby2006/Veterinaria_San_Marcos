interface FiltroCategoriaProps {
    valor: string; // Categoría elegida
    alCambiar: (valor: string) => void; // Función para actualizar la categoría
}

function FiltroCategoria({valor, alCambiar}: FiltroCategoriaProps) {
    return (
        <div className = "mb-3">
            <label className = "form-label fw-bold" htmlFor = "filtroCategoria">
                Filtrar por categoría
            </label>

            <select
                id = "filtroCategoria"
                className = "form-select"
                value = {valor}
                onChange = {(e) => alCambiar(e.target.value)}
            >
                <option value = "Todas">Todas</option>
                <option value = "Consultas">Consultas</option>
                <option value = "Vacunación">Vacunación</option>
                <option value = "Cirugía">Cirugía</option>
                <option value = "Desparasitación">Desparasitación</option>
                <option value = "Exámenes">Exámenes</option>
                <option value = "Otros">Otros</option>
            </select>
        </div>
    )
}

export default FiltroCategoria
