import CardConsejo from "../molecules/CardConsejo";

function Consejos() {
    return (
        <div className = "container my-4">
            <h1 className = "fs-2 fw-bold" style = {{ color: "#2F3E46" }}>Consejos de cuidados de Mascotas</h1>

            <div className = "d-flex flex-wrap justify-content-center gap-3 mt-4">
                <CardConsejo
                    id = {1}
                    nombre = "Alimentación equilibrada y agua fresca"
                    descripcion = "Proporciona un alimento adecuado para su edad, tamaño y nivel de actividad. Evita darle comida casera o sobras (especialmente huesos, chocolate, cebolla o ajo), ya que pueden ser tóxicas para ellos. Asegúrate de que siempre tengan acceso a un plato de agua limpia y fresca."
                    imagen = "/img/Consejos/comida.jpg"
                />

                <CardConsejo
                    id = {2}
                    nombre = "Visitas regulares al veterinario"
                    descripcion = "Lleva a tu mascota al menos una vez al año para una revisión general. Mantén al día su calendario de vacunación y desparasitación (tanto interna como externa) para prevenir enfermedades graves."
                    imagen = "/img/Consejos/chequeo.jpg"
                />

                <CardConsejo
                    id = {3}
                    nombre = "Actividad física y estimulación mental"
                    descripcion = "Dedica tiempo diario a jugar y pasear con tu mascota para quemar energía y mantener un peso saludable. Estimula su mente con juguetes interactivos o entrenamientos cortos para evitar el aburrimiento, la ansiedad y conductas destructivas."
                    imagen = "/img/Consejos/juego.jpg"
                />
            </div>
        </div>
    )
}

export default Consejos
