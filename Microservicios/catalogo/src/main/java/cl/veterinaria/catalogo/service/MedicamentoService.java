package cl.veterinaria.catalogo.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.catalogo.dto.PrecioDTO;
import cl.veterinaria.catalogo.model.Medicamento;
import cl.veterinaria.catalogo.repository.MedicamentoRepository;

@Service
public class MedicamentoService {

    private final MedicamentoRepository repository;
    private final PermisoService permisoService;

    public MedicamentoService(MedicamentoRepository repository, PermisoService permisoService) {
        this.repository = repository;
        this.permisoService = permisoService;
    }

    // Pagina Medicamentos. Si llega una especie, solo los que sirven para esa especie
    public List<Medicamento> listar(Long idEspecie) {
        if (idEspecie == null) {
            return repository.findAll();
        }
        return repository.findByEspecies_Id(idEspecie);
    }

    // Detalle del medicamento. Tambien lo usa ventas para saber el precio y el stock
    public Medicamento obtener(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe el medicamento " + id));
    }

    // Admin > Precios. Las compras ya hechas no cambian: ventas guarda una copia del precio
    public Medicamento cambiarPrecio(Long id, PrecioDTO datos, Long idUsuario) {
        permisoService.validarAdmin(idUsuario);
        Medicamento medicamento = obtener(id);
        medicamento.setPrecioUnitario(datos.getPrecio());
        return repository.save(medicamento);
    }

    // Lo llama ventas al pagar el carrito: resta las unidades compradas
    public Medicamento descontarStock(Long id, Integer cantidad) {
        if (cantidad == null || cantidad < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La cantidad tiene que ser mayor a 0");
        }
        Medicamento medicamento = obtener(id);
        if (medicamento.getStockActual() < cantidad) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No hay stock suficiente de " + medicamento.getNombreComercial() + " (quedan " + medicamento.getStockActual() + ")");
        }
        medicamento.setStockActual(medicamento.getStockActual() - cantidad);
        return repository.save(medicamento);
    }
}
