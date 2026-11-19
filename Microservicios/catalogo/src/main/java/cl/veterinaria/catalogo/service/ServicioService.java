package cl.veterinaria.catalogo.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.catalogo.dto.PrecioDTO;
import cl.veterinaria.catalogo.model.Servicio;
import cl.veterinaria.catalogo.repository.ServicioRepository;

@Service
public class ServicioService {

    private final ServicioRepository repository;
    private final PermisoService permisoService;

    public ServicioService(ServicioRepository repository, PermisoService permisoService) {
        this.repository = repository;
        this.permisoService = permisoService;
    }

    // Pagina Servicios. Si llega una categoria, solo devuelve esa
    public List<Servicio> listar(String categoria) {
        if (categoria == null || categoria.isBlank()) {
            return repository.findAll();
        }
        return repository.findByCategoria(categoria);
    }

    // Lo usa citas para saber el nombre y el precio al reservar
    public Servicio obtener(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe el servicio " + id));
    }

    // Admin > Precios. Las citas ya reservadas no cambian: citas guarda una copia del precio
    public Servicio cambiarPrecio(Long id, PrecioDTO datos, Long idUsuario) {
        permisoService.validarAdmin(idUsuario);
        Servicio servicio = obtener(id);
        servicio.setPrecio(datos.getPrecio());
        return repository.save(servicio);
    }
}
