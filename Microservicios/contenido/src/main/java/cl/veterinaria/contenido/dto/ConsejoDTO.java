package cl.veterinaria.contenido.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

// Lo que envia el admin al crear o editar un consejo
@Data
public class ConsejoDTO {

    @NotBlank(message = "Debe ingresar el titulo")
    @Size(max = 100, message = "El titulo puede tener maximo 100 caracteres")
    @Schema(example = "Higiene dental")
    private String titulo;

    @NotBlank(message = "Debe ingresar la categoria")
    @Size(max = 50, message = "La categoria puede tener maximo 50 caracteres")
    @Schema(example = "Salud preventiva")
    private String categoria;

    @NotBlank(message = "Debe ingresar la descripcion")
    @Size(max = 500, message = "La descripcion puede tener maximo 500 caracteres")
    @Schema(example = "Cepilla los dientes de tu mascota varias veces por semana.")
    private String descripcion;

    @NotBlank(message = "Debe ingresar la alerta")
    @Size(max = 500, message = "La alerta puede tener maximo 500 caracteres")
    @Schema(example = "Si tiene mal aliento fuerte o le sangran las encias, consulta al veterinario.")
    private String alerta;

    @NotBlank(message = "Debe ingresar la ruta de la imagen")
    @Size(max = 150, message = "La ruta de la imagen puede tener maximo 150 caracteres")
    @Schema(example = "/img/Consejos/chequeo.jpg")
    private String imagen;

    @NotEmpty(message = "Debe ingresar al menos una recomendacion")
    @Size(max = 10, message = "Puede ingresar maximo 10 recomendaciones")
    @Schema(example = "[\"Usa pasta dental para mascotas\", \"Revisa sus dientes una vez al mes\"]")
    private List<String> recomendaciones;

    @NotEmpty(message = "Debe elegir al menos una especie")
    @Schema(description = "Ids de especies de catalogo", example = "[1, 2]")
    private List<Long> idEspecies;
}
