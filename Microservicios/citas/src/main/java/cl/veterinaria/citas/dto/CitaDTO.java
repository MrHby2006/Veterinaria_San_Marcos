package cl.veterinaria.citas.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

// Lo que se responde a Mis Citas y a Recepcion: la cita con los nombres ya puestos,
// para que el front no tenga que buscarlos
@Data
@Schema(description = "Cita con los nombres de la mascota, el servicio, el medico y el cliente")
public class CitaDTO {
    @Schema(description = "Id unico de la cita", example = "1")
    private Long id;
    @Schema(description = "Dia de la cita", example = "2026-12-14")
    private LocalDate fecha;
    @Schema(description = "Hora de la cita", example = "10:30")
    private LocalTime hora;
    @Schema(description = "Precio en pesos, copiado al reservar", example = "15000")
    private Integer precio;
    @Schema(description = "Pendiente, Confirmada o Cancelada", example = "Pendiente")
    private String estado;
    @Schema(description = "true si el cliente ya pago", example = "false")
    private Boolean pagado;
    @Schema(description = "Id de la mascota", example = "1")
    private Long idMascota;
    @Schema(description = "Nombre de la mascota", example = "Firulais")
    private String nombreMascota;
    @Schema(description = "Id del servicio", example = "1")
    private Long idServicio;
    @Schema(description = "Nombre del servicio", example = "Consulta general")
    private String nombreServicio;
    @Schema(description = "Id del medico (vacio si no tiene)", example = "1")
    private Long idMedico;
    @Schema(description = "Nombre del medico", example = "Por asignar")
    private String nombreMedico;
    @Schema(description = "Correo del dueño de la mascota", example = "juan@correo.cl")
    private String correoCliente;
    @Schema(description = "Monto devuelto al cancelar (vacio si no esta cancelada)", example = "15000")
    private Integer reembolso; // null si no esta cancelada
    @Schema(description = "Cliente o Clinica (vacio si no esta cancelada)", example = "Cliente")
    private String canceladaPor; // Cliente o Clinica
}
