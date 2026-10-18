import FormularioRegistro from "../organism/FormularioRegistro";

function Registro() {
    return (
        <div className = "container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm p-4">
                        <h2 className="mb-4">Crear una Cuenta</h2>

                        <FormularioRegistro />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registro;