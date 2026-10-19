// Por ahora solo muestra un mensaje, igual que el formulario de contacto.
// Todavia no guarda el medicamento en la pagina de /carrito
function BotonAddCarro() {
    const agregarAlCarrito = () => {
        alert("Medicamento agregado con éxito al carrito");
    };

    return (
        <button
            type = "button"
            className = "btn btn-primary"
            onClick = {agregarAlCarrito}
        >
            Añadir al Carrito
        </button>
    )
}

export default BotonAddCarro
