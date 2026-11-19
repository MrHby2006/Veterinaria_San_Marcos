package cl.veterinaria.catalogo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.catalogo.model.Medicamentos;

public interface MedicamentosRepository extends JpaRepository<Medicamentos, Integer>{
    List<Medicamentos> findByNombreComercial(String nombreComercial);
}