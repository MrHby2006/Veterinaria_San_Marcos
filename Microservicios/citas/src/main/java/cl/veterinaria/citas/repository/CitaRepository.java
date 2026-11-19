package cl.veterinaria.citas.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.citas.model.Cita;

public interface CitaRepository extends JpaRepository<Cita, Long> {

    // Mis Citas: las citas de una mascota del cliente
    List<Cita> findByIdMascota(Long idMascota);

    // Recepcion: solo ve las citas pagadas
    List<Cita> findByPagadoTrueOrderByFechaAscHoraAsc();

    // La misma mascota no puede tener dos citas a la misma hora (sin contar las canceladas)
    boolean existsByIdMascotaAndFechaAndHoraAndEstadoNot(Long idMascota, LocalDate fecha, LocalTime hora, String estado);

    // El mismo medico no puede tener otra cita a la misma hora (sin contar las canceladas ni esta misma cita)
    boolean existsByIdMedicoAndFechaAndHoraAndEstadoNotAndIdNot(Long idMedico, LocalDate fecha, LocalTime hora, String estado, Long id);
}
