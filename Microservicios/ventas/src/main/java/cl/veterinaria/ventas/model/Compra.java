package cl.veterinaria.ventas.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "compra")
public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_compra")
    private Long id;

    @Column(nullable = false)
    private Integer cantidad;

    // Se copia del medicamento al agregarlo al carrito
    @Column(nullable = false)
    private Integer precio;

    @Column(nullable = false)
    private Boolean pagado = false;

    @Column(nullable = false)
    private Boolean entregado = false;

    // Cuando se agrego al carrito (se pone sola)
    @Column(name = "fecha_agregado", nullable = false, updatable = false)
    private LocalDateTime fechaAgregado;

    // Cuando se pago (NULL mientras esta en el carrito)
    @Column(name = "fecha_pago")
    private LocalDateTime fechaPago;

    // Referencia logica (sin FK): el usuario vive en el microservicio usuarios
    @Column(name = "id_usuario", nullable = false)
    private Long idUsuario;

    // Referencia logica (sin FK): el medicamento vive en el microservicio catalogo
    @Column(name = "id_medicamento", nullable = false)
    private Long idMedicamento;

    // Igual que fecha_creacion en el ejemplo de mensajeria
    @PrePersist
    protected void asignarFechaAgregado() {
        this.fechaAgregado = LocalDateTime.now();
    }
}
