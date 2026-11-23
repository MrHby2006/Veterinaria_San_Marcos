package cl.veterinaria.contenido.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.contenido.client.CatalogoClient;
import cl.veterinaria.contenido.dto.ConsejoDTO;
import cl.veterinaria.contenido.model.Consejo;
import cl.veterinaria.contenido.repository.ConsejoRepository;

@ExtendWith(MockitoExtension.class)
class ConsejoServiceTest {

    @Mock private ConsejoRepository repository;
    @Mock private PermisoService permisoService;
    @Mock private CatalogoClient catalogoClient;

    @InjectMocks
    private ConsejoService service;

    @Test
    void crear_guardaConsejoConRecomendacionesOrdenadas() {
        ConsejoDTO dto = new ConsejoDTO();
        dto.setTitulo("Higiene dental");
        dto.setCategoria("Salud preventiva");
        dto.setDescripcion("Cepillado regular");
        dto.setAlerta("Sangrado de encias");
        dto.setImagen("/img/Consejos/dental.jpg");
        dto.setRecomendaciones(List.of("Usar cepillo suave", "Revisar encias"));
        dto.setIdEspecies(List.of(1L));

        when(repository.existsByTitulo("Higiene dental")).thenReturn(false);
        when(catalogoClient.existeEspecie(1L)).thenReturn(true);
        when(repository.save(any(Consejo.class))).thenAnswer(inv -> {
            Consejo c = inv.getArgument(0);
            c.setId(7L);
            return c;
        });

        Consejo res = service.crear(dto, 1L);
        assertEquals(7L, res.getId());
        assertEquals(2, res.getRecomendaciones().size());
        assertEquals(1, res.getRecomendaciones().get(0).getOrden());
        assertEquals(2, res.getRecomendaciones().get(1).getOrden());
    }

    @Test
    void crear_rechazaTituloDuplicado() {
        ConsejoDTO dto = new ConsejoDTO();
        dto.setTitulo("Higiene dental");
        when(repository.existsByTitulo("Higiene dental")).thenReturn(true);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.crear(dto, 1L));
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
    }
}
