package cl.veterinaria.citas.dto;

import lombok.Data;

// Lo que responde el microservicio catalogo en GET /api/servicios/{id}
@Data
public class ServicioDTO {
    private Long id;
    private String nombre;
    private Integer precio;
}
