import { Link } from "react-router-dom";
import { obtenerUsuario, cerrarSesion } from "../../data/sesion";

function NavBar() {
    // Quién inició sesión (null si nadie)
    const usuario = obtenerUsuario();

    // Borra la sesión y vuelve al inicio (se recarga para que el Navbar cambie)
    const salir = () => {
        cerrarSesion();
        window.location.href = "/";
    };

    return (
        <nav className = "navbar navbar-expand" style = {{ backgroundColor: "#2A9D8F" }}>
            <div className = "container">
                <div className = "row g-0 w-100 align-items-center">
                    <div className = "col-12 col-lg-auto text-center">
                        <span className = "navbar-brand text-white">
                            🐾 Vet San Marcos
                        </span>
                    </div>

                    <div className = "col-12 col-lg">
                        <div className = "navbar-nav flex-wrap justify-content-center text-nowrap small fw-bold">
                            <Link className = "nav-link text-white px-2" to = "/">
                                Inicio
                            </Link>

                            <Link className = "nav-link text-white px-2" to = "/nosotros">
                                Nosotros
                            </Link>

                            <Link className = "nav-link text-white px-2" to = "/servicios">
                                Servicios
                            </Link>

                            <Link className = "nav-link text-white px-2" to = "/medicamentos">
                                Medicamentos
                            </Link>

                            <Link className = "nav-link text-white px-2" to = "/consejos">
                                Consejos
                            </Link>

                            <Link className = "nav-link text-white px-2" to = "/contacto">
                                Contacto
                            </Link>
                        </div>
                    </div>

                    <div className = "col-12 col-lg-auto">
                        <div className = "navbar-nav flex-wrap justify-content-center text-nowrap small align-items-center">

                            {/* Cada rol ve sus propias opciones */}
                            {usuario !== null && usuario.rol === "Cliente" && (
                                <Link className = "nav-link px-2" style = {{ color: "#E0E0E0" }} to = "/citas">
                                    Mis Citas
                                </Link>
                            )}

                            {usuario !== null && (usuario.rol === "Recepcionista" || usuario.rol === "Administrador") && (
                                <Link className = "nav-link px-2" style = {{ color: "#E0E0E0" }} to = "/recepcionista">
                                    Recepción
                                </Link>
                            )}

                            {usuario !== null && usuario.rol === "Administrador" && (
                                <Link className = "nav-link px-2" style = {{ color: "#E0E0E0" }} to = "/admin">
                                    Admin
                                </Link>
                            )}

                            {/* Sin sesión: iniciar sesión o registrarse */}
                            {usuario === null && (
                                <>
                                    <Link className = "nav-link px-2" style = {{ color: "#E0E0E0" }} to = "/login">
                                        Iniciar Sesión
                                    </Link>

                                    <Link className = "nav-link px-2" style = {{ color: "#E0E0E0" }} to = "/registro">
                                        Registrarse
                                    </Link>
                                </>
                            )}

                            {/* Con sesión: su nombre y el botón para salir */}
                            {usuario !== null && (
                                <>
                                    <span className = "nav-link px-2 text-white">
                                        Hola, {usuario.nombre}
                                    </span>

                                    <button type = "button" className = "nav-link px-2 btn btn-link" style = {{ color: "#E0E0E0" }} onClick = {salir}>
                                        Cerrar sesión
                                    </button>
                                </>
                            )}

                            {(usuario === null || usuario.rol === "Cliente") && (
                                <Link className = "nav-link px-2" style = {{ color: "#E0E0E0" }} to = "/carrito">
                                    <img src = "/img/Iconos/IconoCarritoNav.svg" alt = "Carrito" style = {{ width: "34px" }} />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
