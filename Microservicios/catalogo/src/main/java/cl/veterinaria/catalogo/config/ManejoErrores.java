package cl.veterinaria.catalogo.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// Cuando falla un @Valid (ej: @NotBlank, @Email), Spring responde
// "Validation failed for object=..." y el front no puede mostrar eso.
// Esta clase atrapa ese error y responde el mensaje que escribimos en el DTO
// (ej: "Debe ingresar su correo"), con el mismo formato que los demas errores.
@RestControllerAdvice
public class ManejoErrores {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> datosInvalidos(MethodArgumentNotValidException e) {
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("status", 400);
        respuesta.put("error", "Bad Request");
        // Si hay varios errores se muestra el primero, igual que las validaciones del front
        respuesta.put("message", e.getBindingResult().getAllErrors().get(0).getDefaultMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
    }
}
