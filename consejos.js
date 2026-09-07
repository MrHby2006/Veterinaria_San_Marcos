let consejos = [
    {
        id: 1,
        nombre: "Alimentación equilibrada y agua fresca",
        descripcion: "Proporciona un alimento adecuado para su edad, tamaño y nivel de actividad. Evita darle comida casera o sobras (especialmente huesos, chocolate, cebolla o ajo), ya que pueden ser tóxicas para ellos. Asegúrate de que siempre tengan acceso a un plato de agua limpia y fresca.",
        imagen: "Imagenes/Consejos/Alimentacion.jpg"
    },
    {
        id: 2,
        nombre: "Visitas regulares al veterinario",
        descripcion: "Lleva a tu mascota al menos una vez al año para una revisión general. Mantén al día su calendario de vacunación y desparasitación (tanto interna como externa) para prevenir enfermedades graves.",
        imagen: "Imagenes/Consejos/Veterinario.jpg"
    },
    {
        id: 3,
        nombre: "Actividad física y estimulación mental",
        descripcion: "Dedica tiempo diario a jugar y pasear con tu mascota para quemar energía y mantener un peso saludable. Estimula su mente con juguetes interactivos o entrenamientos cortos para evitar el aburrimiento, la ansiedad y conductas destructivas.",
        imagen: "Imagenes/Consejos/Paseo.jpg"
    }
];

let lista = document.getElementById("listaConsejos");

for (let i = 0; i < consejos.length; i++){
    lista.innerHTML += `
        <div>
            <img src = "${consejos[i].imagen}" width = "200">

            <h2>${consejos[i].nombre}</h2>

            <button onclick = "verDetalle(${consejos[i].id})">
                Ver detalle
            </button>

            <hr>
        </div>
    `;
}

function verDetalle(id){
    let consejoSeleccionado;

    for (let i = 0; i < consejos.length; i++){
        if (consejos[i].id === id){
            consejoSeleccionado = consejos[i];
            break;
        }
    }

    localStorage.setItem(
        "consejo",
        JSON.stringify(consejoSeleccionado)
    );

    window.location.href = "detalle_consejo.html";
}