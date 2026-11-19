package cl.veterinaria.ventas.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// Lo que envia el boton "Añadir al carrito".
// No trae precio: el precio lo pone el back desde catalogo.
@Data
public class AgregarCarritoDTO {

    @NotNull(message = "Falta el usuario")
    private Long idUsuario;

    @NotNull(message = "Falta el medicamento")
    private Long idMedicamento;

    @NotNull(message = "Debe indicar la cantidad")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    @Max(value = 20, message = "Puede llevar maximo 20 unidades de un medicamento")
    private Integer cantidad;
}
