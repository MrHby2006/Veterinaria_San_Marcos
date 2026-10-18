import FormularioContacto from "../organism/FormularioContacto";

function Contacto() {
    return (
        // Contenedor principal con margen
        <div className = "container my-4">
            <h2 className = "fw-bold" style = {{ color: "#2F3E46", fontSize: "40px" }}>Contacto</h2>

            <h4 className = "mt-3 mb-4" style = {{ color: "#2F3E46" }}>¿Tienes dudas? Escríbenos y te responderemos a la brevedad.</h4>

            {/* Fila que centra el contenido */}
            <div className = "row justify-content-center">

                {/* Ancho adaptable según pantalla */}
                <div className = "col-12 col-md-8 col-lg-6">

                    {/* Tarjeta con sombra y espacio interior */}
                    <div className = "card shadow-sm p-4 text-start">
                        <FormularioContacto />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contacto
