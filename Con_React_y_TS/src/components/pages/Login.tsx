import FormularioLogin from "../organism/FormularioLogin";

function Login() {
    return (
        <div className = "container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm p-4">
                        <h2 className="mb-4 text-center">Inicio de Sesión</h2>

                        <FormularioLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;