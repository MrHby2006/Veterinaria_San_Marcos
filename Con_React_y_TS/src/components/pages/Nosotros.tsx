function Nosotros() {
    return (
        <div className = "container my-4">
            <h2 className = "fw-bold text-center" style = {{ color: "#2F3E46", fontSize: "40px" }}>Sobre Nosotros</h2>

            <section className="row align-items-center g-4 mt-2 p-4 rounded text-white text-start" style={{ backgroundColor: "#2A9D8F" }}>
                <div className="col-12 col-md-8 col-lg-6">
                    <h4>Fundada en 2015, la Veterinaria San Marcos nació con un propósito claro: brindar atención médica de excelencia a las mascotas de Rancagua, tratándolas con el mismo amor y respeto que merecen como miembros de la familia.</h4>
                    <h4 className="mt-3">A lo largo de los años, hemos crecido e incorporado tecnología de punta en imagenología y laboratorio, pero nuestro valor principal sigue siendo el trato humano y empático tanto con nuestros pacientes como con sus dueños.</h4>
                </div>

                <div className="col-12 col-md-8 col-lg-6">
                    <img
                        src="/img/Nosotros/nosotros.jpg"
                        alt="Clínica veterinaria"
                        className="img-fluid rounded w-100"
                    />
                </div>
            </section>
        </div>
    )
}

export default Nosotros
