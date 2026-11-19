// Direccion del api-gateway. Todas las peticiones del front pasan por aqui,
// y el gateway las manda al microservicio que corresponde.
export const API = "http://localhost:8080";

// Lee el mensaje de error que manda el backend
// (ej: "Ya existe una cuenta con ese correo") para mostrarlo en un alert
export async function leerError(respuesta: Response) {
    try {
        const datos = await respuesta.json();
        if (datos.message) {
            return datos.message;
        }
    } catch {
        // La respuesta no traia JSON
    }
    return "Error HTTP " + respuesta.status;
}
