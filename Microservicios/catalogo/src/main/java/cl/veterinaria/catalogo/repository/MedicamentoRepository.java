package cl.veterinaria.catalogo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.veterinaria.catalogo.model.Medicamento;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {

    // Filtro por especie de la pagina Medicamentos.
    // "Especies_Id" = busca dentro de la lista especies por el id de cada una
    List<Medicamento> findByEspecies_Id(Long idEspecie);
}
