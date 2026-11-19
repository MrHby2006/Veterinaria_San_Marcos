package cl.veterinaria.ventas.dto;

import java.time.LocalDateTime;

import lombok.Data;

// Lo que se responde al Carrito y a Recepcion: la compra con los nombres ya puestos
@Data
public class CompraDTO {
    private Long id;
    private Long idMedicamento;
    private String nombreMedicamento;
    private String imagen;
    private Integer cantidad;
    private Integer precio;
    private Integer subtotal;
    private Boolean pagado;
    private Boolean entregado;
    private LocalDateTime fechaAgregado;
    private LocalDateTime fechaPago;
    private String correoCliente;
}
