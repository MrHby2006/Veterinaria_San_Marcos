package cl.veterinaria.ventas.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.ventas.model.Compra;

public interface CompraRepository extends JpaRepository<Compra, Long> {

    // Carrito: lo que el cliente todavia no paga
    List<Compra> findByIdUsuarioAndPagadoFalse(Long idUsuario);

    // Si el medicamento ya esta en el carrito, se suma la cantidad en vez de crear otra fila
    Optional<Compra> findByIdUsuarioAndIdMedicamentoAndPagadoFalse(Long idUsuario, Long idMedicamento);

    // Recepcion > Retiro de medicamentos: todo lo pagado, lo mas nuevo primero
    List<Compra> findByPagadoTrueOrderByFechaPagoDesc();
}
