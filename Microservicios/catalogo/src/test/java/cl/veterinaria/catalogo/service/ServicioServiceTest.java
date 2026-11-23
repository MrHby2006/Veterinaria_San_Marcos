package cl.veterinaria.catalogo.service;

import static org.junit.jupiter.api.Assertions.*;
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
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.catalogo.dto.PrecioDTO;
import cl.veterinaria.catalogo.model.Servicio;
import cl.veterinaria.catalogo.repository.ServicioRepository;

@ExtendWith(MockitoExtension.class)
class ServicioServiceTest {

    @Mock
    private ServicioRepository repository;

    @Mock
    private PermisoService permisoService;

    @InjectMocks
    private ServicioService service;

    private Servicio servicio;

    @BeforeEach
    void setUp() {
        servicio = new Servicio();
        servicio.setId(1L);
        servicio.setNombre("Consulta general");
        servicio.setCategoria("Consultas");
        servicio.setPrecio(15000);
    }

    @Test
    void listar_sinCategoriaLlamaFindAll() {
        when(repository.findAll()).thenReturn(List.of(servicio));
        List<Servicio> res = service.listar(null);
        assertEquals(1, res.size());
        verify(repository).findAll();
    }

    @Test
    void listar_conCategoriaLlamaFindByCategoria() {
        when(repository.findByCategoria("Consultas")).thenReturn(List.of(servicio));
        List<Servicio> res = service.listar("Consultas");
        assertEquals(1, res.size());
        verify(repository).findByCategoria("Consultas");
    }

    @Test
    void cambiarPrecio_actualizaPrecioSiEsAdmin() {
        PrecioDTO dto = new PrecioDTO();
        dto.setPrecio(18000);

        when(repository.findById(1L)).thenReturn(Optional.of(servicio));
        when(repository.save(servicio)).thenReturn(servicio);

        Servicio res = service.cambiarPrecio(1L, dto, 1L);
        assertEquals(18000, res.getPrecio());
        verify(permisoService).validarAdmin(1L);
    }

    @Test
    void obtener_inexistenteLanzaNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.obtener(99L));
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
    }
}
