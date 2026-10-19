interface BotonEliminarCarritoProps {
    alEliminar: () => void; // Recibe la función que quita el producto del carrito
}

// Es un button y no un Link porque no cambia de página, solo quita el producto de la tabla
function BotonEliminarCarrito({alEliminar}: BotonEliminarCarritoProps) {
    return (
        <button
            type = "button"
            className = "btn btn-primary"
            onClick = {alEliminar}
        >
            <img src = "/img/Iconos/Basurero.jpg" alt = "basurero" style = {{ width: "24px" }} />
        </button>
    )
}

export default BotonEliminarCarrito
