package cl.veterinaria.citas.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

// Lo que envia el formulario de Reservar hora
@Data
public class ReservaDTO {

    @NotNull(message = "Falta el usuario que reserva")
    @Schema(description = "Id del cliente que reserva", example = "5")
    private Long idUsuario;

    @NotBlank(message = "Debe ingresar el nombre de su mascota")
    @Size(max = 50, message = "El nombre de la mascota puede tener maximo 50 caracteres")
    @Schema(example = "Firulais")
    private String nombreMascota;

    @NotNull(message = "Debe seleccionar una especie")
    @Schema(description = "Id de la especie (ver GET /api/especies en catalogo)", example = "1")
    private Long idEspecie;

    @NotNull(message = "Debe seleccionar un servicio")
    @Schema(description = "Id del servicio (ver GET /api/servicios en catalogo)", example = "1")
    private Long idServicio;

    @NotNull(message = "Debe seleccionar una fecha")
    @Schema(description = "De lunes a sabado", example = "2026-12-14")
    private LocalDate fecha;

    @NotNull(message = "Debe seleccionar una hora")
    @Schema(description = "En punto o a la media hora", example = "10:30")
    private LocalTime hora;
}
