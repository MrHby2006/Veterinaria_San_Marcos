interface SelectTipoUsuarioProps {
    valor: string; // Tipo de usuario elegido
    alCambiar: (valor: string) => void; // Función para actualizar el tipo
}

function SelectTipoUsuario({valor, alCambiar}: SelectTipoUsuarioProps) {
    return (
        <div className = "mb-3">
            <label className = "form-label fw-bold" htmlFor = "tipo">
                Tipo de usuario
            </label>

            <select
                id = "tipo"
                className = "form-select"
                value = {valor}
                onChange = {(e) => alCambiar(e.target.value)}
            >
                <option value = "Cliente">Cliente</option>
                <option value = "Recepcionista">Recepcionista</option>
                <option value = "Administrador">Administrador</option>
            </select>
        </div>
    )
}

export default SelectTipoUsuario
