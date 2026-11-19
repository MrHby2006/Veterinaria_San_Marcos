package cl.veterinaria.citas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "mascota")
public class Mascota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mascota")
    private Long id;

    @Column(nullable = false, length = 50)
    private String nombre;

    // Referencia logica (sin FK): el usuario vive en el microservicio usuarios
    @Column(name = "id_usuario", nullable = false)
    private Long idUsuario;

    // Referencia logica (sin FK): la especie vive en el microservicio catalogo
    @Column(name = "id_especie", nullable = false)
    private Long idEspecie;
}
