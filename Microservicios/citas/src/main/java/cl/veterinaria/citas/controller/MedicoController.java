package cl.veterinaria.citas.controller;

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

import cl.veterinaria.citas.dto.MedicoDTO;
import cl.veterinaria.citas.model.Medico;
import cl.veterinaria.citas.service.MedicoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medicos")
public class MedicoController {

    private final MedicoService service;

    public MedicoController(MedicoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Medico> listar() {
        return service.listar();
    }

    // Crear, editar y eliminar: solo el Administrador (?idUsuario= de quien inicio sesion)
    // Ej: POST /api/medicos?idUsuario=1
    @PostMapping
    public ResponseEntity<Medico> crear(@Valid @RequestBody MedicoDTO datos, @RequestParam Long idUsuario) {
        Medico creado = service.crear(datos, idUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    // Ej: PUT /api/medicos/4?idUsuario=1
    @PutMapping("/{id}")
    public ResponseEntity<Medico> actualizar(@PathVariable Long id, @Valid @RequestBody MedicoDTO datos, @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.actualizar(id, datos, idUsuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id, @RequestParam Long idUsuario) {
        service.eliminar(id, idUsuario);
        return ResponseEntity.noContent().build();
    }
}
