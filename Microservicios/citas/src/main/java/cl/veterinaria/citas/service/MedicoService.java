package cl.veterinaria.citas.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.citas.dto.MedicoDTO;
import cl.veterinaria.citas.model.Medico;
import cl.veterinaria.citas.repository.MedicoRepository;

@Service
public class MedicoService {

    private final MedicoRepository repository;
    private final PermisoService permisoService;

    public MedicoService(MedicoRepository repository, PermisoService permisoService) {
        this.repository = repository;
        this.permisoService = permisoService;
    }

    // Selector de Recepcion y tabla del admin: solo los medicos activos.
    // Es publico porque solo muestra nombres
    public List<Medico> listar() {
        return repository.findByActivoTrue();
    }

    // Admin > Medicos > Agregar
    public Medico crear(MedicoDTO datos, Long idUsuario) {
        permisoService.validarAdmin(idUsuario);
        Medico medico = new Medico();
        medico.setNombre(datos.getNombre().trim());
        medico.setApellido(datos.getApellido().trim());
        medico.setActivo(true);
        return repository.save(medico);
    }

    // Admin > Medicos > Editar (por ejemplo, si se escribio mal el nombre)
    public Medico actualizar(Long id, MedicoDTO datos, Long idUsuario) {
        permisoService.validarAdmin(idUsuario);
        Medico medico = obtener(id);
        if (!medico.getActivo()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede editar un medico eliminado");
        }
        medico.setNombre(datos.getNombre().trim());
        medico.setApellido(datos.getApellido().trim());
        return repository.save(medico);
    }

    // No se borra: sus citas antiguas tienen que seguir mostrando su nombre
    public void eliminar(Long id, Long idUsuario) {
        permisoService.validarAdmin(idUsuario);
        Medico medico = obtener(id);
        if (!medico.getActivo()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El medico ya estaba eliminado");
        }
        medico.setActivo(false);
        repository.save(medico);
    }

    private Medico obtener(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe el medico " + id));
    }
}
