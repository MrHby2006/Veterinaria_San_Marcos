package cl.veterinaria.contenido.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cl.veterinaria.contenido.dto.ConsejoDTO;
import cl.veterinaria.contenido.model.Consejo;
import cl.veterinaria.contenido.service.ConsejoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/consejos")
@Tag(name = "Consejos", description = "Consejos de cuidado de mascotas")
public class ConsejoController {

    private final ConsejoService service;

    public ConsejoController(ConsejoService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Listar consejos", description = "Publico. Pagina Consejos")
    public List<Consejo> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar un consejo", description = "Publico. Detalle del consejo con sus recomendaciones y especies")
    @ApiResponse(responseCode = "404", description = "No existe el consejo")
    public Consejo obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    // Ej: POST /api/consejos?idUsuario=1
    @PostMapping
    @Operation(summary = "Crear un consejo", description = "Solo Administrador")
    @ApiResponse(responseCode = "201", description = "Consejo creado")
    @ApiResponse(responseCode = "400", description = "Datos invalidos, titulo repetido o especie que no existe")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es administrador")
    public ResponseEntity<Consejo> crear(@Valid @RequestBody ConsejoDTO datos,
            @Parameter(description = "Id del usuario que inicio sesion", example = "1") @RequestParam Long idUsuario) {
        Consejo creado = service.crear(datos, idUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    // Ej: PUT /api/consejos/2?idUsuario=1
    @PutMapping("/{id}")
    @Operation(summary = "Editar un consejo", description = "Solo Administrador. Reemplaza las recomendaciones y especies por las nuevas")
    @ApiResponse(responseCode = "200", description = "Consejo actualizado")
    @ApiResponse(responseCode = "400", description = "Datos invalidos, titulo repetido o especie que no existe")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es administrador")
    @ApiResponse(responseCode = "404", description = "No existe el consejo")
    public ResponseEntity<Consejo> actualizar(@PathVariable Long id, @Valid @RequestBody ConsejoDTO datos,
            @Parameter(description = "Id del usuario que inicio sesion", example = "1") @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.actualizar(id, datos, idUsuario));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Borrar un consejo", description = "Solo Administrador. Tambien borra sus recomendaciones")
    @ApiResponse(responseCode = "204", description = "Consejo borrado")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es administrador")
    @ApiResponse(responseCode = "404", description = "No existe el consejo")
    public ResponseEntity<Void> eliminar(@PathVariable Long id,
            @Parameter(description = "Id del usuario que inicio sesion", example = "1") @RequestParam Long idUsuario) {
        service.eliminar(id, idUsuario);
        return ResponseEntity.noContent().build();
    }
}
