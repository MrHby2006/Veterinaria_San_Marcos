package cl.veterinaria.catalogo.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "medicamento_especie")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Representa cuando filtran medicamentos por la especie correspondiente")
public class Medicamento_Especie {
    @Column(nullable = false)
    @Schema(description = "Id del medicamento mostrado")
    private Integer IdMedicamento;

    @Column(nullable = false)
    @Schema(description = "Id de la especie filtrada")
    private Integer IdEspecie;
}
