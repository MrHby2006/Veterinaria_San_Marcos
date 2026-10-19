import BotonReservarHora from "../atoms/BotonReservarHora";

interface CardServicioProps {
    nombre: string;
    categoria: string;
    descripcion: string;
    precio: number;
    imagen: string;
}

function CardServicio({nombre, categoria, descripcion, precio, imagen}: CardServicioProps) {
    return (
        <div className = "card h-100">
            <img
                src = {imagen}
                className = "card-img-top"
                alt = {nombre}
                style = {{height: '200px', objectFit: 'cover'}}
            />

            <div className = "card-body d-flex flex-column">
                <h5 className = "card-title">
                    {nombre}
                </h5>

                <p className = "card-text small text-muted">
                    {categoria}
                </p>

                <p className = "card-text">
                    {descripcion}
                </p>

                <p className = "card-text fw-bold text-center">
                    ${precio}
                </p>

                <div className = "mt-auto text-center">
                    <BotonReservarHora servicio = {nombre} />
                </div>
            </div>
        </div>
    )
}

export default CardServicio
