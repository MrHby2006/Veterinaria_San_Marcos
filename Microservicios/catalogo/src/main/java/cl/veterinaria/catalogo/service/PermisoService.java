package cl.veterinaria.catalogo.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.catalogo.client.UsuarioClient;
import cl.veterinaria.catalogo.dto.UsuarioDTO;

// Revisa los permisos de quien hace la peticion (igual que en citas y ventas).
// El front manda el id de quien inicio sesion (?idUsuario=) y aqui se le
// pregunta a usuarios que rol tiene de verdad.
@Service
public class PermisoService {

    private final UsuarioClient usuarioClient;

    public PermisoService(UsuarioClient usuarioClient) {
        this.usuarioClient = usuarioClient;
    }

    // Cambiar precios: solo el administrador
    public UsuarioDTO validarAdmin(Long idUsuario) {
        UsuarioDTO usuario = usuarioClient.buscarUsuario(idUsuario);
        if (usuario == null || !usuario.getActivo()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Debe iniciar sesion con una cuenta valida");
        }
        if (!usuario.getRol().equals("Administrador")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo el administrador puede hacer esto");
        }
        return usuario;
    }
}
