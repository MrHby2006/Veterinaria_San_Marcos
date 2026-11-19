package cl.veterinaria.citas.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

// Lo que envia el admin al agregar un medico
@Data
public class MedicoDTO {

    @NotBlank(message = "Debe ingresar el nombre del medico")
    @Size(max = 50, message = "El nombre puede tener maximo 50 caracteres")
    private String nombre;

    @NotBlank(message = "Debe ingresar el apellido del medico")
    @Size(max = 50, message = "El apellido puede tener maximo 50 caracteres")
    private String apellido;
}
