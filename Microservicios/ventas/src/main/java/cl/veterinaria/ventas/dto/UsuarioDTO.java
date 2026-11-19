package cl.veterinaria.ventas.dto;

import lombok.Data;

// Lo que responde el microservicio usuarios en GET /api/usuarios/{id}
@Data
public class UsuarioDTO {
    private Long id;
    private String nombre;
    private String correo;
    private String rol;
    private Boolean activo;
}
