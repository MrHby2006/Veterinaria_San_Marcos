let usuario = JSON.parse(localStorage.getItem("usuario"));

if (usuario === null || usuario.tipo !== "Recepcionista") {
    alert("Debes iniciar sesión como Recepcionista");
    window.location.href = "login.html";
}

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

function mostrarTabla() {

    let citas = localStorage.getItem("citas");

    if (citas === null) {
        citas = [];
    } else {
        citas = JSON.parse(citas);
    }

    let cuerpo = document.getElementById("cuerpoTabla");
    cuerpo.innerHTML = "";

    if (citas.length === 0) {
        cuerpo.innerHTML = "<tr><td colspan=\"5\">No hay citas registradas todavía.</td></tr>";
        return;
    }

    for (let i = 0; i < citas.length; i++) {

        cuerpo.innerHTML += `
            <tr>
                <td>${citas[i].correo}</td>
                <td>${citas[i].servicio}</td>
                <td>$${citas[i].precio.toLocaleString("es-CL")}</td>
                <td>${citas[i].estado}</td>
                <td>
                    <button class="boton" onclick="confirmarCita(${i})">Confirmar</button>
                    <button class="boton" onclick="cancelarCita(${i})">Cancelar</button>
                </td>
            </tr>
        `;
    }
}

function confirmarCita(posicion) {

    let citas = JSON.parse(localStorage.getItem("citas"));
    citas[posicion].estado = "Confirmada";
    localStorage.setItem("citas", JSON.stringify(citas));

    mostrarTabla();
}

function cancelarCita(posicion) {

    let citas = JSON.parse(localStorage.getItem("citas"));
    citas[posicion].estado = "Cancelada";
    localStorage.setItem("citas", JSON.stringify(citas));

    mostrarTabla();
}

mostrarTabla();
