package cl.veterinaria.contenido.model;

import java.util.ArrayList;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "consejo")
@Schema(description = "Consejo de cuidado de mascotas")
public class Consejo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_consejo")
    @Schema(description = "Id unico del consejo", example = "1")
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    @Schema(description = "Titulo del consejo", example = "Alimentación equilibrada y agua fresca")
    private String titulo;

    @Column(nullable = false, length = 50)
    @Schema(description = "Categoria del consejo", example = "Alimentación")
    private String categoria;

    @Column(nullable = false, length = 500)
    @Schema(description = "Texto principal del consejo")
    private String descripcion;

    @Column(nullable = false, length = 500)
    @Schema(description = "Cuando hay que ir al veterinario")
    private String alerta;

    @Column(nullable = false, length = 150)
    @Schema(description = "Ruta de la imagen en el front", example = "/img/Consejos/comida.jpg")
    private String imagen;

    // Un consejo tiene varias recomendaciones (tabla recomendacion, columna id_consejo).
    // cascade + orphanRemoval: al guardar o borrar el consejo, tambien se guardan o borran sus recomendaciones
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "id_consejo", nullable = false)
    @OrderBy("orden")
    @Schema(description = "Recomendaciones del consejo, en orden")
    private List<Recomendacion> recomendaciones = new ArrayList<>();

    // Para que especies es el consejo (tabla consejo_especie).
    // Solo se guarda el id: la tabla ESPECIE esta en catalogo, por eso no hay FK
    @ElementCollection
    @CollectionTable(name = "consejo_especie", joinColumns = @JoinColumn(name = "id_consejo"))
    @Column(name = "id_especie")
    @Schema(description = "Ids de las especies (ver GET /api/especies en catalogo)", example = "[1, 2]")
    private List<Long> idEspecies = new ArrayList<>();
}
