import { Link } from "react-router-dom";

function Admin() {
    return (
        <div className = "container my-4">
            <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>⚙️ Panel de administración</h2>

            <h4 className = "mt-3 mb-4 text-center" style = {{ color: "#2F3E46" }}>Desde aquí puedes administrar los servicios y los usuarios del sitio.</h4>

            <div className = "row justify-content-center g-4">

                {/* Tarjeta para ir al mantenedor de servicios */}
                <div className = "col-12 col-md-6 col-lg-4">
                    <div className = "card shadow-sm h-100 p-4 text-center">
                        <h3>Precios</h3>
                        <p>Edita los precios de los servicios y medicamentos del catálogo.</p>
                        <Link className = "btn btn-primary mt-auto" to = "/admin/servicios">
                            Ir a precios
                        </Link>
                    </div>
                </div>

                {/* Tarjeta para ir al mantenedor de usuarios */}
                <div className = "col-12 col-md-6 col-lg-4">
                    <div className = "card shadow-sm h-100 p-4 text-center">
                        <h3>Usuarios</h3>
                        <p>Agrega, edita o elimina usuarios del sistema.</p>
                        <Link className = "btn btn-primary mt-auto" to = "/admin/usuarios">
                            Ir a usuarios
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Admin
