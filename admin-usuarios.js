let usuarioConectado = JSON.parse(localStorage.getItem("usuario"));

if (usuarioConectado === null || usuarioConectado.tipo !== "Administrador") {
    alert("Debes iniciar sesión como Administrador");
    window.location.href = "login.html";
}

let correoEditando = "";

function mostrarTabla() {

    let usuarios = localStorage.getItem("usuarios");

    if (usuarios === null) {
        usuarios = [];
    } else {
        usuarios = JSON.parse(usuarios);
    }

    let cuerpo = document.getElementById("cuerpoTabla");
    cuerpo.innerHTML = "";

    for (let i = 0; i < usuarios.length; i++) {

        cuerpo.innerHTML += `
            <tr>
                <td>${usuarios[i].nombre}</td>
                <td>${usuarios[i].correo}</td>
                <td>${usuarios[i].tipo}</td>
                <td><button class="boton" onclick="editarUsuario('${usuarios[i].correo}')">Editar</button></td>
            </tr>
        `;
    }
}

function editarUsuario(correo) {

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioSeleccionado;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo === correo) {
            usuarioSeleccionado = usuarios[i];
        }
    }

    document.getElementById("nombre").value = usuarioSeleccionado.nombre;
    document.getElementById("correo").value = usuarioSeleccionado.correo;
    document.getElementById("tipo").value = usuarioSeleccionado.tipo;

    correoEditando = correo;

    document.getElementById("botonGuardar").textContent = "Guardar cambios";
}

function guardarUsuario() {

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let tipo = document.getElementById("tipo").value;

    if (nombre === "" || correo === "") {
        alert("Debes completar el nombre y el correo");
        return;
    }

    let usuarios = localStorage.getItem("usuarios");

    if (usuarios === null) {
        usuarios = [];
    } else {
        usuarios = JSON.parse(usuarios);
    }

    if (correoEditando === "") {

        usuarios.push({
            nombre: nombre,
            correo: correo,
            tipo: tipo
        });

    } else {

        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].correo === correoEditando) {
                usuarios[i].nombre = nombre;
                usuarios[i].correo = correo;
                usuarios[i].tipo = tipo;
            }
        }

        correoEditando = "";
        document.getElementById("botonGuardar").textContent = "Agregar usuario";
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";

    mostrarTabla();
}

mostrarTabla();
