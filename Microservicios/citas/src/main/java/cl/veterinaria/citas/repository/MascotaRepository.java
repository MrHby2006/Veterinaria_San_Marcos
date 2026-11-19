package cl.veterinaria.citas.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.citas.model.Mascota;

public interface MascotaRepository extends JpaRepository<Mascota, Long> {

    // Las mascotas de un cliente
    List<Mascota> findByIdUsuario(Long idUsuario);

    // Al reservar: si el cliente ya tiene esa mascota, se reutiliza en vez de crear otra
    Optional<Mascota> findByIdUsuarioAndNombreIgnoreCaseAndIdEspecie(Long idUsuario, String nombre, Long idEspecie);
}
