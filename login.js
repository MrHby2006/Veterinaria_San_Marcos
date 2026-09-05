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

    if (correo === "medico@demo.cl" && clave === "1234"){
        window.location.href = "medico.html";
    }else if (correo === "usuario@demo.cl" && clave === "5678"){
        window.location.href = "usuario.html";
    }else if (correo === "recepcionista@demo.cl" && clave === "2468"){
        window.location.href = "recepcionista.html";
    }else if (correo === "tecnico@demo.cl" && clave === "1357"){
        window.location.href = "tecnico.html";
    }else{
        alert("Correo o clave incorrectos")
    }
}