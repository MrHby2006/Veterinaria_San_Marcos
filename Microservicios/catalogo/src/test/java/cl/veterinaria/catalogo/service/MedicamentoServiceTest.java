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
import cl.veterinaria.catalogo.model.Medicamento;
import cl.veterinaria.catalogo.repository.MedicamentoRepository;

@ExtendWith(MockitoExtension.class)
class MedicamentoServiceTest {

    @Mock
    private MedicamentoRepository repository;

    @Mock
    private PermisoService permisoService;

    @InjectMocks
    private MedicamentoService service;

    private Medicamento med;

    @BeforeEach
    void setUp() {
        med = new Medicamento();
        med.setId(1L);
        med.setNombreComercial("Amoxibay 250mg");
        med.setPrecioUnitario(4200);
        med.setStockActual(20);
    }

    @Test
    void listar_conEspecieFiltraPorEspecie() {
        when(repository.findByEspecies_Id(1L)).thenReturn(List.of(med));
        List<Medicamento> res = service.listar(1L);
        assertEquals(1, res.size());
        verify(repository).findByEspecies_Id(1L);
    }

    @Test
    void cambiarPrecio_actualizaPrecioUnitario() {
        PrecioDTO dto = new PrecioDTO();
        dto.setPrecio(5000);
        when(repository.findById(1L)).thenReturn(Optional.of(med));
        when(repository.save(med)).thenReturn(med);

        Medicamento res = service.cambiarPrecio(1L, dto, 1L);
        assertEquals(5000, res.getPrecioUnitario());
        verify(permisoService).validarAdmin(1L);
    }

    @Test
    void descontarStock_restaUnidadesCuandoHayStockSuficiente() {
        when(repository.findById(1L)).thenReturn(Optional.of(med));
        when(repository.save(med)).thenReturn(med);

        Medicamento res = service.descontarStock(1L, 5);
        assertEquals(15, res.getStockActual());
    }

    @Test
    void descontarStock_lanzaBadRequestSiNoHayStockSuficiente() {
        when(repository.findById(1L)).thenReturn(Optional.of(med));

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.descontarStock(1L, 50));
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
    }
}
