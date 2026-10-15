interface CardBeneficioProps {
    icono: string;
    titulo: string;
    descripcion: string;
}

function CardBeneficio({icono, titulo, descripcion}: CardBeneficioProps) {
    return (
        <div className = "card shadow-sm" style = {{width: '16rem'}}>
            <div className = "card-body">
                <p style = {{fontSize: '40px'}}>
                    {icono}
                </p>

                <h5 className = "card-title">
                    {titulo}
                </h5>

                <p className = "card-text">
                    {descripcion}
                </p>
            </div>
        </div>
    )
}

export default CardBeneficio
