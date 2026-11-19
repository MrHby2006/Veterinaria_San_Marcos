package cl.veterinaria.usuarios.controller;

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

import cl.veterinaria.usuarios.dto.LoginDTO;
import cl.veterinaria.usuarios.dto.RegistroDTO;
import cl.veterinaria.usuarios.dto.UsuarioActualizarDTO;
import cl.veterinaria.usuarios.dto.UsuarioAdminDTO;
import cl.veterinaria.usuarios.dto.UsuarioDTO;
import cl.veterinaria.usuarios.service.UsuarioService;
import jakarta.validation.Valid;

// Sin @CrossOrigin: el CORS lo maneja el api-gateway
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/registro")
    public ResponseEntity<UsuarioDTO> registrar(@Valid @RequestBody RegistroDTO datos) {
        UsuarioDTO creado = service.registrar(datos);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> login(@Valid @RequestBody LoginDTO datos) {
        return ResponseEntity.ok(service.login(datos));
    }

    // Las rutas del admin piden ?idAdmin= (el id de quien inicio sesion).
    // El service revisa en la base de datos que de verdad sea Administrador.
    // Ej: GET /api/usuarios?idAdmin=1
    @GetMapping
    public List<UsuarioDTO> listar(@RequestParam Long idAdmin) {
        return service.listar(idAdmin);
    }

    // Sin idAdmin: la usan citas y ventas para revisar que el usuario exista y ver su rol
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> crear(@Valid @RequestBody UsuarioAdminDTO datos, @RequestParam Long idAdmin) {
        UsuarioDTO creado = service.crear(datos, idAdmin);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> actualizar(@PathVariable Long id, @Valid @RequestBody UsuarioActualizarDTO datos, @RequestParam Long idAdmin) {
        return ResponseEntity.ok(service.actualizar(id, datos, idAdmin));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id, @RequestParam Long idAdmin) {
        service.eliminar(id, idAdmin);
        return ResponseEntity.noContent().build();
    }
}
