let usuario = JSON.parse(localStorage.getItem("usuario"));

if (usuario === null || usuario.tipo !== "Administrador") {
    alert("Debes iniciar sesión como Administrador");
    window.location.href = "login.html";
}

function mostrarTabla() {

    let servicios = localStorage.getItem("servicios");

    if (servicios === null) {
        alert("Primero entra a la página de Servicios para cargar el catálogo");
        return;
    }

    servicios = JSON.parse(servicios);

    let cuerpo = document.getElementById("cuerpoTabla");

    cuerpo.innerHTML = "";

    for (let i = 0; i < servicios.length; i++) {

        cuerpo.innerHTML += `
            <tr>
                <td>${servicios[i].nombre}</td>
                <td><input type="number" class="inputPrecio" id="precio${servicios[i].id}" value="${servicios[i].precio}"></td>
                <td><button class="boton" onclick="guardarPrecio(${servicios[i].id})">Guardar</button></td>
            </tr>
        `;
    }
}

function guardarPrecio(id) {

    let servicios = JSON.parse(localStorage.getItem("servicios"));

    let nuevoPrecio = document.getElementById("precio" + id).value;

    if (nuevoPrecio === "") {
        alert("Escribe un precio");
        return;
    }

    for (let i = 0; i < servicios.length; i++) {
        if (servicios[i].id === id) {
            servicios[i].precio = Number(nuevoPrecio);
        }
    }

    localStorage.setItem("servicios", JSON.stringify(servicios));

    alert("Precio actualizado");

    mostrarTabla();
}

mostrarTabla();
