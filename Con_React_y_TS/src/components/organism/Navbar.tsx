import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className = "navbar navbar-expand" style = {{ backgroundColor: "#2A9D8F" }}>
            <div className = "container">
                <div className = "row g-0 w-100 align-items-center">
                    <div className = "col-auto">
                        <span className = "navbar-brand text-white">
                            🐾 Vet San Marcos
                        </span>
                    </div>

                    <div className = "col">
                        <div className = "navbar-nav justify-content-center text-nowrap small fw-bold">
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

                    <div className = "col-auto">
                        <div className = "navbar-nav text-nowrap small">
                            <Link className = "nav-link px-2" style = {{ color: "#E0E0E0" }} to = "/Usuario">
                                Mis Citas
                            </Link>

                            <Link className = "nav-link px-2" style = {{ color: "#E0E0E0" }} to = "/Login">
                                Iniciar Sesión
                            </Link>

                            <Link className = "nav-link px-2" style = {{ color: "#E0E0E0" }} to = "/Registro">
                                Registrarse
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
