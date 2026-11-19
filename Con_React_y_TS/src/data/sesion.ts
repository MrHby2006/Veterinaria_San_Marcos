// Datos del usuario que inicio sesion (los devuelve el backend en el login)
export interface UsuarioSesion {
    id: number;
    nombre: string;
    correo: string;
    rol: string; // Cliente, Recepcionista o Administrador
}

// Como no usamos JWT, el usuario se guarda en localStorage al iniciar sesion.
// Asi la pagina sabe quien es (su id) y que puede ver (su rol).

export function guardarUsuario(usuario: UsuarioSesion) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
}

// Devuelve null si nadie ha iniciado sesion
export function obtenerUsuario(): UsuarioSesion | null {
    const texto = localStorage.getItem("usuario");
    if (texto === null) {
        return null;
    }
    return JSON.parse(texto);
}

export function cerrarSesion() {
    localStorage.removeItem("usuario");
}
