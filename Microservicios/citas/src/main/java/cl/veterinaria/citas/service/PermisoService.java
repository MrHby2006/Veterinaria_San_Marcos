package cl.veterinaria.citas.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.citas.client.UsuarioClient;
import cl.veterinaria.citas.dto.UsuarioDTO;

// Revisa los permisos de quien hace la peticion.
// Como no usamos JWT, el front manda el id de quien inicio sesion (?idUsuario=)
// y aqui se le pregunta al microservicio usuarios que rol tiene de verdad.
// Asi no sirve cambiar el rol en el localStorage del navegador.
// Lo usan CitaService y MedicoService, por eso esta en su propia clase.
@Service
public class PermisoService {

    private final UsuarioClient usuarioClient;

    public PermisoService(UsuarioClient usuarioClient) {
        this.usuarioClient = usuarioClient;
    }

    // El usuario tiene que existir y no estar eliminado
    public UsuarioDTO obtenerUsuario(Long idUsuario) {
        UsuarioDTO usuario = usuarioClient.buscarUsuario(idUsuario);
        if (usuario == null || !usuario.getActivo()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Debe iniciar sesion con una cuenta valida");
        }
        return usuario;
    }

    // Recepcionista o Administrador (el personal de la clinica)
    public boolean esPersonal(UsuarioDTO usuario) {
        return usuario.getRol().equals("Recepcionista") || usuario.getRol().equals("Administrador");
    }

    // Reservar y ver sus citas: solo los clientes
    public UsuarioDTO validarCliente(Long idUsuario) {
        UsuarioDTO usuario = obtenerUsuario(idUsuario);
        if (!usuario.getRol().equals("Cliente")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo los clientes pueden hacer esto");
        }
        return usuario;
    }

    // Pagina de Recepcion: recepcionistas y tambien el administrador
    public UsuarioDTO validarPersonal(Long idUsuario) {
        UsuarioDTO usuario = obtenerUsuario(idUsuario);
        if (!esPersonal(usuario)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo el personal de la clinica puede hacer esto");
        }
        return usuario;
    }

    // Mantenedor de medicos: solo el administrador
    public UsuarioDTO validarAdmin(Long idUsuario) {
        UsuarioDTO usuario = obtenerUsuario(idUsuario);
        if (!usuario.getRol().equals("Administrador")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo el administrador puede hacer esto");
        }
        return usuario;
    }
}
