let servicios = [
    {
        id: 1,
        nombre: "Consulta general",
        categoria: "Consultas",
        precio: 15000,
        descripcion: "Revisión completa del estado de salud de tu mascota.",
        imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        nombre: "Consulta de urgencia",
        categoria: "Consultas",
        precio: 25000,
        descripcion: "Atención prioritaria fuera del horario habitual.",
        imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        nombre: "Control post-operatorio",
        categoria: "Consultas",
        precio: 10000,
        descripcion: "Revisión después de una cirugía importante.",
        imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        nombre: "Consulta ave o conejo",
        categoria: "Consultas",
        precio: 18000,
        descripcion: "Consulta especializada para aves y conejos.",
        imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        nombre: "Segunda opinión médica",
        categoria: "Consultas",
        precio: 20000,
        descripcion: "Evaluación adicional, requiere ficha clínica previa.",
        imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        nombre: "Vacuna antirrábica canina",
        categoria: "Vacunación",
        precio: 12000,
        descripcion: "Vacuna obligatoria por ley para la prevención de la rabia.",
        imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        nombre: "Vacuna sextuple canina",
        categoria: "Vacunación",
        precio: 18000,
        descripcion: "Refuerzo anual contra 6 enfermedades caninas.",
        imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        nombre: "Vacuna bivalente felina",
        categoria: "Vacunación",
        precio: 15000,
        descripcion: "Refuerzo anual para gatos.",
        imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop"
    },
    {
        id: 9,
        nombre: "Vacuna triple felina",
        categoria: "Vacunación",
        precio: 17000,
        descripcion: "Protege contra tres enfermedades felinas.",
        imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop"
    },
    {
        id: 10,
        nombre: "Vacuna Bordetella canina",
        categoria: "Vacunación",
        precio: 14000,
        descripcion: "Previene la tos de las perreras.",
        imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop"
    },
    {
        id: 11,
        nombre: "Vacuna antirrábica felina",
        categoria: "Vacunación",
        precio: 12000,
        descripcion: "Vacuna obligatoria contra la rabia en gatos.",
        imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop"
    },
    {
        id: 12,
        nombre: "Esterilización hembra canina",
        categoria: "Cirugía",
        precio: 80000,
        descripcion: "Cirugía programada, incluye anestesia y hospitalización 24h.",
        imagen: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop"
    },
    {
        id: 13,
        nombre: "Esterilización macho canino",
        categoria: "Cirugía",
        precio: 60000,
        descripcion: "Cirugía programada, incluye anestesia.",
        imagen: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop"
    },
    {
        id: 14,
        nombre: "Esterilización hembra felina",
        categoria: "Cirugía",
        precio: 65000,
        descripcion: "Incluye anestesia y hospitalización 12h.",
        imagen: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop"
    },
    {
        id: 15,
        nombre: "Esterilización macho felino",
        categoria: "Cirugía",
        precio: 50000,
        descripcion: "Cirugía programada, incluye anestesia.",
        imagen: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop"
    },
    {
        id: 16,
        nombre: "Extirpación de tumor cutáneo",
        categoria: "Cirugía",
        precio: 120000,
        descripcion: "Precio referencial, varía según el tamaño.",
        imagen: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop"
    },
    {
        id: 17,
        nombre: "Cesárea de urgencia",
        categoria: "Cirugía",
        precio: 180000,
        descripcion: "Cirugía de urgencia para partos complicados.",
        imagen: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop"
    },
    {
        id: 18,
        nombre: "Desparasitación interna (menos de 10kg)",
        categoria: "Desparasitación",
        precio: 8000,
        descripcion: "Tratamiento contra parásitos internos.",
        imagen: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop"
    },
    {
        id: 19,
        nombre: "Desparasitación interna (10 a 25kg)",
        categoria: "Desparasitación",
        precio: 9500,
        descripcion: "Tratamiento contra parásitos internos.",
        imagen: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop"
    },
    {
        id: 20,
        nombre: "Desparasitación interna (más de 25kg)",
        categoria: "Desparasitación",
        precio: 11000,
        descripcion: "Tratamiento contra parásitos internos.",
        imagen: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop"
    },
    {
        id: 21,
        nombre: "Desparasitación interna felina",
        categoria: "Desparasitación",
        precio: 8000,
        descripcion: "Tratamiento contra parásitos internos para gatos.",
        imagen: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop"
    },
    {
        id: 22,
        nombre: "Antiparasitario externo (pipeta)",
        categoria: "Desparasitación",
        precio: 7500,
        descripcion: "Incluye la aplicación de la pipeta.",
        imagen: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop"
    },
    {
        id: 23,
        nombre: "Hemograma completo",
        categoria: "Exámenes",
        precio: 22000,
        descripcion: "Examen de sangre para revisar el estado general del paciente.",
        imagen: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop"
    },
    {
        id: 24,
        nombre: "Perfil bioquímico completo",
        categoria: "Exámenes",
        precio: 35000,
        descripcion: "Resultado en 24 a 48 horas.",
        imagen: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop"
    },
    {
        id: 25,
        nombre: "Radiografía (1 proyección)",
        categoria: "Exámenes",
        precio: 28000,
        descripcion: "Diagnóstico por imagen.",
        imagen: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop"
    },
    {
        id: 26,
        nombre: "Ecografía abdominal",
        categoria: "Exámenes",
        precio: 45000,
        descripcion: "Diagnóstico por imagen no invasivo.",
        imagen: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop"
    },
    {
        id: 27,
        nombre: "Test de leishmaniasis",
        categoria: "Exámenes",
        precio: 18000,
        descripcion: "Examen de detección para perros.",
        imagen: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop"
    },
    {
        id: 28,
        nombre: "Corte de uñas",
        categoria: "Otros",
        precio: 5000,
        descripcion: "Servicio rápido de higiene y cuidado de uñas.",
        imagen: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&h=300&fit=crop"
    },
    {
        id: 29,
        nombre: "Limpieza dental",
        categoria: "Otros",
        precio: 55000,
        descripcion: "Requiere anestesia.",
        imagen: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&h=300&fit=crop"
    },
    {
        id: 30,
        nombre: "Microchip de identificación",
        categoria: "Otros",
        precio: 15000,
        descripcion: "Incluye registro en el sistema nacional.",
        imagen: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&h=300&fit=crop"
    },
    {
        id: 31,
        nombre: "Hospitalización (por día)",
        categoria: "Otros",
        precio: 30000,
        descripcion: "Incluye monitoreo y alimentación básica.",
        imagen: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&h=300&fit=crop"
    }
];

let guardado = localStorage.getItem("servicios");

if (guardado !== null) {

    let serviciosGuardados = JSON.parse(guardado);

    if (serviciosGuardados.length === servicios.length) {
        servicios = serviciosGuardados;
    }
}

localStorage.setItem("servicios", JSON.stringify(servicios));

function mostrarServicios() {

    let categoria = document.getElementById("filtroCategoria").value;
    let lista = document.getElementById("listaServicios");

    lista.innerHTML = "";

    for (let i = 0; i < servicios.length; i++) {

        if (categoria === "Todas" || servicios[i].categoria === categoria) {

            lista.innerHTML += `
                <div class="tarjeta">
                    <img src="${servicios[i].imagen}" width="200">
                    <h3>${servicios[i].nombre}</h3>
                    <p>${servicios[i].descripcion}</p>
                    <p class="precio">$${servicios[i].precio.toLocaleString("es-CL")}</p>
                    <button class="boton" onclick="reservarHora(${servicios[i].id})">Reservar hora</button>
                </div>
            `;
        }
    }
}

mostrarServicios();

function reservarHora(id) {

    let usuario = localStorage.getItem("usuario");

    if (usuario === null || JSON.parse(usuario).tipo !== "Cliente") {
    alert("Debes iniciar sesión como Cliente antes de reservar una hora");
    window.location.href = "login.html";
    return;
}

    usuario = JSON.parse(usuario);

    let servicioSeleccionado;

    for (let i = 0; i < servicios.length; i++) {
        if (servicios[i].id === id) {
            servicioSeleccionado = servicios[i];
        }
    }

    let citas = localStorage.getItem("citas");

    if (citas === null) {
        citas = [];
    } else {
        citas = JSON.parse(citas);
    }

    citas.push({
        correo: usuario.correo,
        servicio: servicioSeleccionado.nombre,
        precio: servicioSeleccionado.precio,
        estado: "Pendiente"
    });

    localStorage.setItem("citas", JSON.stringify(citas));

    alert("Reservaste hora para " + servicioSeleccionado.nombre + ". Revisa Mis Citas.");
}
