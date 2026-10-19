import { Link } from "react-router-dom";

function NavBar() {
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
                            <Link className = "nav-link px-2" style = {{ color: "#E0E0E0" }} to = "/citas">
                                Mis Citas
                            </Link>

                            <Link className = "nav-link px-2" style = {{ color: "#E0E0E0" }} to = "/login">
                                Iniciar Sesión
                            </Link>

                            <Link className = "nav-link px-2" style = {{ color: "#E0E0E0" }} to = "/registro">
                                Registrarse
                            </Link>

                            <Link className = "nav-link px-2" style = {{ color: "#E0E0E0" }} to = "/carrito">
                                <img src = "/img/Iconos/IconoCarritoNav.svg" alt = "Carrito" style = {{ width: "34px" }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
