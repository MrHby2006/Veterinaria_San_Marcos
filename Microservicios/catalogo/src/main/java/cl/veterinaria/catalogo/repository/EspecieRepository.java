package cl.veterinaria.catalogo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.catalogo.model.Especie;

public interface EspecieRepository extends JpaRepository<Especie, Long> {
}
