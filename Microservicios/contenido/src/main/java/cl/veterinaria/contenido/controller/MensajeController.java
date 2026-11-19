package cl.veterinaria.contenido.controller;

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

import cl.veterinaria.contenido.dto.MensajeDTO;
import cl.veterinaria.contenido.model.Mensaje;
import cl.veterinaria.contenido.service.MensajeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

// La ruta es /api/contactos porque asi quedo en el API Gateway
@RestController
@RequestMapping("/api/contactos")
@Tag(name = "Contacto", description = "Mensajes del formulario de Contacto")
public class MensajeController {

    private final MensajeService service;

    public MensajeController(MensajeService service) {
        this.service = service;
    }

    @PostMapping
    @Operation(summary = "Enviar un mensaje", description = "Publico. Formulario de Contacto, no hace falta iniciar sesion")
    @ApiResponse(responseCode = "201", description = "Mensaje guardado como PENDIENTE")
    @ApiResponse(responseCode = "400", description = "Falta un dato o el correo no es valido")
    public ResponseEntity<Mensaje> crear(@Valid @RequestBody MensajeDTO datos) {
        Mensaje creado = service.crear(datos);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    // Ej: GET /api/contactos?idUsuario=2  o  GET /api/contactos?idUsuario=2&estado=PENDIENTE
    @GetMapping
    @Operation(summary = "Ver los mensajes", description = "Recepcionista o Administrador. Los mas nuevos primero")
    @ApiResponse(responseCode = "400", description = "Estado distinto de PENDIENTE o ATENDIDO")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es personal de la clinica")
    public List<Mensaje> listar(
            @Parameter(description = "PENDIENTE o ATENDIDO (opcional)", example = "PENDIENTE") @RequestParam(required = false) String estado,
            @Parameter(description = "Id del usuario que inicio sesion", example = "2") @RequestParam Long idUsuario) {
        return service.listar(estado, idUsuario);
    }

    // Ej: PUT /api/contactos/5/estado?idUsuario=2
    @PutMapping("/{id}/estado")
    @Operation(summary = "Marcar como atendido", description = "Recepcionista o Administrador. Cambia el estado a ATENDIDO")
    @ApiResponse(responseCode = "200", description = "Mensaje atendido")
    @ApiResponse(responseCode = "400", description = "El mensaje ya estaba atendido")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es personal de la clinica")
    @ApiResponse(responseCode = "404", description = "No existe el mensaje")
    public ResponseEntity<Mensaje> marcarAtendido(@PathVariable Long id,
            @Parameter(description = "Id del usuario que inicio sesion", example = "2") @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.marcarAtendido(id, idUsuario));
    }
}
