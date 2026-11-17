package cl.veterinaria.catalogo.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "servicios")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Representa a un servicio veterinario dentro del sistema")
public class Servicios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Id único del servicio", expample = "2")
    private Integer id;

    @Column(nullable = false, unique = true)
    @Schema(description = "Nombre del servicio", expample = "Consulta General")
    private String nombre;

    @Column(nullable = false)
    @Schema(description = "Categoria en la que entra el servicio", expample = "Consultas")
    private String categoria;

    @Column(nullable = false)
    @Schema(description = "Descripción detallada de lo que trata el servicio", expample = "Revisión completa del estado de salud de tu mascota.")
    private String descripcion;

    @Column(nullable = false)
    @Schema(description = "Precio del servicio", expample = "15000")
    private String precio;

    @Column(nullable = false)
    @Schema(description = "Imagen del servicio, es la ruta de la imagen")
    private String imagen;
}