package cl.veterinaria.usuarios.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.usuarios.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Login: buscar al usuario por su correo
    Optional<Usuario> findByCorreo(String correo);

    // Admin > Usuarios: solo los que no se han eliminado
    List<Usuario> findByActivoTrue();
}
