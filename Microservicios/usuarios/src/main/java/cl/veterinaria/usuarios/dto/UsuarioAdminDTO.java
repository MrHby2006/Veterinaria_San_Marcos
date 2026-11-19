package cl.veterinaria.usuarios.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

// Lo que envia Admin > Usuarios al agregar un usuario
@Data
public class UsuarioAdminDTO {

    @NotBlank(message = "Debe ingresar el nombre")
    @Size(max = 100, message = "El nombre puede tener maximo 100 caracteres")
    private String nombre;

    @NotBlank(message = "Debe ingresar el correo")
    @Email(message = "Ingrese un correo valido")
    @Size(max = 100, message = "El correo puede tener maximo 100 caracteres")
    private String correo;

    @NotBlank(message = "Debe ingresar una contraseña")
    @Size(min = 8, message = "La contraseña debe ser de minimo 8 caracteres")
    private String contrasena;

    @NotBlank(message = "Debe elegir el tipo de usuario")
    private String rol;

    // Opcional: una recepcionista no necesita direccion
    @Size(max = 150, message = "La direccion puede tener maximo 150 caracteres")
    private String direccion;
}
