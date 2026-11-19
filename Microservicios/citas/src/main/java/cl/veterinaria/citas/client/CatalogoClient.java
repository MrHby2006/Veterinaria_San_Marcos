package cl.veterinaria.citas.client;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.citas.dto.EspecieDTO;
import cl.veterinaria.citas.dto.ServicioDTO;

// Habla con el microservicio catalogo.
// Si tu amigo cambia los nombres de los endpoints, solo hay que cambiar los .uri(...)
@Component
public class CatalogoClient {

    private final WebClient webClient;

    public CatalogoClient(WebClient.Builder builder) {
        this.webClient = builder.clone().baseUrl("http://catalogo").build();
    }

    // Devuelve null si el servicio no existe
    public ServicioDTO buscarServicio(Long id) {
        try {
            return webClient.get()
                    .uri("/api/servicios/{id}", id)
                    .retrieve()
                    .bodyToMono(ServicioDTO.class)
                    .block();
        } catch (WebClientResponseException.NotFound e) {
            return null;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "No se pudo conectar con el microservicio catalogo");
        }
    }

    // Revisa si la especie esta en la lista de especies de catalogo
    public boolean existeEspecie(Long id) {
        EspecieDTO[] especies;
        try {
            especies = webClient.get()
                    .uri("/api/especies")
                    .retrieve()
                    .bodyToMono(EspecieDTO[].class)
                    .block();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "No se pudo conectar con el microservicio catalogo");
        }

        if (especies == null) {
            return false;
        }
        for (EspecieDTO especie : especies) {
            if (especie.getId().equals(id)) {
                return true;
            }
        }
        return false;
    }
}
