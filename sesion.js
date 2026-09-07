function actualizarHeader() {
    let datos = localStorage.getItem("usuario");
    let acciones = document.querySelector(".acciones");

    if (datos === null || acciones === null) {
        return;
    }

    let usuarioActivo = JSON.parse(datos);
    let enlaceLogin = acciones.querySelector("a[href='login.html']");
    let enlaceRegistro = acciones.querySelector("a[href='registro.html']");

    if (enlaceLogin !== null) {
        enlaceLogin.outerHTML = `<span class="saludoUsuario">Hola, ${usuarioActivo.nombre || usuarioActivo.correo}</span>`;
    }

    if (enlaceRegistro !== null) {
        enlaceRegistro.outerHTML = `<a href="#" class="botonSesion" onclick="cerrarSesion(); return false;">Cerrar sesión</a>`;
    } else {
        acciones.innerHTML += `<a href="#" class="botonSesion" onclick="cerrarSesion(); return false;">Cerrar sesión</a>`;
    }

    if (enlaceLogin !== null && usuarioActivo.tipo === "Administrador") {
        acciones.innerHTML += `<a href="admin.html">Panel admin</a>`;
    } else if (enlaceLogin !== null && usuarioActivo.tipo === "Recepcionista") {
        acciones.innerHTML += `<a href="recepcionista.html">Panel recepción</a>`;
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "inicio.html";
}

actualizarHeader();
