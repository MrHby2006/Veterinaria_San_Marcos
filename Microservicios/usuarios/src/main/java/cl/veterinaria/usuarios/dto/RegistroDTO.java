package cl.veterinaria.usuarios.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

// Lo que envia el formulario de Registro (el cliente se crea solo)
@Data
public class RegistroDTO {

    @NotBlank(message = "Debe ingresar un nombre")
    @Size(max = 100, message = "El nombre puede tener maximo 100 caracteres")
    @Schema(example = "Juan Pérez")
    private String nombre;

    @NotBlank(message = "Debe ingresar un correo")
    @Email(message = "Ingrese un correo valido")
    @Size(max = 100, message = "El correo puede tener maximo 100 caracteres")
    @Schema(example = "juan@correo.cl")
    private String correo;

    @NotBlank(message = "Debe ingresar una contraseña")
    @Size(min = 8, message = "La contraseña debe ser de minimo 8 caracteres")
    @Schema(description = "Entre 8 y 72 caracteres", example = "ClaveSegura1")
    private String contrasena;

    @NotBlank(message = "Debe ingresar una direccion")
    @Size(max = 150, message = "La direccion puede tener maximo 150 caracteres")
    @Schema(example = "Av. San Martín 123, Rancagua")
    private String direccion;
}
