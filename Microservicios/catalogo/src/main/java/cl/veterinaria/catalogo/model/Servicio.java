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
@Table(name = "servicio")
@Schema(description = "Servicio veterinario que se puede reservar")
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_servicio")
    @Schema(description = "Id unico del servicio", example = "1")
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    @Schema(description = "Nombre del servicio", example = "Consulta general")
    private String nombre;

    @Column(nullable = false, length = 255)
    @Schema(description = "Descripcion de lo que incluye el servicio", example = "Revisión completa del estado de salud de tu mascota.")
    private String descripcion;

    @Column(nullable = false, length = 30)
    @Schema(description = "Categoria del servicio", example = "Consultas")
    private String categoria;

    @Column(nullable = false)
    @Schema(description = "Precio en pesos, sin decimales", example = "15000")
    private Integer precio;

    @Column(nullable = false, length = 150)
    @Schema(description = "Ruta de la imagen en el front", example = "/img/Servicios/consulta.jpg")
    private String imagen;
}
