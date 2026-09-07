let consejo = JSON.parse(
    localStorage.getItem("consejo")
);

document.getElementById("imagen").src = consejo.imagen;

document.getElementById("nombre").textContent = consejo.nombre;

document.getElementById("descripcion").textContent = consejo.descripcion;