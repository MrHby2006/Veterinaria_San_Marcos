package cl.veterinaria.contenido.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.contenido.client.CatalogoClient;
import cl.veterinaria.contenido.dto.ConsejoDTO;
import cl.veterinaria.contenido.model.Consejo;
import cl.veterinaria.contenido.model.Recomendacion;
import cl.veterinaria.contenido.repository.ConsejoRepository;

@Service
public class ConsejoService {

    private final ConsejoRepository repository;
    private final PermisoService permisoService;
    private final CatalogoClient catalogoClient;

    public ConsejoService(ConsejoRepository repository, PermisoService permisoService, CatalogoClient catalogoClient) {
        this.repository = repository;
        this.permisoService = permisoService;
        this.catalogoClient = catalogoClient;
    }

    // Pagina Consejos (publica)
    public List<Consejo> listar() {
        return repository.findAll();
    }

    // Detalle del consejo, con sus recomendaciones y especies (publico)
    public Consejo obtener(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe el consejo " + id));
    }

    // @Transactional: el consejo, sus recomendaciones y sus especies se guardan todos juntos o ninguno
    @Transactional
    public Consejo crear(ConsejoDTO datos, Long idUsuario) {
        permisoService.validarAdmin(idUsuario);
        if (repository.existsByTitulo(datos.getTitulo().trim())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ya existe un consejo con ese titulo");
        }
        Consejo consejo = new Consejo();
        copiarDatos(consejo, datos);
        return repository.save(consejo);
    }

    @Transactional
    public Consejo actualizar(Long id, ConsejoDTO datos, Long idUsuario) {
        permisoService.validarAdmin(idUsuario);
        Consejo consejo = obtener(id);
        // Si cambia el titulo, el nuevo no puede ser de otro consejo
        String titulo = datos.getTitulo().trim();
        if (!titulo.equals(consejo.getTitulo()) && repository.existsByTitulo(titulo)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ya existe un consejo con ese titulo");
        }
        copiarDatos(consejo, datos);
        return repository.save(consejo);
    }

    // Al borrar el consejo se borran sus recomendaciones y sus especies (cascade)
    @Transactional
    public void eliminar(Long id, Long idUsuario) {
        permisoService.validarAdmin(idUsuario);
        Consejo consejo = obtener(id);
        repository.delete(consejo);
    }

    // Pasa lo que mando el admin al consejo. Lo usan crear y actualizar
    private void copiarDatos(Consejo consejo, ConsejoDTO datos) {
        // Cada especie tiene que existir en catalogo y no puede venir repetida
        for (Long idEspecie : datos.getIdEspecies()) {
            if (datos.getIdEspecies().indexOf(idEspecie) != datos.getIdEspecies().lastIndexOf(idEspecie)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La especie " + idEspecie + " esta repetida");
            }
            if (!catalogoClient.existeEspecie(idEspecie)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No existe la especie " + idEspecie);
            }
        }

        consejo.setTitulo(datos.getTitulo().trim());
        consejo.setCategoria(datos.getCategoria().trim());
        consejo.setDescripcion(datos.getDescripcion().trim());
        consejo.setAlerta(datos.getAlerta().trim());
        consejo.setImagen(datos.getImagen().trim());

        // Se reemplazan las recomendaciones antiguas por las nuevas, numeradas desde 1.
        // Se usa clear() sobre la misma lista para que JPA borre las que ya no estan
        consejo.getRecomendaciones().clear();
        int orden = 1;
        for (String texto : datos.getRecomendaciones()) {
            if (texto == null || texto.isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Las recomendaciones no pueden estar vacias");
            }
            Recomendacion recomendacion = new Recomendacion();
            recomendacion.setTexto(texto.trim());
            recomendacion.setOrden(orden);
            consejo.getRecomendaciones().add(recomendacion);
            orden++;
        }

        consejo.getIdEspecies().clear();
        consejo.getIdEspecies().addAll(datos.getIdEspecies());
    }
}
