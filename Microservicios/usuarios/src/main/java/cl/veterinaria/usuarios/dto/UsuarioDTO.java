package cl.veterinaria.usuarios.dto;

import lombok.Data;

// Lo que se responde al front y a los otros microservicios.
// NO tiene la contraseña: nunca sale del microservicio usuarios.
@Data
public class UsuarioDTO {
    private Long id;
    private String nombre;
    private String correo;
    private String direccion;
    private String rol;
    private Boolean activo;
}
