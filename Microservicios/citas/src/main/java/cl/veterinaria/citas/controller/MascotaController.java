package cl.veterinaria.citas.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.veterinaria.citas.model.Mascota;
import cl.veterinaria.citas.service.MascotaService;

// Las mascotas se crean solas al reservar (CitaService), aqui solo se listan
@RestController
@RequestMapping("/api/mascotas")
public class MascotaController {

    private final MascotaService service;

    public MascotaController(MascotaService service) {
        this.service = service;
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Mascota> listarPorUsuario(@PathVariable Long idUsuario) {
        return service.listarPorUsuario(idUsuario);
    }
}
