package cl.veterinaria.contenido.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.contenido.model.Consejo;

public interface ConsejoRepository extends JpaRepository<Consejo, Long> {

    // Para no repetir titulos (la columna es UNIQUE)
    boolean existsByTitulo(String titulo);
}
