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
import jakarta.validation.Valid;

// Sin @CrossOrigin: el CORS lo maneja el api-gateway
@RestController
@RequestMapping("/api/compras")
public class CompraController {

    private final CompraService service;

    public CompraController(CompraService service) {
        this.service = service;
    }

    // Las rutas del cliente usan su idUsuario (en el body o en la ruta) y las de
    // Recepcion piden ?idUsuario=. El service le pregunta a usuarios su rol
    // y si no corresponde responde 403.

    @PostMapping
    public ResponseEntity<CompraDTO> agregarAlCarrito(@Valid @RequestBody AgregarCarritoDTO datos) {
        CompraDTO compra = service.agregarAlCarrito(datos);
        return ResponseEntity.status(HttpStatus.CREATED).body(compra);
    }

    @GetMapping("/carrito/{idUsuario}")
    public List<CompraDTO> verCarrito(@PathVariable Long idUsuario) {
        return service.verCarrito(idUsuario);
    }

    // Solo el dueño del carrito. Ej: DELETE /api/compras/7?idUsuario=5
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> quitarDelCarrito(@PathVariable Long id, @RequestParam Long idUsuario) {
        service.quitarDelCarrito(id, idUsuario);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/pagar/{idUsuario}")
    public ResponseEntity<List<CompraDTO>> pagar(@PathVariable Long idUsuario) {
        return ResponseEntity.ok(service.pagar(idUsuario));
    }

    // Solo Recepcionista o Administrador. Ej: GET /api/compras/pagadas?idUsuario=2
    @GetMapping("/pagadas")
    public List<CompraDTO> comprasPagadas(@RequestParam Long idUsuario) {
        return service.comprasPagadas(idUsuario);
    }

    // Solo Recepcionista o Administrador
    @PutMapping("/{id}/entregar")
    public ResponseEntity<CompraDTO> marcarEntregado(@PathVariable Long id, @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.marcarEntregado(id, idUsuario));
    }
}
