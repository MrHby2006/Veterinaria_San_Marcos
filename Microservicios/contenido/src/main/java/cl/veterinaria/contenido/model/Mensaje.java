package cl.veterinaria.contenido.model;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

// Mensaje del formulario de Contacto
@Data
@Entity
@Table(name = "mensaje")
@Schema(description = "Mensaje enviado desde el formulario de Contacto")
public class Mensaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mensaje")
    @Schema(description = "Id unico del mensaje", example = "1")
    private Long id;

    @Column(nullable = false, length = 100)
    @Schema(description = "Nombre de quien escribe", example = "Ana Torres")
    private String nombre;

    @Column(nullable = false, length = 100)
    @Schema(description = "Correo para responderle", example = "ana@correo.cl")
    private String correo;

    @Column(nullable = false, length = 1000)
    @Schema(description = "Lo que escribio", example = "¿Atienden los domingos?")
    private String mensaje;

    @Column(nullable = false, updatable = false)
    @Schema(description = "Fecha y hora en que se envio")
    private LocalDateTime fecha;

    // PENDIENTE al llegar, ATENDIDO cuando la clinica lo responde
    @Column(nullable = false, length = 20)
    @Schema(description = "PENDIENTE o ATENDIDO", example = "PENDIENTE")
    private String estado = "PENDIENTE";

    // Se ejecuta justo antes del INSERT: guarda la fecha y hora de ese momento
    @PrePersist
    public void antesDeGuardar() {
        fecha = LocalDateTime.now();
    }
}
