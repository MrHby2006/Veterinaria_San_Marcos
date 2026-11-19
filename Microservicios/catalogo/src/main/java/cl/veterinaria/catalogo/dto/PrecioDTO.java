package cl.veterinaria.catalogo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// Lo que envia el admin en Admin > Precios (sirve para servicios y medicamentos)
@Data
public class PrecioDTO {

    @NotNull(message = "Debe ingresar el precio")
    @Min(value = 1, message = "El precio tiene que ser mayor a 0")
    @Max(value = 10000000, message = "El precio no puede ser mayor a 10000000")
    @Schema(description = "Nuevo precio en pesos", example = "16000")
    private Integer precio;
}
