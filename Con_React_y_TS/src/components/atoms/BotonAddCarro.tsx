import { API, leerError } from "../../data/api";
import { obtenerUsuario } from "../../data/sesion";

interface BotonAddCarroProps {
    idMedicamento: number; // Medicamento que se agrega al carrito
}

// Agrega 1 unidad del medicamento al carrito del cliente.
// Si ya estaba en el carrito, el backend le suma 1 a la cantidad.
function BotonAddCarro({idMedicamento}: BotonAddCarroProps) {
    const agregarAlCarrito = async () => {
        const usuario = obtenerUsuario();
        if (usuario === null) {
            alert("Debe iniciar sesión para comprar");
            return;
        }

        try {
            // No se manda el precio: el backend lo copia desde catalogo
            const respuesta = await fetch(API + "/api/compras", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idUsuario: usuario.id,
                    idMedicamento: idMedicamento,
                    cantidad: 1,
                }),
            });

            if (!respuesta.ok) {
                alert(await leerError(respuesta));
                return;
            }

            alert("Medicamento agregado con éxito al carrito");
        } catch {
            alert("No se pudo conectar con el servidor");
        }
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
