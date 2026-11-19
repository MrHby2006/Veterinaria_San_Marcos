package cl.veterinaria.citas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.citas.model.Medico;

public interface MedicoRepository extends JpaRepository<Medico, Long> {

    // Selector de medicos en Recepcion: solo los activos
    List<Medico> findByActivoTrue();
}
