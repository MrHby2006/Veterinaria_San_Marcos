package cl.veterinaria.citas.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "medico")
@Schema(description = "Medico veterinario de la clinica")
public class Medico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_medico")
    @Schema(description = "Id unico del medico", example = "1")
    private Long id;

    @Column(nullable = false, length = 50)
    @Schema(description = "Nombre del medico", example = "Camila")
    private String nombre;

    @Column(nullable = false, length = 50)
    @Schema(description = "Apellido del medico", example = "Rojas")
    private String apellido;

    // Si el medico se va: activo en false, sus citas antiguas se mantienen
    @Column(nullable = false)
    @Schema(description = "false si fue eliminado", example = "true")
    private Boolean activo = true;
}
