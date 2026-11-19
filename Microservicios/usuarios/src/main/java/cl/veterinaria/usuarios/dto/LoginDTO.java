package cl.veterinaria.usuarios.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

// Lo que envia el formulario de Login
@Data
public class LoginDTO {

    @NotBlank(message = "Debe ingresar un correo")
    @Email(message = "Ingrese un correo valido")
    private String correo;

    @NotBlank(message = "Debe ingresar una contraseña")
    private String contrasena;
}
