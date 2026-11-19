package cl.veterinaria.catalogo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.catalogo.model.Servicios;

// findById, findAll, save y deleteById ya vienen incluidos en JpaRepository
public interface ServiciosRepository extends JpaRepository<Servicios, Integer>{
}
