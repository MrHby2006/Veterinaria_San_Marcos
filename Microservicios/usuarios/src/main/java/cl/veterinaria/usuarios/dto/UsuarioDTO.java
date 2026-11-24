package cl.veterinaria.usuarios.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

// Lo que se responde al front y a los otros microservicios.
// NO tiene la contraseña: nunca sale del microservicio usuarios.
@Data
@Schema(description = "Usuario que se responde, sin la contraseña")
public class UsuarioDTO {
    @Schema(description = "Id unico del usuario", example = "5")
    private Long id;
    @Schema(description = "Nombre completo", example = "Juan Pérez")
    private String nombre;
    @Schema(description = "Correo con el que inicia sesion", example = "juan@correo.cl")
    private String correo;
    @Schema(description = "Direccion (puede venir vacia)", example = "Av. San Martín 123, Rancagua")
    private String direccion;
    @Schema(description = "Cliente, Recepcionista o Administrador", example = "Cliente")
    private String rol;
    @Schema(description = "false si fue eliminado", example = "true")
    private Boolean activo;
}
