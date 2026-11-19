package cl.veterinaria.citas.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

// Lo que se responde a Mis Citas y a Recepcion: la cita con los nombres ya puestos,
// para que el front no tenga que buscarlos
@Data
public class CitaDTO {
    private Long id;
    private LocalDate fecha;
    private LocalTime hora;
    private Integer precio;
    private String estado;
    private Boolean pagado;
    private Long idMascota;
    private String nombreMascota;
    private Long idServicio;
    private String nombreServicio;
    private Long idMedico;
    private String nombreMedico;
    private String correoCliente;
    private Integer reembolso; // null si no esta cancelada
    private String canceladaPor; // Cliente o Clinica
}
