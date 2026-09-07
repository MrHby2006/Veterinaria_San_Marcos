let usuario = JSON.parse(localStorage.getItem("usuario"));

if (usuario === null || usuario.tipo !== "Administrador") {
    alert("Debes iniciar sesión como Administrador");
    window.location.href = "login.html";
}
