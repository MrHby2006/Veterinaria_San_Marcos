package cl.veterinaria.catalogo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cl.veterinaria.catalogo.dto.PrecioDTO;
import cl.veterinaria.catalogo.model.Servicio;
import cl.veterinaria.catalogo.service.ServicioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/servicios")
@Tag(name = "Servicios", description = "Servicios veterinarios y sus precios")
public class ServicioController {

    private final ServicioService service;

    public ServicioController(ServicioService service) {
        this.service = service;
    }

    // Ej: GET /api/servicios  o  GET /api/servicios?categoria=Cirugía
    @GetMapping
    @Operation(summary = "Listar servicios", description = "Publico. Se puede filtrar por categoria")
    public List<Servicio> listar(
            @Parameter(description = "Categoria a filtrar (opcional)", example = "Consultas")
            @RequestParam(required = false) String categoria) {
        return service.listar(categoria);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar un servicio", description = "Publico. Lo usa citas para copiar el precio al reservar")
    @ApiResponse(responseCode = "404", description = "No existe el servicio")
    public Servicio obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    // Ej: PUT /api/servicios/1?idUsuario=1   con   { "precio": 16000 }
    @PutMapping("/{id}")
    @Operation(summary = "Cambiar el precio de un servicio", description = "Solo Administrador (Admin > Precios)")
    @ApiResponse(responseCode = "200", description = "Precio actualizado")
    @ApiResponse(responseCode = "400", description = "Precio invalido")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es administrador")
    @ApiResponse(responseCode = "404", description = "No existe el servicio")
    public ResponseEntity<Servicio> cambiarPrecio(@PathVariable Long id, @Valid @RequestBody PrecioDTO datos,
            @Parameter(description = "Id del usuario que inicio sesion", example = "1") @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.cambiarPrecio(id, datos, idUsuario));
    }
}
