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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

// Sin @CrossOrigin: el CORS lo maneja el api-gateway
@RestController
@RequestMapping("/api/usuarios")
@Tag(name = "Usuarios", description = "Registro, inicio de sesion y mantenedor de usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/registro")
    @Operation(summary = "Registrarse", description = "Publico. Formulario de Registro, siempre crea un Cliente")
    @ApiResponse(responseCode = "201", description = "Cuenta creada")
    @ApiResponse(responseCode = "400", description = "Datos invalidos o el correo ya tiene una cuenta")
    public ResponseEntity<UsuarioDTO> registrar(@Valid @RequestBody RegistroDTO datos) {
        UsuarioDTO creado = service.registrar(datos);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesion", description = "Publico. Formulario de Login, compara la contraseña con la encriptada")
    @ApiResponse(responseCode = "200", description = "Datos del usuario, sin la contraseña")
    @ApiResponse(responseCode = "400", description = "Falta un dato o el correo no es valido")
    @ApiResponse(responseCode = "401", description = "Correo o contraseña incorrectos")
    @ApiResponse(responseCode = "403", description = "La cuenta fue desactivada")
    public ResponseEntity<UsuarioDTO> login(@Valid @RequestBody LoginDTO datos) {
        return ResponseEntity.ok(service.login(datos));
    }

    // Las rutas del admin piden ?idAdmin= (el id de quien inicio sesion).
    // El service revisa en la base de datos que de verdad sea Administrador.
    // Ej: GET /api/usuarios?idAdmin=1
    @GetMapping
    @Operation(summary = "Listar usuarios", description = "Solo Administrador (Admin > Usuarios). No muestra los eliminados")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios activos")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es administrador")
    public List<UsuarioDTO> listar(
            @Parameter(description = "Id del administrador que inicio sesion", example = "1") @RequestParam Long idAdmin) {
        return service.listar(idAdmin);
    }

    // Sin idAdmin: la usan citas y ventas para revisar que el usuario exista y ver su rol
    @GetMapping("/{id}")
    @Operation(summary = "Buscar un usuario", description = "Interno: lo usan los otros microservicios para revisar que el usuario exista y ver su rol")
    @ApiResponse(responseCode = "200", description = "Datos del usuario, sin la contraseña")
    @ApiResponse(responseCode = "404", description = "No existe el usuario")
    public ResponseEntity<UsuarioDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    @Operation(summary = "Agregar un usuario", description = "Solo Administrador (Admin > Usuarios). Puede elegir el tipo de usuario")
    @ApiResponse(responseCode = "201", description = "Usuario creado")
    @ApiResponse(responseCode = "400", description = "Datos invalidos, correo repetido o tipo de usuario que no existe")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es administrador")
    public ResponseEntity<UsuarioDTO> crear(@Valid @RequestBody UsuarioAdminDTO datos,
            @Parameter(description = "Id del administrador que inicio sesion", example = "1") @RequestParam Long idAdmin) {
        UsuarioDTO creado = service.crear(datos, idAdmin);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar un usuario", description = "Solo Administrador. Cambia nombre, correo y tipo; la contraseña no se toca")
    @ApiResponse(responseCode = "200", description = "Usuario actualizado")
    @ApiResponse(responseCode = "400", description = "Datos invalidos, correo de otra persona, usuario eliminado o intenta cambiar su propio tipo")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es administrador")
    @ApiResponse(responseCode = "404", description = "No existe el usuario")
    public ResponseEntity<UsuarioDTO> actualizar(@PathVariable Long id, @Valid @RequestBody UsuarioActualizarDTO datos,
            @Parameter(description = "Id del administrador que inicio sesion", example = "1") @RequestParam Long idAdmin) {
        return ResponseEntity.ok(service.actualizar(id, datos, idAdmin));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un usuario", description = "Solo Administrador. No se borra: queda desactivado para conservar sus citas y compras")
    @ApiResponse(responseCode = "204", description = "Usuario desactivado")
    @ApiResponse(responseCode = "400", description = "Ya estaba eliminado o intenta eliminar su propia cuenta")
    @ApiResponse(responseCode = "403", description = "Quien lo pide no es administrador")
    @ApiResponse(responseCode = "404", description = "No existe el usuario")
    public ResponseEntity<Void> eliminar(@PathVariable Long id,
            @Parameter(description = "Id del administrador que inicio sesion", example = "1") @RequestParam Long idAdmin) {
        service.eliminar(id, idAdmin);
        return ResponseEntity.noContent().build();
    }
}
