import Input from "../atoms/Input";

interface CampoFormularioProps {
    etiqueta: string;
    tipo: string;
    nombre: string;
    valor: string; // Recibe el valor del campo
    alCambiar: (valor: string) => void; // Recibe la función que actualiza el valor
}

function CampoFormulario({etiqueta, tipo, nombre, valor, alCambiar}: CampoFormularioProps) {
    return (
        <div className = "mb-3">
            <label className = "form-label fw-bold" htmlFor = {nombre}>
                {etiqueta}
            </label>

            <Input
                tipo = {tipo}
                nombre = {nombre}
                valor = {valor}
                alCambiar = {alCambiar}
            />
        </div>
    )
}

export default CampoFormulario
