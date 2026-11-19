package cl.veterinaria.ventas.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.ventas.client.UsuarioClient;
import cl.veterinaria.ventas.dto.UsuarioDTO;

// Revisa los permisos de quien hace la peticion.
// Como no usamos JWT, el front manda el id de quien inicio sesion (?idUsuario=)
// y aqui se le pregunta al microservicio usuarios que rol tiene de verdad.
// Asi no sirve cambiar el rol en el localStorage del navegador.
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

    // Carrito y compras: solo los clientes
    public UsuarioDTO validarCliente(Long idUsuario) {
        UsuarioDTO usuario = obtenerUsuario(idUsuario);
        if (!usuario.getRol().equals("Cliente")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo los clientes pueden comprar");
        }
        return usuario;
    }

    // Pagina de Recepcion: recepcionistas y tambien el administrador
    public UsuarioDTO validarPersonal(Long idUsuario) {
        UsuarioDTO usuario = obtenerUsuario(idUsuario);
        if (!usuario.getRol().equals("Recepcionista") && !usuario.getRol().equals("Administrador")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo el personal de la clinica puede hacer esto");
        }
        return usuario;
    }
}
