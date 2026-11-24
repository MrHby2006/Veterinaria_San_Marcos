package cl.veterinaria.ventas.dto;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

// Lo que se responde al Carrito y a Recepcion: la compra con los nombres ya puestos
@Data
@Schema(description = "Producto del carrito o ya comprado")
public class CompraDTO {
    @Schema(description = "Id unico de la compra", example = "1")
    private Long id;
    @Schema(description = "Id del medicamento", example = "3")
    private Long idMedicamento;
    @Schema(description = "Nombre comercial", example = "Metrobay 250mg")
    private String nombreMedicamento;
    @Schema(description = "Ruta de la imagen en el front", example = "/img/Medicamentos/Metrobay.jpg")
    private String imagen;
    @Schema(description = "Unidades", example = "2")
    private Integer cantidad;
    @Schema(description = "Precio por unidad en pesos", example = "3900")
    private Integer precio;
    @Schema(description = "Precio por cantidad", example = "7800")
    private Integer subtotal;
    @Schema(description = "true si ya se pago", example = "false")
    private Boolean pagado;
    @Schema(description = "true si el cliente ya lo retiro", example = "false")
    private Boolean entregado;
    @Schema(description = "Cuando se agrego al carrito")
    private LocalDateTime fechaAgregado;
    @Schema(description = "Cuando se pago (vacio si esta en el carrito)")
    private LocalDateTime fechaPago;
    @Schema(description = "Correo del cliente, solo en Recepcion", example = "juan@correo.cl")
    private String correoCliente;
}
