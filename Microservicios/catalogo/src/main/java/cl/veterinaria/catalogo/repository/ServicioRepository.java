package cl.veterinaria.catalogo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.catalogo.model.Servicio;

public interface ServicioRepository extends JpaRepository<Servicio, Long> {

    // Filtro por categoria de la pagina Servicios (Consultas, Cirugía, etc.)
    List<Servicio> findByCategoria(String categoria);
}
