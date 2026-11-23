package cl.veterinaria.contenido.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.contenido.dto.MensajeDTO;
import cl.veterinaria.contenido.model.Mensaje;
import cl.veterinaria.contenido.repository.MensajeRepository;

@ExtendWith(MockitoExtension.class)
class MensajeServiceTest {

    @Mock private MensajeRepository repository;
    @Mock private PermisoService permisoService;

    @InjectMocks
    private MensajeService service;

    @Test
    void crear_guardaMensajeConEstadoPendiente() {
        MensajeDTO dto = new MensajeDTO();
        dto.setNombre("Ana Torres");
        dto.setCorreo("ana@correo.cl");
        dto.setMensaje("Atienden sabados?");

        when(repository.save(any(Mensaje.class))).thenAnswer(inv -> {
            Mensaje m = inv.getArgument(0);
            m.setId(1L);
            return m;
        });

        Mensaje res = service.crear(dto);
        assertEquals("PENDIENTE", res.getEstado());
        assertEquals("Ana Torres", res.getNombre());
    }

    @Test
    void marcarAtendido_cambiaEstadoAAtendido() {
        Mensaje m = new Mensaje();
        m.setId(1L);
        m.setEstado("PENDIENTE");
        when(repository.findById(1L)).thenReturn(Optional.of(m));
        when(repository.save(m)).thenReturn(m);

        Mensaje res = service.marcarAtendido(1L, 9L);
        assertEquals("ATENDIDO", res.getEstado());
        verify(permisoService).validarPersonal(9L);
    }

    @Test
    void marcarAtendido_rechazaMensajeYaAtendido() {
        Mensaje m = new Mensaje();
        m.setId(1L);
        m.setEstado("ATENDIDO");
        when(repository.findById(1L)).thenReturn(Optional.of(m));

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.marcarAtendido(1L, 9L));
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
    }
}
