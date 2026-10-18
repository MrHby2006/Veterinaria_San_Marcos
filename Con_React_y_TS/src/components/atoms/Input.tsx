interface InputProps {
    tipo: string;
    nombre: string;
    valor: string; // Valor actual del campo
    alCambiar: (valor: string) => void; // Función para actualizar el valor
}

function Input({tipo, nombre, valor, alCambiar}: InputProps) {
    return (
        <input
            type = {tipo}
            name = {nombre}
            id = {nombre}
            className = "form-control"

            // Muestra el valor guardado
            value = {valor}

            // Detecta cuando el usuario escribe
            onChange = {(e) => alCambiar(e.target.value)}
        />
    )
}

export default Input
