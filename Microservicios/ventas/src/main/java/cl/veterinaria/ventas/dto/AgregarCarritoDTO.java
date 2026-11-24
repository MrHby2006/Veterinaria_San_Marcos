package cl.veterinaria.ventas.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// Lo que envia el boton "Añadir al carrito".
// No trae precio: el precio lo pone el back desde catalogo.
@Data
public class AgregarCarritoDTO {

    @NotNull(message = "Falta el usuario")
    @Schema(description = "Id del cliente que compra", example = "5")
    private Long idUsuario;

    @NotNull(message = "Falta el medicamento")
    @Schema(description = "Id del medicamento (ver GET /api/medicamentos en catalogo)", example = "3")
    private Long idMedicamento;

    @NotNull(message = "Debe indicar la cantidad")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    @Max(value = 20, message = "Puede llevar maximo 20 unidades de un medicamento")
    @Schema(description = "De 1 a 20 unidades", example = "2")
    private Integer cantidad;
}
