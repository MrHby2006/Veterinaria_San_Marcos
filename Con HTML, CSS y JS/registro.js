function registrar() {

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let clave = document.getElementById("clave").value;
    let direccion = document.getElementById("direccion").value;

    if (nombre === "" || correo === "" || clave === "" || direccion === "") {
        alert("Debes completar todos los campos");
        return;
    }

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo)) {
        alert("Ingresa un correo válido");
        return;
    }

    if (clave.length < 4 || clave.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres");
        return;
    }

    let usuario = {
        nombre: nombre,
        correo: correo,
        clave: clave,
        direccion: direccion,
        tipo: "Cliente"
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Cuenta creada correctamente");

    window.location.href = "usuario.html";
}
