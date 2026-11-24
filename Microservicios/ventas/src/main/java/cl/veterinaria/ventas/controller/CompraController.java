package cl.veterinaria.ventas.controller;

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

import cl.veterinaria.ventas.dto.AgregarCarritoDTO;
import cl.veterinaria.ventas.dto.CompraDTO;
import cl.veterinaria.ventas.service.CompraService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

// Sin @CrossOrigin: el CORS lo maneja el api-gateway
@RestController
@RequestMapping("/api/compras")
@Tag(name = "Compras", description = "Carrito, pago y retiro de medicamentos")
public class CompraController {

    private final CompraService service;

    public CompraController(CompraService service) {
        this.service = service;
    }

    // Las rutas del cliente usan su idUsuario (en el body o en la ruta) y las de
    // Recepcion piden ?idUsuario=. El service le pregunta a usuarios su rol
    // y si no corresponde responde 403.

    @PostMapping
    @Operation(summary = "Añadir al carrito", description = "Solo Cliente. Si el medicamento ya estaba en el carrito se suma la cantidad; el precio se copia desde catalogo")
    @ApiResponse(responseCode = "201", description = "Producto en el carrito")
    @ApiResponse(responseCode = "400", description = "Cantidad invalida, no existe el medicamento o no hay stock suficiente")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es cliente")
    @ApiResponse(responseCode = "503", description = "No se pudo conectar con usuarios o catalogo")
    public ResponseEntity<CompraDTO> agregarAlCarrito(@Valid @RequestBody AgregarCarritoDTO datos) {
        CompraDTO compra = service.agregarAlCarrito(datos);
        return ResponseEntity.status(HttpStatus.CREATED).body(compra);
    }

    @GetMapping("/carrito/{idUsuario}")
    @Operation(summary = "Ver el carrito", description = "Solo Cliente. Lo que todavia no paga")
    @ApiResponse(responseCode = "200", description = "Productos del carrito")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es cliente")
    public List<CompraDTO> verCarrito(@PathVariable Long idUsuario) {
        return service.verCarrito(idUsuario);
    }

    // Solo el dueño del carrito. Ej: DELETE /api/compras/7?idUsuario=5
    @DeleteMapping("/{id}")
    @Operation(summary = "Quitar del carrito", description = "Solo el cliente dueño del carrito")
    @ApiResponse(responseCode = "204", description = "Producto quitado")
    @ApiResponse(responseCode = "400", description = "El producto ya estaba pagado")
    @ApiResponse(responseCode = "403", description = "El producto no esta en su carrito")
    @ApiResponse(responseCode = "404", description = "No existe la compra")
    public ResponseEntity<Void> quitarDelCarrito(@PathVariable Long id,
            @Parameter(description = "Id del usuario que inicio sesion", example = "5") @RequestParam Long idUsuario) {
        service.quitarDelCarrito(id, idUsuario);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/pagar/{idUsuario}")
    @Operation(summary = "Pagar el carrito", description = "Solo Cliente. Revisa todo el stock antes de descontarlo en catalogo")
    @ApiResponse(responseCode = "200", description = "Carrito pagado")
    @ApiResponse(responseCode = "400", description = "El carrito esta vacio o no hay stock suficiente")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es cliente")
    public ResponseEntity<List<CompraDTO>> pagar(@PathVariable Long idUsuario) {
        return ResponseEntity.ok(service.pagar(idUsuario));
    }

    // Solo Recepcionista o Administrador. Ej: GET /api/compras/pagadas?idUsuario=2
    @GetMapping("/pagadas")
    @Operation(summary = "Ver las compras pagadas", description = "Recepcionista o Administrador (Recepcion > Retiro de medicamentos). Las mas nuevas primero")
    @ApiResponse(responseCode = "200", description = "Lista de compras pagadas")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es personal de la clinica")
    public List<CompraDTO> comprasPagadas(
            @Parameter(description = "Id del usuario que inicio sesion", example = "2") @RequestParam Long idUsuario) {
        return service.comprasPagadas(idUsuario);
    }

    // Solo Recepcionista o Administrador
    @PutMapping("/{id}/entregar")
    @Operation(summary = "Marcar como entregado", description = "Recepcionista o Administrador. Cuando el cliente retira el medicamento")
    @ApiResponse(responseCode = "200", description = "Medicamento entregado")
    @ApiResponse(responseCode = "400", description = "No esta pagado o ya fue entregado")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es personal de la clinica")
    @ApiResponse(responseCode = "404", description = "No existe la compra")
    public ResponseEntity<CompraDTO> marcarEntregado(@PathVariable Long id,
            @Parameter(description = "Id del usuario que inicio sesion", example = "2") @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.marcarEntregado(id, idUsuario));
    }
}
