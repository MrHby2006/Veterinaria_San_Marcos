package cl.veterinaria.usuarios.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

// Lo que envia el formulario de Login
@Data
public class LoginDTO {

    @NotBlank(message = "Debe ingresar un correo")
    @Email(message = "Ingrese un correo valido")
    @Schema(example = "juan@correo.cl")
    private String correo;

    @NotBlank(message = "Debe ingresar una contraseña")
    @Schema(example = "ClaveSegura1")
    private String contrasena;
}
