package cl.veterinaria.catalogo.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.catalogo.model.Medicamentos;

public interface MedicamentosRepository extends JpaRepository<Medicamentos, BigInteger>{
    List<Medicamentos> findByNombre_comercial(String nombre_comercial);
}