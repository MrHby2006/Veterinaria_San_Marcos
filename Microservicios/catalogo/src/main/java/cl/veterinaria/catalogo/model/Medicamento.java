package cl.veterinaria.catalogo.model;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "medicamento")
@Schema(description = "Medicamento que se vende en la tienda")
public class Medicamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_medicamento")
    @Schema(description = "Id unico del medicamento", example = "1")
    private Long id;

    @Column(name = "nombre_comercial", nullable = false, unique = true, length = 100)
    @Schema(description = "Nombre con el que se vende", example = "Amoxibay 250mg")
    private String nombreComercial;

    @Column(name = "principio_activo", nullable = false, length = 100)
    @Schema(description = "Principio activo", example = "Amoxicilina")
    private String principioActivo;

    @Column(nullable = false, length = 50)
    @Schema(description = "Presentacion del medicamento", example = "Blíster 10 comp.")
    private String presentacion;

    @Column(nullable = false, length = 30)
    @Schema(description = "Tipo de medicamento", example = "Antibióticos")
    private String categoria;

    @Column(name = "precio_unitario", nullable = false)
    @Schema(description = "Precio en pesos, sin decimales", example = "4200")
    private Integer precioUnitario;

    @Column(name = "stock_actual", nullable = false)
    @Schema(description = "Unidades disponibles", example = "45")
    private Integer stockActual;

    @Column(nullable = false, length = 150)
    @Schema(description = "Ruta de la imagen en el front", example = "/img/Medicamentos/Amoxibay.jpg")
    private String imagen;

    // Un medicamento sirve para una o varias especies (tabla medicamento_especie).
    // Asi "Perro / Gato" no queda escrito como texto en una sola columna.
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "medicamento_especie",
        joinColumns = @JoinColumn(name = "id_medicamento"),
        inverseJoinColumns = @JoinColumn(name = "id_especie")
    )
    @Schema(description = "Especies para las que sirve el medicamento")
    private List<Especie> especies;
}
