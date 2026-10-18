import { Link } from "react-router-dom";

// Por ahora lleva al inicio. Cuando exista el carrito, 
// llevara a la página de /carrito para mostrar los productos en el
function BotonAddCarro() {
    return (
        <Link
            to = {`/carrito`}
            className = "btn btn-primary"
        >
            Añadir al Carrito
        </Link>
    )
}

export default BotonAddCarro