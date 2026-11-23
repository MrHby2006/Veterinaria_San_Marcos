package cl.veterinaria.usuarios.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.usuarios.dto.LoginDTO;
import cl.veterinaria.usuarios.dto.RegistroDTO;
import cl.veterinaria.usuarios.dto.UsuarioActualizarDTO;
import cl.veterinaria.usuarios.dto.UsuarioAdminDTO;
import cl.veterinaria.usuarios.dto.UsuarioDTO;
import cl.veterinaria.usuarios.model.Usuario;
import cl.veterinaria.usuarios.repository.UsuarioRepository;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository repository;

    @Mock
    private BCryptPasswordEncoder encoder;

    @InjectMocks
    private UsuarioService service;

    private Usuario adminActivo;
    private Usuario clienteActivo;

    @BeforeEach
    void setUp() {
        adminActivo = new Usuario();
        adminActivo.setId(1L);
        adminActivo.setNombre("Admin San Marcos");
        adminActivo.setCorreo("admin@sanmarcos.cl");
        adminActivo.setContrasena("$2a$10$hashedAdmin");
        adminActivo.setRol("Administrador");
        adminActivo.setActivo(true);

        clienteActivo = new Usuario();
        clienteActivo.setId(2L);
        clienteActivo.setNombre("Juan Perez");
        clienteActivo.setCorreo("juan@correo.cl");
        clienteActivo.setContrasena("$2a$10$hashedPass");
        clienteActivo.setDireccion("Av. Siempre Viva 123");
        clienteActivo.setRol("Cliente");
        clienteActivo.setActivo(true);
    }

    @Test
    void registrar_creaClienteActivoConContrasenaEncriptada() {
        RegistroDTO dto = new RegistroDTO();
        dto.setNombre("  Juan Perez  ");
        dto.setCorreo("  JUAN@CORREO.CL  ");
        dto.setContrasena("ClaveSegura123");
        dto.setDireccion("  Av. Siempre Viva 123  ");

        when(repository.findByCorreo("juan@correo.cl")).thenReturn(Optional.empty());
        when(encoder.encode("ClaveSegura123")).thenReturn("$2a$10$encoded");
        when(repository.save(any(Usuario.class))).thenAnswer(inv -> {
            Usuario u = inv.getArgument(0);
            u.setId(10L);
            return u;
        });

        UsuarioDTO res = service.registrar(dto);

        assertEquals(10L, res.getId());
        assertEquals("Juan Perez", res.getNombre());
        assertEquals("juan@correo.cl", res.getCorreo());
        assertEquals("Cliente", res.getRol());
        assertTrue(res.getActivo());
        verify(encoder).encode("ClaveSegura123");
    }

    @Test
    void registrar_lanzaBadRequestSiCorreoYaExiste() {
        RegistroDTO dto = new RegistroDTO();
        dto.setNombre("Juan");
        dto.setCorreo("juan@correo.cl");
        dto.setContrasena("ClaveSegura123");
        dto.setDireccion("Calle 1");

        when(repository.findByCorreo("juan@correo.cl")).thenReturn(Optional.of(clienteActivo));

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.registrar(dto));
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
        verify(repository, never()).save(any());
    }

    @Test
    void login_exitosoRetornaUsuarioDTO() {
        LoginDTO dto = new LoginDTO();
        dto.setCorreo("juan@correo.cl");
        dto.setContrasena("ClaveSegura123");

        when(repository.findByCorreo("juan@correo.cl")).thenReturn(Optional.of(clienteActivo));
        when(encoder.matches("ClaveSegura123", clienteActivo.getContrasena())).thenReturn(true);

        UsuarioDTO res = service.login(dto);
        assertEquals(2L, res.getId());
        assertEquals("Cliente", res.getRol());
    }

    @Test
    void login_credencialesInvalidasLanzaUnauthorized() {
        LoginDTO dto = new LoginDTO();
        dto.setCorreo("juan@correo.cl");
        dto.setContrasena("ClaveMala");

        when(repository.findByCorreo("juan@correo.cl")).thenReturn(Optional.of(clienteActivo));
        when(encoder.matches("ClaveMala", clienteActivo.getContrasena())).thenReturn(false);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.login(dto));
        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }

    @Test
    void login_usuarioInactivoLanzaForbidden() {
        clienteActivo.setActivo(false);
        LoginDTO dto = new LoginDTO();
        dto.setCorreo("juan@correo.cl");
        dto.setContrasena("ClaveSegura123");

        when(repository.findByCorreo("juan@correo.cl")).thenReturn(Optional.of(clienteActivo));
        when(encoder.matches("ClaveSegura123", clienteActivo.getContrasena())).thenReturn(true);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.login(dto));
        assertEquals(HttpStatus.FORBIDDEN, ex.getStatusCode());
    }

    @Test
    void actualizar_impideQueAdminCambieSuPropioRol() {
        when(repository.findById(1L)).thenReturn(Optional.of(adminActivo));

        UsuarioActualizarDTO dto = new UsuarioActualizarDTO();
        dto.setNombre("Admin");
        dto.setCorreo("admin@sanmarcos.cl");
        dto.setRol("Cliente");

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.actualizar(1L, dto, 1L));
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
    }

    @Test
    void eliminar_desactivaUsuarioSinBorrarFila() {
        when(repository.findById(1L)).thenReturn(Optional.of(adminActivo));
        when(repository.findById(2L)).thenReturn(Optional.of(clienteActivo));

        service.eliminar(2L, 1L);

        assertFalse(clienteActivo.getActivo());
        verify(repository).save(clienteActivo);
    }

    @Test
    void eliminar_impideAutoEliminacionDelAdmin() {
        when(repository.findById(1L)).thenReturn(Optional.of(adminActivo));

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.eliminar(1L, 1L));
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
    }

    @Test
    void listar_requiereRolAdministrador() {
        when(repository.findById(2L)).thenReturn(Optional.of(clienteActivo));

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.listar(2L));
        assertEquals(HttpStatus.FORBIDDEN, ex.getStatusCode());
    }

    @Test
    void crear_conAdminValidoCreaUsuarioConRolIndicado() {
        when(repository.findById(1L)).thenReturn(Optional.of(adminActivo));
        when(repository.findByCorreo("recep@vet.cl")).thenReturn(Optional.empty());
        when(encoder.encode("Recep1234")).thenReturn("hash");
        when(repository.save(any(Usuario.class))).thenAnswer(inv -> {
            Usuario u = inv.getArgument(0);
            u.setId(5L);
            return u;
        });

        UsuarioAdminDTO dto = new UsuarioAdminDTO();
        dto.setNombre("Ana Soto");
        dto.setCorreo("recep@vet.cl");
        dto.setContrasena("Recep1234");
        dto.setRol("Recepcionista");

        UsuarioDTO res = service.crear(dto, 1L);
        assertEquals("Recepcionista", res.getRol());
        assertEquals(List.of(), List.of());
    }
}
