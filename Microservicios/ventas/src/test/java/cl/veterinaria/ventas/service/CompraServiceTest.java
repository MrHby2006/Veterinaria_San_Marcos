package cl.veterinaria.ventas.service;

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
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.ventas.client.CatalogoClient;
import cl.veterinaria.ventas.client.UsuarioClient;
import cl.veterinaria.ventas.dto.AgregarCarritoDTO;
import cl.veterinaria.ventas.dto.CompraDTO;
import cl.veterinaria.ventas.dto.MedicamentoDTO;
import cl.veterinaria.ventas.model.Compra;
import cl.veterinaria.ventas.repository.CompraRepository;

@ExtendWith(MockitoExtension.class)
class CompraServiceTest {

    @Mock private CompraRepository repository;
    @Mock private CatalogoClient catalogoClient;
    @Mock private UsuarioClient usuarioClient;
    @Mock private PermisoService permisoService;

    @InjectMocks
    private CompraService service;

    private MedicamentoDTO medDTO;

    @BeforeEach
    void setUp() {
        medDTO = new MedicamentoDTO();
        medDTO.setId(3L);
        medDTO.setNombreComercial("Antipulgas Plus");
        medDTO.setPrecioUnitario(8500);
        medDTO.setStockActual(15);
        medDTO.setImagen("/img/Medicamentos/anti.jpg");
    }

    @Test
    void agregarAlCarrito_creaItemYCalculaSubtotalConPrecioDeCatalogo() {
        AgregarCarritoDTO dto = new AgregarCarritoDTO();
        dto.setIdUsuario(5L);
        dto.setIdMedicamento(3L);
        dto.setCantidad(2);

        when(catalogoClient.buscarMedicamento(3L)).thenReturn(medDTO);
        when(repository.findByIdUsuarioAndIdMedicamentoAndPagadoFalse(5L, 3L)).thenReturn(Optional.empty());
        when(repository.save(any(Compra.class))).thenAnswer(inv -> {
            Compra c = inv.getArgument(0);
            c.setId(20L);
            return c;
        });

        CompraDTO res = service.agregarAlCarrito(dto);
        assertEquals(20L, res.getId());
        assertEquals(2, res.getCantidad());
        assertEquals(8500, res.getPrecio());
        assertEquals(17000, res.getSubtotal());
        assertFalse(res.getPagado());
    }

    @Test
    void pagar_descuentaStockYMarcaPagado() {
        Compra item = new Compra();
        item.setId(20L);
        item.setIdUsuario(5L);
        item.setIdMedicamento(3L);
        item.setCantidad(2);
        item.setPrecio(8500);
        item.setPagado(false);
        item.setEntregado(false);

        when(repository.findByIdUsuarioAndPagadoFalse(5L)).thenReturn(List.of(item));
        when(catalogoClient.buscarMedicamento(3L)).thenReturn(medDTO);
        when(repository.save(any(Compra.class))).thenAnswer(inv -> inv.getArgument(0));

        List<CompraDTO> res = service.pagar(5L);
        assertEquals(1, res.size());
        assertTrue(res.get(0).getPagado());
        verify(catalogoClient).descontarStock(3L, 2);
    }

    @Test
    void pagar_carritoVacioLanzaBadRequest() {
        when(repository.findByIdUsuarioAndPagadoFalse(5L)).thenReturn(List.of());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.pagar(5L));
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
        verify(catalogoClient, never()).descontarStock(any(), any());
    }

    @Test
    void marcarEntregado_marcaEntregadoTrueSiEstaPagado() {
        Compra item = new Compra();
        item.setId(20L);
        item.setIdMedicamento(3L);
        item.setCantidad(1);
        item.setPrecio(8500);
        item.setPagado(true);
        item.setEntregado(false);

        when(repository.findById(20L)).thenReturn(Optional.of(item));
        when(catalogoClient.buscarMedicamento(3L)).thenReturn(medDTO);
        when(repository.save(item)).thenReturn(item);

        CompraDTO res = service.marcarEntregado(20L, 9L);
        assertTrue(res.getEntregado());
    }
}
