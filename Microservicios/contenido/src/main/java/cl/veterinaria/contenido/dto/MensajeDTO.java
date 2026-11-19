package cl.veterinaria.contenido.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

// Lo que envia el formulario de Contacto (mismas validaciones que el front)
@Data
public class MensajeDTO {

    @NotBlank(message = "Debe ingresar su nombre")
    @Size(max = 100, message = "El nombre puede tener maximo 100 caracteres")
    @Schema(example = "Ana Torres")
    private String nombre;

    @NotBlank(message = "Debe ingresar su correo")
    @Email(message = "Ingrese un correo valido")
    @Size(max = 100, message = "El correo puede tener maximo 100 caracteres")
    @Schema(example = "ana@correo.cl")
    private String correo;

    @NotBlank(message = "Debe ingresar un mensaje")
    @Size(max = 1000, message = "El mensaje puede tener maximo 1000 caracteres")
    @Schema(example = "¿Atienden los domingos?")
    private String mensaje;
}
