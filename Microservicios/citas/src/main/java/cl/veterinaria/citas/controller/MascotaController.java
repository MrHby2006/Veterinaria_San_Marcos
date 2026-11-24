package cl.veterinaria.citas.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.veterinaria.citas.model.Mascota;
import cl.veterinaria.citas.service.MascotaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

// Las mascotas se crean solas al reservar (CitaService), aqui solo se listan
@RestController
@RequestMapping("/api/mascotas")
@Tag(name = "Mascotas", description = "Mascotas de los clientes (se crean solas al reservar)")
public class MascotaController {

    private final MascotaService service;

    public MascotaController(MascotaService service) {
        this.service = service;
    }

    @GetMapping("/usuario/{idUsuario}")
    @Operation(summary = "Listar las mascotas de un cliente", description = "Publico. Si el cliente no tiene mascotas devuelve una lista vacia")
    @ApiResponse(responseCode = "200", description = "Lista de mascotas")
    public List<Mascota> listarPorUsuario(@PathVariable Long idUsuario) {
        return service.listarPorUsuario(idUsuario);
    }
}
