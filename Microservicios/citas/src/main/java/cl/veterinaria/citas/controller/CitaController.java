package cl.veterinaria.citas.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cl.veterinaria.citas.dto.CitaDTO;
import cl.veterinaria.citas.dto.ReservaDTO;
import cl.veterinaria.citas.service.CitaService;
import jakarta.validation.Valid;

// Sin @CrossOrigin: el CORS lo maneja el api-gateway
@RestController
@RequestMapping("/api/citas")
public class CitaController {

    private final CitaService service;

    public CitaController(CitaService service) {
        this.service = service;
    }

    // Las rutas protegidas piden ?idUsuario= (el id de quien inicio sesion).
    // El service le pregunta a usuarios su rol y si no corresponde responde 403.

    // El idUsuario viene dentro del body (ReservaDTO)
    @PostMapping
    public ResponseEntity<CitaDTO> reservar(@Valid @RequestBody ReservaDTO datos) {
        CitaDTO creada = service.reservar(datos);
        return ResponseEntity.status(HttpStatus.CREATED).body(creada);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<CitaDTO> misCitas(@PathVariable Long idUsuario) {
        return service.misCitas(idUsuario);
    }

    // Solo Recepcionista o Administrador. Ej: GET /api/citas/pagadas?idUsuario=2
    @GetMapping("/pagadas")
    public List<CitaDTO> citasPagadas(@RequestParam Long idUsuario) {
        return service.citasPagadas(idUsuario);
    }

    // Solo el dueño de la cita. Ej: PUT /api/citas/3/pagar?idUsuario=5
    @PutMapping("/{id}/pagar")
    public ResponseEntity<CitaDTO> pagar(@PathVariable Long id, @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.pagar(id, idUsuario));
    }

    // El dueño (cancela el cliente) o el personal (cancela la clinica).
    // Ej: PUT /api/citas/3/cancelar?idUsuario=5
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<CitaDTO> cancelar(@PathVariable Long id, @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.cancelar(id, idUsuario));
    }

    // Ej: GET /api/citas/3/reembolso?idUsuario=5  ->  15000
    @GetMapping("/{id}/reembolso")
    public ResponseEntity<Integer> verReembolso(@PathVariable Long id, @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.verReembolso(id, idUsuario));
    }

    // Solo Recepcionista o Administrador
    @PutMapping("/{id}/medico/{idMedico}")
    public ResponseEntity<CitaDTO> asignarMedico(@PathVariable Long id, @PathVariable Long idMedico, @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.asignarMedico(id, idMedico, idUsuario));
    }

    // Solo Recepcionista o Administrador
    @PutMapping("/{id}/confirmar")
    public ResponseEntity<CitaDTO> confirmar(@PathVariable Long id, @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.confirmar(id, idUsuario));
    }
}
