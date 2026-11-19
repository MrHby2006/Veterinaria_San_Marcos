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
import cl.veterinaria.catalogo.model.Medicamento;
import cl.veterinaria.catalogo.service.MedicamentoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medicamentos")
@Tag(name = "Medicamentos", description = "Medicamentos de la tienda, precios y stock")
public class MedicamentoController {

    private final MedicamentoService service;

    public MedicamentoController(MedicamentoService service) {
        this.service = service;
    }

    // Ej: GET /api/medicamentos  o  GET /api/medicamentos?idEspecie=2
    @GetMapping
    @Operation(summary = "Listar medicamentos", description = "Publico. Se puede filtrar por especie")
    public List<Medicamento> listar(
            @Parameter(description = "Id de la especie a filtrar (opcional)", example = "1")
            @RequestParam(required = false) Long idEspecie) {
        return service.listar(idEspecie);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar un medicamento", description = "Publico. Detalle del medicamento; lo usa ventas para saber precio y stock")
    @ApiResponse(responseCode = "404", description = "No existe el medicamento")
    public Medicamento obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    // Ej: PUT /api/medicamentos/1?idUsuario=1   con   { "precio": 4500 }
    @PutMapping("/{id}")
    @Operation(summary = "Cambiar el precio de un medicamento", description = "Solo Administrador (Admin > Precios)")
    @ApiResponse(responseCode = "200", description = "Precio actualizado")
    @ApiResponse(responseCode = "400", description = "Precio invalido")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es administrador")
    @ApiResponse(responseCode = "404", description = "No existe el medicamento")
    public ResponseEntity<Medicamento> cambiarPrecio(@PathVariable Long id, @Valid @RequestBody PrecioDTO datos,
            @Parameter(description = "Id del usuario que inicio sesion", example = "1") @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.cambiarPrecio(id, datos, idUsuario));
    }

    // Ej: PUT /api/medicamentos/3/stock?cantidad=2
    @PutMapping("/{id}/stock")
    @Operation(summary = "Descontar stock", description = "Interno: lo llama ventas al pagar el carrito (ventas ya valido al cliente)")
    @ApiResponse(responseCode = "200", description = "Stock descontado")
    @ApiResponse(responseCode = "400", description = "Cantidad invalida o no hay stock suficiente")
    @ApiResponse(responseCode = "404", description = "No existe el medicamento")
    public ResponseEntity<Medicamento> descontarStock(@PathVariable Long id,
            @Parameter(description = "Unidades a descontar", example = "2") @RequestParam Integer cantidad) {
        return ResponseEntity.ok(service.descontarStock(id, cantidad));
    }
}
