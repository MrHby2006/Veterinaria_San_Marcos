package cl.veterinaria.catalogo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.catalogo.model.Especie;

public interface EspecieRepository extends JpaRepository<Especie, Long> {

    // Ordenadas por id: Perro, Gato, Conejo, Ave (findAll no asegura ningun orden)
    List<Especie> findAllByOrderByIdAsc();
}
