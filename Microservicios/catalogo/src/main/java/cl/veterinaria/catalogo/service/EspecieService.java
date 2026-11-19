package cl.veterinaria.catalogo.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.catalogo.model.Especie;
import cl.veterinaria.catalogo.repository.EspecieRepository;

@Service
public class EspecieService {

    private final EspecieRepository repository;

    public EspecieService(EspecieRepository repository) {
        this.repository = repository;
    }

    // Select de especies (Reservar hora) y filtro de Medicamentos
    public List<Especie> listar() {
        return repository.findAll();
    }

    // Lo usa contenido para revisar que la especie de un consejo exista
    public Especie obtener(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe la especie " + id));
    }
}
