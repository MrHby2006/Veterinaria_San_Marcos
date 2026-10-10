import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className = "navbar navbar-expand bg-dark">
            <div className = "container">
                <span className = "navbar-brand text-white">
                    🐾 Veterinaria San Marcos
                </span>

                <div className = "navbar-nav">
                    <Link className = "nav-link text-white" to = "/">
                        Inicio
                    </Link>

                    <Link className = "nav-link text-white" to = "/nosotros">
                        Nosotros
                    </Link>

                    <Link className = "nav-link text-white" to = "/servicios">
                        Servicios
                    </Link>

                    <Link className = "nav-link text-white" to = "/consejos">
                        Consejos
                    </Link>

                    <Link className = "nav-link text-white" to = "/contacto">
                        Contacto
                    </Link>

                    <Link className = "nav-link text-white" to = "/medicamentos">
                        Medicamentos
                    </Link>
                </div>

                <div className = "navbar-nav">
                    <Link className = "nav-link text-white" to = "/Usuario">
                        Mis Citas
                    </Link>

                    <Link className = "nav-link text-white" to = "/Login">
                        Iniciar Sesión
                    </Link>

                    <Link className = "nav-link text-white" to = "/Registro">
                        Registrarse
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar