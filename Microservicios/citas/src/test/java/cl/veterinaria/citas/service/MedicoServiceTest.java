package cl.veterinaria.citas.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import cl.veterinaria.citas.dto.MedicoDTO;
import cl.veterinaria.citas.model.Medico;
import cl.veterinaria.citas.repository.MedicoRepository;

@ExtendWith(MockitoExtension.class)
class MedicoServiceTest {

    @Mock
    private MedicoRepository repository;

    @Mock
    private PermisoService permisoService;

    @InjectMocks
    private MedicoService service;

    @Test
    void crear_registraMedicoActivo() {
        MedicoDTO dto = new MedicoDTO();
        dto.setNombre("  Carlos  ");
        dto.setApellido("  Soto  ");

        when(repository.save(any(Medico.class))).thenAnswer(inv -> {
            Medico m = inv.getArgument(0);
            m.setId(4L);
            return m;
        });

        Medico res = service.crear(dto, 1L);
        assertEquals(4L, res.getId());
        assertEquals("Carlos", res.getNombre());
        assertEquals("Soto", res.getApellido());
        assertTrue(res.getActivo());
        verify(permisoService).validarAdmin(1L);
    }

    @Test
    void eliminar_marcaActivoEnFalse() {
        Medico medico = new Medico();
        medico.setId(4L);
        medico.setActivo(true);
        when(repository.findById(4L)).thenReturn(Optional.of(medico));

        service.eliminar(4L, 1L);
        assertFalse(medico.getActivo());
        verify(repository).save(medico);
    }
}
