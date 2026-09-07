let usuario = JSON.parse(localStorage.getItem("usuario"));

let citasGuardadas = localStorage.getItem("citas");

if (citasGuardadas === null) {

    let citasDemo = [
        {
            correo: "cliente@sanmarcos.cl",
            servicio: "Consulta general",
            precio: 15000,
            estado: "Pendiente"
        }
    ];

    localStorage.setItem("citas", JSON.stringify(citasDemo));
}

if (usuario === null || usuario.tipo !== "Cliente") {

    document.getElementById("mensajeUsuario").textContent = "Debes iniciar sesión como Cliente para ver tus citas.";
    document.getElementById("tablaCitas").style.display = "none";

} else {

    document.getElementById("mensajeUsuario").textContent = "Hola " + usuario.nombre + ", estas son tus citas:";

    mostrarCitas();
}

function mostrarCitas() {

    let citas = localStorage.getItem("citas");

    if (citas === null) {
        citas = [];
    } else {
        citas = JSON.parse(citas);
    }

    let cuerpo = document.getElementById("cuerpoTabla");
    cuerpo.innerHTML = "";

    let encontradas = 0;

    for (let i = 0; i < citas.length; i++) {

        if (citas[i].correo === usuario.correo) {

            encontradas = encontradas + 1;

            cuerpo.innerHTML += `
                <tr>
                    <td>${citas[i].servicio}</td>
                    <td>$${citas[i].precio.toLocaleString("es-CL")}</td>
                    <td>${citas[i].estado}</td>
                    <td><button class="boton" onclick="quitarCita(${i})">Quitar</button></td>
                </tr>
            `;
        }
    }

    if (encontradas === 0) {
        cuerpo.innerHTML = "<tr><td colspan=\"4\">Todavía no tienes citas reservadas.</td></tr>";
    }
}

function quitarCita(posicion) {

    let citas = JSON.parse(localStorage.getItem("citas"));
    let nuevasCitas = [];

    for (let i = 0; i < citas.length; i++) {
        if (i !== posicion) {
            nuevasCitas.push(citas[i]);
        }
    }

    localStorage.setItem("citas", JSON.stringify(nuevasCitas));

    mostrarCitas();
}
