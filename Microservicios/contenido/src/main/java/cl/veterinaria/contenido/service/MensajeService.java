package cl.veterinaria.contenido.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.contenido.dto.MensajeDTO;
import cl.veterinaria.contenido.model.Mensaje;
import cl.veterinaria.contenido.repository.MensajeRepository;

@Service
public class MensajeService {

    private final MensajeRepository repository;
    private final PermisoService permisoService;

    public MensajeService(MensajeRepository repository, PermisoService permisoService) {
        this.repository = repository;
        this.permisoService = permisoService;
    }

    // Formulario de Contacto: cualquiera puede escribir, sin iniciar sesion
    public Mensaje crear(MensajeDTO datos) {
        Mensaje mensaje = new Mensaje();
        mensaje.setNombre(datos.getNombre().trim());
        mensaje.setCorreo(datos.getCorreo().trim());
        mensaje.setMensaje(datos.getMensaje().trim());
        mensaje.setEstado("PENDIENTE");
        return repository.save(mensaje);
    }

    // Personal de la clinica. Si llega estado (PENDIENTE o ATENDIDO), solo esos
    public List<Mensaje> listar(String estado, Long idUsuario) {
        permisoService.validarPersonal(idUsuario);
        if (estado == null || estado.isBlank()) {
            return repository.findAllByOrderByFechaDesc();
        }
        if (!estado.equals("PENDIENTE") && !estado.equals("ATENDIDO")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El estado tiene que ser PENDIENTE o ATENDIDO");
        }
        return repository.findByEstadoOrderByFechaDesc(estado);
    }

    // Marcar como ATENDIDO cuando ya se le respondio a la persona
    public Mensaje marcarAtendido(Long id, Long idUsuario) {
        permisoService.validarPersonal(idUsuario);
        Mensaje mensaje = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe el mensaje " + id));
        if (mensaje.getEstado().equals("ATENDIDO")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El mensaje ya estaba atendido");
        }
        mensaje.setEstado("ATENDIDO");
        return repository.save(mensaje);
    }
}
