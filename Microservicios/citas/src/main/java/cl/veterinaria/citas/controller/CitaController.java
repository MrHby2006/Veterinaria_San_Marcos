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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

// Sin @CrossOrigin: el CORS lo maneja el api-gateway
@RestController
@RequestMapping("/api/citas")
@Tag(name = "Citas", description = "Reservas, pagos, cancelaciones y confirmacion de citas")
public class CitaController {

    private final CitaService service;

    public CitaController(CitaService service) {
        this.service = service;
    }

    // Las rutas protegidas piden ?idUsuario= (el id de quien inicio sesion).
    // El service le pregunta a usuarios su rol y si no corresponde responde 403.

    // El idUsuario viene dentro del body (ReservaDTO)
    @PostMapping
    @Operation(summary = "Reservar hora", description = "Solo Cliente. Si la mascota no existe se crea, y el precio se copia desde catalogo")
    @ApiResponse(responseCode = "201", description = "Cita creada como Pendiente y sin pagar")
    @ApiResponse(responseCode = "400", description = "Datos invalidos, fuera de horario, hora que no es en punto o media, o la mascota ya tiene una cita a esa hora")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es cliente")
    @ApiResponse(responseCode = "503", description = "No se pudo conectar con usuarios o catalogo")
    public ResponseEntity<CitaDTO> reservar(@Valid @RequestBody ReservaDTO datos) {
        CitaDTO creada = service.reservar(datos);
        return ResponseEntity.status(HttpStatus.CREATED).body(creada);
    }

    @GetMapping("/usuario/{idUsuario}")
    @Operation(summary = "Ver mis citas", description = "Pagina Mis Citas. Todas las citas de las mascotas del cliente, ordenadas por fecha y hora")
    @ApiResponse(responseCode = "200", description = "Lista de citas")
    @ApiResponse(responseCode = "403", description = "El usuario no existe o fue eliminado")
    public List<CitaDTO> misCitas(@PathVariable Long idUsuario) {
        return service.misCitas(idUsuario);
    }

    // Solo Recepcionista o Administrador. Ej: GET /api/citas/pagadas?idUsuario=2
    @GetMapping("/pagadas")
    @Operation(summary = "Ver las citas pagadas", description = "Recepcionista o Administrador (Recepcion > Citas). Ordenadas por fecha y hora")
    @ApiResponse(responseCode = "200", description = "Lista de citas pagadas")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es personal de la clinica")
    public List<CitaDTO> citasPagadas(
            @Parameter(description = "Id del usuario que inicio sesion", example = "2") @RequestParam Long idUsuario) {
        return service.citasPagadas(idUsuario);
    }

    // Solo el dueño de la cita. Ej: PUT /api/citas/3/pagar?idUsuario=5
    @PutMapping("/{id}/pagar")
    @Operation(summary = "Pagar una cita", description = "Solo el cliente dueño de la cita (Mis Citas > Ir a pagar)")
    @ApiResponse(responseCode = "200", description = "Cita pagada")
    @ApiResponse(responseCode = "400", description = "La cita esta cancelada o ya estaba pagada")
    @ApiResponse(responseCode = "403", description = "La cita no es de quien lo pide")
    @ApiResponse(responseCode = "404", description = "No existe la cita")
    public ResponseEntity<CitaDTO> pagar(@PathVariable Long id,
            @Parameter(description = "Id del usuario que inicio sesion", example = "5") @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.pagar(id, idUsuario));
    }

    // El dueño (cancela el cliente) o el personal (cancela la clinica).
    // Ej: PUT /api/citas/3/cancelar?idUsuario=5
    @PutMapping("/{id}/cancelar")
    @Operation(summary = "Cancelar una cita", description = "El cliente dueño o el personal. La clinica devuelve el 100%; el cliente recupera el 100% con 3 dias o mas de anticipacion y 0% con menos")
    @ApiResponse(responseCode = "200", description = "Cita cancelada, con el monto del reembolso")
    @ApiResponse(responseCode = "400", description = "La cita ya estaba cancelada o ya paso")
    @ApiResponse(responseCode = "403", description = "La cita no es de quien lo pide")
    @ApiResponse(responseCode = "404", description = "No existe la cita")
    public ResponseEntity<CitaDTO> cancelar(@PathVariable Long id,
            @Parameter(description = "Id del usuario que inicio sesion", example = "5") @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.cancelar(id, idUsuario));
    }

    // Ej: GET /api/citas/3/reembolso?idUsuario=5  ->  15000
    @GetMapping("/{id}/reembolso")
    @Operation(summary = "Ver el reembolso", description = "El cliente dueño o el personal. Muestra cuanto se devolveria si se cancela ahora")
    @ApiResponse(responseCode = "200", description = "Monto en pesos")
    @ApiResponse(responseCode = "400", description = "La cita ya estaba cancelada o ya paso")
    @ApiResponse(responseCode = "403", description = "La cita no es de quien lo pide")
    @ApiResponse(responseCode = "404", description = "No existe la cita")
    public ResponseEntity<Integer> verReembolso(@PathVariable Long id,
            @Parameter(description = "Id del usuario que inicio sesion", example = "5") @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.verReembolso(id, idUsuario));
    }

    // Solo Recepcionista o Administrador
    @PutMapping("/{id}/medico/{idMedico}")
    @Operation(summary = "Asignar un medico", description = "Recepcionista o Administrador. Solo a citas pendientes")
    @ApiResponse(responseCode = "200", description = "Medico asignado")
    @ApiResponse(responseCode = "400", description = "La cita no esta pendiente, el medico no existe o fue eliminado, o ya tiene otra cita a esa hora")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es personal de la clinica")
    @ApiResponse(responseCode = "404", description = "No existe la cita")
    public ResponseEntity<CitaDTO> asignarMedico(@PathVariable Long id, @PathVariable Long idMedico,
            @Parameter(description = "Id del usuario que inicio sesion", example = "2") @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.asignarMedico(id, idMedico, idUsuario));
    }

    // Solo Recepcionista o Administrador
    @PutMapping("/{id}/confirmar")
    @Operation(summary = "Confirmar una cita", description = "Recepcionista o Administrador. La cita tiene que estar pagada y con medico")
    @ApiResponse(responseCode = "200", description = "Cita confirmada")
    @ApiResponse(responseCode = "400", description = "La cita no esta pendiente, no esta pagada, no tiene medico o el medico fue eliminado")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es personal de la clinica")
    @ApiResponse(responseCode = "404", description = "No existe la cita")
    public ResponseEntity<CitaDTO> confirmar(@PathVariable Long id,
            @Parameter(description = "Id del usuario que inicio sesion", example = "2") @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.confirmar(id, idUsuario));
    }
}
