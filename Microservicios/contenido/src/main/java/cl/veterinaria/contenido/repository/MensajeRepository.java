package cl.veterinaria.contenido.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.contenido.model.Mensaje;

public interface MensajeRepository extends JpaRepository<Mensaje, Long> {

    // Los mas nuevos primero
    List<Mensaje> findAllByOrderByFechaDesc();

    // Ej: solo los PENDIENTE
    List<Mensaje> findByEstadoOrderByFechaDesc(String estado);
}
