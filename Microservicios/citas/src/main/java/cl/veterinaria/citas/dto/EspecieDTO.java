package cl.veterinaria.citas.dto;

import lombok.Data;

// Lo que responde el microservicio catalogo en GET /api/especies
@Data
public class EspecieDTO {
    private Long id;
    private String nombre;
}
