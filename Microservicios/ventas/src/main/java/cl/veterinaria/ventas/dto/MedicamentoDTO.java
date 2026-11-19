package cl.veterinaria.ventas.dto;

import lombok.Data;

// Lo que responde el microservicio catalogo en GET /api/medicamentos/{id}.
// Los nombres tienen que ser IGUALES a los del model de catalogo, o llegan en null.
@Data
public class MedicamentoDTO {
    private Long id;
    private String nombreComercial;
    private Integer precioUnitario;
    private Integer stockActual;
    private String imagen;
}
