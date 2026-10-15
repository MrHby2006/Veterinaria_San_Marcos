import BotonVerConsejo from "../atoms/BotonVerConsejo";

interface CardConsejoProps {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
}

function CardConsejo({nombre, imagen}: CardConsejoProps) {
    return (
        <div className = "card shadow-sm" style = {{width: '20rem'}}>
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

                <div className = "mt-auto">
                    <BotonVerConsejo />
                </div>
            </div>
        </div>
    )
}

export default CardConsejo
