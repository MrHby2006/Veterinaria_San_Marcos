package cl.veterinaria.contenido.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

// Cada recomendacion de un consejo (antes eran recomendacion_1 a recomendacion_4).
// La columna id_consejo la maneja la lista "recomendaciones" de Consejo.
@Data
@Entity
@Table(name = "recomendacion")
@Schema(description = "Una recomendacion dentro de un consejo")
public class Recomendacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_recomendacion")
    @Schema(description = "Id unico de la recomendacion", example = "1")
    private Long id;

    @Column(nullable = false, length = 255)
    @Schema(description = "Texto de la recomendacion", example = "Cambia el agua todos los días y lava su plato con frecuencia.")
    private String texto;

    // Para mostrarlas siempre en el mismo orden (1, 2, 3...)
    @Column(nullable = false)
    @Schema(description = "Posicion en la lista", example = "1")
    private Integer orden;
}
