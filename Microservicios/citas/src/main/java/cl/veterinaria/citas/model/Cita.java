package cl.veterinaria.citas.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "cita")
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cita")
    private Long id;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false)
    private LocalTime hora;

    // Se copia del servicio al reservar
    @Column(nullable = false)
    private Integer precio;

    // Pendiente, Confirmada o Cancelada
    @Column(nullable = false, length = 20)
    private String estado = "Pendiente";

    @Column(nullable = false)
    private Boolean pagado = false;

    // FK real: la mascota esta en este mismo microservicio
    @Column(name = "id_mascota", nullable = false)
    private Long idMascota;

    // Referencia logica (sin FK): el servicio vive en el microservicio catalogo
    @Column(name = "id_servicio", nullable = false)
    private Long idServicio;

    // FK real que acepta NULL: sin medico = "Por asignar"
    @Column(name = "id_medico")
    private Long idMedico;

    // Reembolso: se llenan solo cuando la cita se cancela
    @Column(name = "reembolso")
    private Integer reembolso;

    @Column(name = "fecha_cancelacion")
    private LocalDateTime fechaCancelacion;

    @Column(name = "cancelada_por", length = 20)
    private String canceladaPor;
}
