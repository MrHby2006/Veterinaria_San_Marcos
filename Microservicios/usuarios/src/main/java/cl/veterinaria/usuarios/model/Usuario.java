package cl.veterinaria.usuarios.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, unique = true, length = 100)
    private String correo;

    @Column(nullable = false, length = 255)
    private String contrasena;

    // Acepta NULL: el admin crea recepcionistas sin direccion
    @Column(length = 150)
    private String direccion;

    @Column(nullable = false, length = 20)
    private String rol;

    // Eliminar = activo en false (no se borra la fila)
    @Column(nullable = false)
    private Boolean activo = true;
}
