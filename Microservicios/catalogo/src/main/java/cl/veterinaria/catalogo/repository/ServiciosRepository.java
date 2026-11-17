package cl.veterinaria.catalogo.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.catalogo.model.Servicios;

public interface ServiciosRepository extends JpaRepository<Servicios, BigInteger>{
    List<Servicios> findById(Integer id);
}
