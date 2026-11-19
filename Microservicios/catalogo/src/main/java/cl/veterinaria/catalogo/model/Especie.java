package cl.veterinaria.catalogo.model;

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
@Table(name = "especie")
@Schema(description = "Especie de mascota que atiende la clinica")
public class Especie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_especie")
    @Schema(description = "Id unico de la especie", example = "1")
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    @Schema(description = "Nombre de la especie", example = "Perro")
    private String nombre;
}
