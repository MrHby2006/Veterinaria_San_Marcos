package cl.veterinaria.usuarios.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

// Lo que envia Admin > Usuarios al editar (igual que el formulario: nombre, correo y tipo)
@Data
public class UsuarioActualizarDTO {

    @NotBlank(message = "Debe ingresar el nombre")
    @Size(max = 100, message = "El nombre puede tener maximo 100 caracteres")
    private String nombre;

    @NotBlank(message = "Debe ingresar el correo")
    @Email(message = "Ingrese un correo valido")
    @Size(max = 100, message = "El correo puede tener maximo 100 caracteres")
    private String correo;

    @NotBlank(message = "Debe elegir el tipo de usuario")
    private String rol;
}
