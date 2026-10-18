import { Link } from "react-router-dom";

// Por ahora lleva al inicio. Cuando exista el carrito, 
// llevara a la página de /carrito para mostrar los productos en el
function BotonEliminarCarrito() {
    return (
        <Link
            className = "btn btn-primary"
        >
            <img src="/img/Iconos/Basurero.jpg" alt="basurero" />
        </Link>
    )
}

export default BotonEliminarCarrito