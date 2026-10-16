import { useParams } from "react-router-dom";
import BotonVolverConsejo from "../atoms/BotonVolverConsejo";
import BotonReserva from "../atoms/BotonReserva";

const consejos = [
    {
        id: 1,
        nombre: "Alimentación equilibrada y agua fresca",
        categoria: "Alimentación",
        especie: "Perro / Gato",
        descripcion: "Proporciona un alimento adecuado para su edad, tamaño y nivel de actividad. Evita darle comida casera o sobras (especialmente huesos, chocolate, cebolla o ajo), ya que pueden ser tóxicas para ellos. Asegúrate de que siempre tengan acceso a un plato de agua limpia y fresca.",
        recomendacion_1: "Elige un alimento según su etapa de vida: cachorro, adulto o senior.",
        recomendacion_2: "Divide la comida del día en 2 o 3 porciones, siempre a la misma hora.",
        recomendacion_3: "Cambia el agua todos los días y lava su plato con frecuencia.",
        recomendacion_4: "Si cambias de alimento, hazlo de a poco durante una semana, mezclando el nuevo con el anterior.",
        alerta: "Si deja de comer por más de un día, vomita seguido o comió algo tóxico como chocolate, uvas o cebolla, llévalo al veterinario de inmediato.",
        imagen: "/img/Consejos/comida.jpg"
    },
    {
        id: 2,
        nombre: "Visitas regulares al veterinario",
        categoria: "Salud preventiva",
        especie: "Perro / Gato",
        descripcion: "Lleva a tu mascota al menos una vez al año para una revisión general. Mantén al día su calendario de vacunación y desparasitación (tanto interna como externa) para prevenir enfermedades graves.",
        recomendacion_1: "Cachorros y gatitos: controles cada 3 a 4 semanas mientras reciben sus primeras vacunas.",
        recomendacion_2: "Mascotas adultas: un control general una vez al año.",
        recomendacion_3: "Mascotas mayores de 7 años: un control cada 6 meses.",
        recomendacion_4: "Guarda su carnet de vacunas al día y desparasítalo cuando lo indique el veterinario.",
        alerta: "No esperes al control si notas decaimiento, fiebre, diarrea por más de un día, tos o cambios bruscos de peso.",
        imagen: "/img/Consejos/chequeo.jpg"
    },
    {
        id: 3,
        nombre: "Actividad física y estimulación mental",
        categoria: "Bienestar",
        especie: "Perro / Gato",
        descripcion: "Dedica tiempo diario a jugar y pasear con tu mascota para quemar energía y mantener un peso saludable. Estimula su mente con juguetes interactivos o entrenamientos cortos para evitar el aburrimiento, la ansiedad y conductas destructivas.",
        recomendacion_1: "Perros: al menos un paseo al día, ajustando el tiempo a su raza y edad.",
        recomendacion_2: "Gatos: sesiones cortas de juego con cañas o pelotas varias veces al día.",
        recomendacion_3: "Usa juguetes interactivos o comederos tipo puzzle para estimular su mente.",
        recomendacion_4: "Evita pasear en las horas de más calor y lleva agua en los paseos largos.",
        alerta: "Si se cansa muy rápido, cojea, le cuesta respirar al hacer ejercicio o de repente empieza a romper cosas, consulta al veterinario.",
        imagen: "/img/Consejos/juego.jpg"
    }
];

function DetalleConsejo() {
    const { id } = useParams()

    const consejo = consejos.find(
        consejo => consejo.id === Number(id)
    )

    // Si el id no existe (ej: /consejo/99), mostramos un mensaje
    if (!consejo) {
        return (
            <div className = "container my-4">
                <h2 className = "fw-bold" style = {{ color: "#2F3E46", fontSize: "40px" }}>Consejo no encontrado</h2>

                <div className = "mt-4">
                    <BotonVolverConsejo />
                </div>
            </div>
        )
    }

    return (
        <div className = "container my-4">
            <h2 className = "fw-bold" style = {{ color: "#2F3E46", fontSize: "40px" }}>Detalle del Consejo</h2>

            <section className = "row align-items-center g-4 mt-2 p-4 rounded text-white text-start" style = {{ backgroundColor: "#2A9D8F" }}>
                <div className = "col-12 col-md-5">
                    <img
                        src = {consejo.imagen}
                        alt = {consejo.nombre}
                        className = "img-fluid rounded w-100"
                        style = {{ height: '300px', objectFit: 'cover' }}
                    />
                </div>

                <div className = "col-12 col-md-7">
                    <h3 className = "fw-bold">{consejo.nombre}</h3>

                    <div className = "d-flex flex-wrap gap-2 my-3">
                        <span className = "badge bg-light text-dark fs-6">Categoría: {consejo.categoria}</span>
                        <span className = "badge bg-light text-dark fs-6">Especie: {consejo.especie}</span>
                    </div>

                    <p className = "fs-5">{consejo.descripcion}</p>

                    <div className = "d-flex flex-wrap gap-3 mt-3">
                        <BotonVolverConsejo />
                        <BotonReserva />
                    </div>
                </div>
            </section>

            <div className = "row g-4 mt-2">
                <div className = "col-12 col-md-7">
                    <div className = "card shadow-sm p-4 h-100">
                        <h4 className = "fw-bold" style = {{ color: "#2F3E46" }}>Recomendaciones</h4>

                        <ul className = "fs-5 mb-0">
                            <li className = "mb-2">{consejo.recomendacion_1}</li>
                            <li className = "mb-2">{consejo.recomendacion_2}</li>
                            <li className = "mb-2">{consejo.recomendacion_3}</li>
                            <li>{consejo.recomendacion_4}</li>
                        </ul>
                    </div>
                </div>

                <div className = "col-12 col-md-5">
                    <div className = "alert alert-warning h-100 mb-0 p-4">
                        <h4 className = "fw-bold">¿Cuándo ir al veterinario?</h4>

                        <p className = "fs-5 mb-0">{consejo.alerta}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetalleConsejo
