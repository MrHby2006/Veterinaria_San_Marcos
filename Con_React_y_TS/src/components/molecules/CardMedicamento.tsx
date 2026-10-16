import BotonVerMed from "../atoms/BotonVerMed";

interface CardMedProps {
    id: number;
    categoria: string;
    nombre_comercial: string;
    principio_activo: string;
    presentacion: string;
    especie: string;
    stock_actual: number;
    precio_unitario: number;
    imagen: string;
}

function CardMedicamento({id, categoria, nombre_comercial, principio_activo, presentacion, especie, stock_actual, precio_unitario, imagen}: CardMedProps) {
    return (
        <div className = "card" style = {{width: '20rem'}}>
            <img 
                src = {imagen}
                className = "card-img-top"
                alt = {nombre_comercial}
                style = {{height: '200px', objectFit: 'contain'}}
            />

            <div className = "card-body d-flex flex-column">
                <h5 className = "card-title">
                    Nombre: {nombre_comercial}
                </h5>
                
                <p className = "card-text">
                    Categoría: {categoria}
                </p>

                <p className = "card-text">
                    Principio activo: {principio_activo}
                </p>

                <p className = "card-text">
                    Presentación: {presentacion}
                </p>

                <p className = "card-text">
                    Especie: {especie}
                </p>

                <p className = "card-text">
                    Stock actual: {stock_actual}
                </p>

                <p className = "card-text">
                    Precio: ${precio_unitario}
                </p>

                <div className = "mt-auto">
                    <BotonVerMed id = {id} />
                </div>
            </div>
        </div>
    )
}

export default CardMedicamento