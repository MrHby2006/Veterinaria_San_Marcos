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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medicos")
@Tag(name = "Medicos", description = "Medicos veterinarios que atienden las citas")
public class MedicoController {

    private final MedicoService service;

    public MedicoController(MedicoService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Listar medicos", description = "Publico. Solo los activos, se usa en el select de Recepcion")
    @ApiResponse(responseCode = "200", description = "Lista de medicos activos")
    public List<Medico> listar() {
        return service.listar();
    }

    // Crear, editar y eliminar: solo el Administrador (?idUsuario= de quien inicio sesion)
    // Ej: POST /api/medicos?idUsuario=1
    @PostMapping
    @Operation(summary = "Agregar un medico", description = "Solo Administrador (Admin > Medicos)")
    @ApiResponse(responseCode = "201", description = "Medico creado")
    @ApiResponse(responseCode = "400", description = "Falta el nombre o el apellido")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es administrador")
    public ResponseEntity<Medico> crear(@Valid @RequestBody MedicoDTO datos,
            @Parameter(description = "Id del usuario que inicio sesion", example = "1") @RequestParam Long idUsuario) {
        Medico creado = service.crear(datos, idUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    // Ej: PUT /api/medicos/4?idUsuario=1
    @PutMapping("/{id}")
    @Operation(summary = "Editar un medico", description = "Solo Administrador. Cambia el nombre y el apellido")
    @ApiResponse(responseCode = "200", description = "Medico actualizado")
    @ApiResponse(responseCode = "400", description = "Datos invalidos o el medico fue eliminado")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es administrador")
    @ApiResponse(responseCode = "404", description = "No existe el medico")
    public ResponseEntity<Medico> actualizar(@PathVariable Long id, @Valid @RequestBody MedicoDTO datos,
            @Parameter(description = "Id del usuario que inicio sesion", example = "1") @RequestParam Long idUsuario) {
        return ResponseEntity.ok(service.actualizar(id, datos, idUsuario));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un medico", description = "Solo Administrador. No se borra: queda desactivado para conservar sus citas")
    @ApiResponse(responseCode = "204", description = "Medico desactivado")
    @ApiResponse(responseCode = "400", description = "El medico ya estaba eliminado")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es administrador")
    @ApiResponse(responseCode = "404", description = "No existe el medico")
    public ResponseEntity<Void> eliminar(@PathVariable Long id,
            @Parameter(description = "Id del usuario que inicio sesion", example = "1") @RequestParam Long idUsuario) {
        service.eliminar(id, idUsuario);
        return ResponseEntity.noContent().build();
    }
}
