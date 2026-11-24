package cl.veterinaria.usuarios.service;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.usuarios.dto.LoginDTO;
import cl.veterinaria.usuarios.dto.RegistroDTO;
import cl.veterinaria.usuarios.dto.UsuarioActualizarDTO;
import cl.veterinaria.usuarios.dto.UsuarioAdminDTO;
import cl.veterinaria.usuarios.dto.UsuarioDTO;
import cl.veterinaria.usuarios.model.Usuario;
import cl.veterinaria.usuarios.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final BCryptPasswordEncoder encoder;

    public UsuarioService(UsuarioRepository repository, BCryptPasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    // Registro: siempre crea un Cliente
    public UsuarioDTO registrar(RegistroDTO datos) {
        String correo = limpiarCorreo(datos.getCorreo());
        validarCorreoLibre(correo);

        Usuario usuario = new Usuario();
        usuario.setNombre(datos.getNombre().trim());
        usuario.setCorreo(correo);
        usuario.setContrasena(encriptar(datos.getContrasena()));
        usuario.setDireccion(datos.getDireccion().trim());
        usuario.setRol("Cliente");
        usuario.setActivo(true);

        return aDTO(repository.save(usuario));
    }

    // Login: compara la contraseña escrita con la encriptada
    public UsuarioDTO login(LoginDTO datos) {
        Optional<Usuario> encontrado = repository.findByCorreo(limpiarCorreo(datos.getCorreo()));

        // Mismo mensaje si no existe el correo o si la contraseña esta mal,
        // asi nadie puede averiguar que correos estan registrados
        if (encontrado.isEmpty() || !encoder.matches(datos.getContrasena(), encontrado.get().getContrasena())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Correo o contraseña incorrectos");
        }

        Usuario usuario = encontrado.get();
        if (!usuario.getActivo()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Esta cuenta fue desactivada");
        }

        return aDTO(usuario);
    }

    // Admin > Usuarios: solo los que no se han eliminado
    public List<UsuarioDTO> listar(Long idAdmin) {
        validarAdmin(idAdmin);
        List<UsuarioDTO> lista = new ArrayList<>();
        for (Usuario usuario : repository.findByActivoTrue()) {
            lista.add(aDTO(usuario));
        }
        return lista;
    }

    // Lo usan citas y ventas para revisar que el usuario exista
    public UsuarioDTO buscarPorId(Long id) {
        return aDTO(obtener(id));
    }

    // Admin > Usuarios > Agregar
    public UsuarioDTO crear(UsuarioAdminDTO datos, Long idAdmin) {
        validarAdmin(idAdmin);
        validarRol(datos.getRol());
        String correo = limpiarCorreo(datos.getCorreo());
        validarCorreoLibre(correo);

        Usuario usuario = new Usuario();
        usuario.setNombre(datos.getNombre().trim());
        usuario.setCorreo(correo);
        usuario.setContrasena(encriptar(datos.getContrasena()));
        usuario.setRol(datos.getRol());
        usuario.setActivo(true);
        if (datos.getDireccion() != null && !datos.getDireccion().isBlank()) {
            usuario.setDireccion(datos.getDireccion().trim());
        }

        return aDTO(repository.save(usuario));
    }

    // Admin > Usuarios > Editar
    public UsuarioDTO actualizar(Long id, UsuarioActualizarDTO datos, Long idAdmin) {
        validarAdmin(idAdmin);
        Usuario usuario = obtener(id);
        if (!usuario.getActivo()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede editar un usuario eliminado");
        }
        validarRol(datos.getRol());

        // El admin no puede quitarse su propio rol, si no nadie podria entrar al panel
        if (id.equals(idAdmin) && !datos.getRol().equals("Administrador")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No puede cambiar su propio tipo de usuario");
        }

        // Si cambio el correo, el nuevo no puede ser de otra persona
        String correo = limpiarCorreo(datos.getCorreo());
        if (!correo.equals(usuario.getCorreo())) {
            validarCorreoLibre(correo);
        }

        usuario.setNombre(datos.getNombre().trim());
        usuario.setCorreo(correo);
        usuario.setRol(datos.getRol());

        return aDTO(repository.save(usuario));
    }

    // Admin > Usuarios > Eliminar: no se borra la fila, solo se desactiva,
    // porque sus mascotas, citas y compras tienen que seguir existiendo
    public void eliminar(Long id, Long idAdmin) {
        validarAdmin(idAdmin);
        if (id.equals(idAdmin)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No puede eliminar su propia cuenta");
        }
        Usuario usuario = obtener(id);
        if (!usuario.getActivo()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El usuario ya estaba eliminado");
        }
        usuario.setActivo(false);
        repository.save(usuario);
    }

    // ---------- Metodos de ayuda ----------

    // Revisa que quien hace la peticion sea un Administrador activo.
    // Como no usamos JWT, el front manda el id de quien inicio sesion (?idAdmin=)
    // y aqui se busca en la base de datos que rol tiene de verdad
    private void validarAdmin(Long idAdmin) {
        Optional<Usuario> admin = repository.findById(idAdmin);
        if (admin.isEmpty() || !admin.get().getActivo() || !admin.get().getRol().equals("Administrador")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo el administrador puede hacer esto");
        }
    }

    private Usuario obtener(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe el usuario " + id));
    }

    // "Juan@Correo.cl " y "juan@correo.cl" son el mismo correo
    private String limpiarCorreo(String correo) {
        return correo.trim().toLowerCase();
    }

    // BCrypt no acepta mas de 72 bytes (una letra normal es 1 byte, una ñ o una tilde son 2)
    private String encriptar(String contrasena) {
        if (contrasena.getBytes(StandardCharsets.UTF_8).length > 72) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La contraseña puede tener maximo 72 caracteres");
        }
        return encoder.encode(contrasena);
    }

    private void validarCorreoLibre(String correo) {
        if (repository.findByCorreo(correo).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ya existe una cuenta con ese correo");
        }
    }

    // Los mismos tipos que el SelectTipoUsuario del front
    private void validarRol(String rol) {
        if (!rol.equals("Cliente") && !rol.equals("Recepcionista") && !rol.equals("Administrador")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El tipo de usuario debe ser Cliente, Recepcionista o Administrador");
        }
    }

    private UsuarioDTO aDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setCorreo(usuario.getCorreo());
        dto.setDireccion(usuario.getDireccion());
        dto.setRol(usuario.getRol());
        dto.setActivo(usuario.getActivo());
        return dto;
    }
}
