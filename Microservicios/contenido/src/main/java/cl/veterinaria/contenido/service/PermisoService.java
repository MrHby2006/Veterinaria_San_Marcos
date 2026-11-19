package cl.veterinaria.contenido.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.contenido.client.UsuarioClient;
import cl.veterinaria.contenido.dto.UsuarioDTO;

// Revisa los permisos de quien hace la peticion (igual que en citas y ventas).
// El front manda el id de quien inicio sesion (?idUsuario=) y aqui se le
// pregunta a usuarios que rol tiene de verdad.
@Service
public class PermisoService {

    private final UsuarioClient usuarioClient;

    public PermisoService(UsuarioClient usuarioClient) {
        this.usuarioClient = usuarioClient;
    }

    // El usuario tiene que existir y no estar eliminado
    private UsuarioDTO obtenerUsuario(Long idUsuario) {
        UsuarioDTO usuario = usuarioClient.buscarUsuario(idUsuario);
        if (usuario == null || !usuario.getActivo()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Debe iniciar sesion con una cuenta valida");
        }
        return usuario;
    }

    // Crear, editar y borrar consejos: solo el administrador
    public UsuarioDTO validarAdmin(Long idUsuario) {
        UsuarioDTO usuario = obtenerUsuario(idUsuario);
        if (!usuario.getRol().equals("Administrador")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo el administrador puede hacer esto");
        }
        return usuario;
    }

    // Ver y atender mensajes de Contacto: recepcionistas y administrador
    public UsuarioDTO validarPersonal(Long idUsuario) {
        UsuarioDTO usuario = obtenerUsuario(idUsuario);
        if (!usuario.getRol().equals("Recepcionista") && !usuario.getRol().equals("Administrador")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo el personal de la clinica puede hacer esto");
        }
        return usuario;
    }
}
