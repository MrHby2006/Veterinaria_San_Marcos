package cl.veterinaria.citas.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

// Lo que envia el formulario de Reservar hora
@Data
public class ReservaDTO {

    @NotNull(message = "Falta el usuario que reserva")
    private Long idUsuario;

    @NotBlank(message = "Debe ingresar el nombre de su mascota")
    @Size(max = 50, message = "El nombre de la mascota puede tener maximo 50 caracteres")
    private String nombreMascota;

    @NotNull(message = "Debe seleccionar una especie")
    private Long idEspecie;

    @NotNull(message = "Debe seleccionar un servicio")
    private Long idServicio;

    @NotNull(message = "Debe seleccionar una fecha")
    private LocalDate fecha;

    @NotNull(message = "Debe seleccionar una hora")
    private LocalTime hora;
}
