let medicamento = JSON.parse(
    localStorage.getItem("medicamento")
);

document.getElementById("imagen").src = medicamento.imagen;

document.getElementById("nombre").textContent = medicamento.nombre_comercial;

document.getElementById("principio").textContent = medicamento.principio_activo;

document.getElementById("presentacion").textContent = medicamento.presentación;

document.getElementById("especie").textContent = medicamento.especie;

document.getElementById("stock").textContent = "Stock que queda: " + medicamento.stock_actual;

document.getElementById("precio").textContent = "Precio: $" + medicamento.precio_unitario;