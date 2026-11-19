package cl.veterinaria.catalogo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.veterinaria.catalogo.model.Especie;
import cl.veterinaria.catalogo.service.EspecieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/especies")
@Tag(name = "Especies", description = "Especies de mascotas que atiende la clinica")
public class EspecieController {

    private final EspecieService service;

    public EspecieController(EspecieService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Listar especies", description = "Publico. Se usa en el select de Reservar hora y en el filtro de Medicamentos")
    public List<Especie> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar una especie", description = "Publico. Lo usa contenido para revisar las especies de un consejo")
    @ApiResponse(responseCode = "404", description = "No existe la especie")
    public Especie obtener(@PathVariable Long id) {
        return service.obtener(id);
    }
}
