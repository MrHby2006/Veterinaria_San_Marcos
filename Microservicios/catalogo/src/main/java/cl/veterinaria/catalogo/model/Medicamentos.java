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
@Table(name = "medicamentos")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Representa a un producto dentro del sistema")
public class Medicamentos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Id único del medicamento", expample = "3")
    private Integer id;

    @Column(nullable = false)
    @Schema(description = "Tipo de medicamento", expample = "Antibióticos")
    private String categoria;

    @Column(nullable = false, unique = true)
    @Schema(description = "Nombre con el que se distribuye el medicamento", expample = "Amoxibay 250mg")
    private String nombre_comercial;

    @Column(nullable = false)
    @Schema(description = "Principio activo del medicamento", expample = "Amoxicilina")
    private String principio_activo;

    @Column(nullable = false)
    @Schema(description = "Presentación del medicamento", expample = "Blíster 10 comp.")
    private String presentación;

    @Column(nullable = false)
    @Schema(description = "Especie a la que se le puede dar el medicamento", expample = "Perro / Gato")
    private String especie;

    @Column(nullable = false)
    @Schema(description = "Cantidad de stock que queda del medicamento", expample = "45")
    private String stock_actual;

    @Column(nullable = false)
    @Schema(description = "Precio del medicamento", expample = "42000")
    private String precio_unitario;

    @Column(nullable = false)
    @Schema(description = "Imagen del medicamento, es la ruta de la imagen")
    private String imagen;
}