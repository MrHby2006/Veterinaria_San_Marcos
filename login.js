function ingresar(){
    //Declaro las variables
    let correo = document.getElementById("correo").value;
    let clave = document.getElementById("clave").value;

    //Validar campos vacíos
    if (correo === "" || clave === ""){
        alert("Debe completar todos los campos");
        return;
    }

    let formatoCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formatoCorreo.test(correo)){
        alert("Ingrese un correo válido");
        return;
    }

    if (clave.length !== 4){
        alert("La clave debe tener exactamente 4 caracteres");
        return;
    }

    if (correo === "admin@demo.cl" && clave === "1234"){
        let usuario = {
            nombre: "Administrador",
            correo: correo,
            tipo: "Administrador"
        };
        localStorage.setItem("usuario", JSON.stringify(usuario));
        window.location.href = "admin.html";
    }else if (correo === "usuario@demo.cl" && clave === "1234"){
        let usuario = {
            nombre: "Usuario Demo",
            correo: correo,
            tipo: "Cliente"
        };
        localStorage.setItem("usuario", JSON.stringify(usuario));
        window.location.href = "usuario.html";
    }else if (correo === "recepcionista@demo.cl" && clave === "1234"){
        let usuario = {
            nombre: "Recepcionista",
            correo: correo,
            tipo: "Recepcionista"
        };
        localStorage.setItem("usuario", JSON.stringify(usuario));
        window.location.href = "recepcionista.html";
    }else{
        alert("Correo o clave incorrectos")
    }
}