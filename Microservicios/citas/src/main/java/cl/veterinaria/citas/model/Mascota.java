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
@Table(name = "mascota")
@Schema(description = "Mascota de un cliente")
public class Mascota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mascota")
    @Schema(description = "Id unico de la mascota", example = "1")
    private Long id;

    @Column(nullable = false, length = 50)
    @Schema(description = "Nombre de la mascota", example = "Firulais")
    private String nombre;

    // Referencia logica (sin FK): el usuario vive en el microservicio usuarios
    @Column(name = "id_usuario", nullable = false)
    @Schema(description = "Id del cliente dueño", example = "5")
    private Long idUsuario;

    // Referencia logica (sin FK): la especie vive en el microservicio catalogo
    @Column(name = "id_especie", nullable = false)
    @Schema(description = "Id de la especie (ver GET /api/especies en catalogo)", example = "1")
    private Long idEspecie;
}
