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
    @Schema(description = "Id único del medicamento", example = "3")
    private Integer id;

    @Column(nullable = false)
    @Schema(description = "Tipo de medicamento", example = "Antibióticos")
    private String categoria;

    @Column(name = "nombre_comercial", nullable = false, unique = true)
    @Schema(description = "Nombre con el que se distribuye el medicamento", example = "Amoxibay 250mg")
    private String nombreComercial;

    @Column(name = "principio_activo", nullable = false)
    @Schema(description = "Principio activo del medicamento", example = "Amoxicilina")
    private String principioActivo;

    @Column(nullable = false)
    @Schema(description = "Presentación del medicamento", example = "Blíster 10 comp.")
    private String presentacion;

    @Column(nullable = false)
    @Schema(description = "Especie a la que se le puede dar el medicamento", example = "Perro / Gato")
    private String especie;

    @Column(name = "stock_actual", nullable = false)
    @Schema(description = "Cantidad de stock que queda del medicamento", example = "45")
    private Integer stockActual;

    @Column(name = "precio_unitario", nullable = false)
    @Schema(description = "Precio del medicamento", example = "42000")
    private Integer precioUnitario;

    @Column(nullable = false)
    @Schema(description = "Imagen del medicamento, es la ruta de la imagen")
    private String imagen;
}