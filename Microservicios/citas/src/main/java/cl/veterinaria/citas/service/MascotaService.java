package cl.veterinaria.citas.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cl.veterinaria.citas.model.Mascota;
import cl.veterinaria.citas.repository.MascotaRepository;

@Service
public class MascotaService {

    private final MascotaRepository repository;

    public MascotaService(MascotaRepository repository) {
        this.repository = repository;
    }

    // Las mascotas de un cliente (para que las elija al reservar)
    public List<Mascota> listarPorUsuario(Long idUsuario) {
        return repository.findByIdUsuario(idUsuario);
    }
}
