package cl.veterinaria.usuarios.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

// Lo que envia Admin > Usuarios al editar (igual que el formulario: nombre, correo y tipo)
@Data
public class UsuarioActualizarDTO {

    @NotBlank(message = "Debe ingresar el nombre")
    @Size(max = 100, message = "El nombre puede tener maximo 100 caracteres")
    @Schema(example = "Ana Soto")
    private String nombre;

    @NotBlank(message = "Debe ingresar el correo")
    @Email(message = "Ingrese un correo valido")
    @Size(max = 100, message = "El correo puede tener maximo 100 caracteres")
    @Schema(example = "ana@correo.cl")
    private String correo;

    @NotBlank(message = "Debe elegir el tipo de usuario")
    @Schema(description = "Cliente, Recepcionista o Administrador", example = "Recepcionista")
    private String rol;
}
