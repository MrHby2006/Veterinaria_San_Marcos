package cl.veterinaria.contenido.client;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;

// Habla con el microservicio catalogo (ahi esta la tabla ESPECIE)
@Component
public class CatalogoClient {

    private final WebClient webClient;

    public CatalogoClient(WebClient.Builder builder) {
        this.webClient = builder.clone().baseUrl("http://catalogo").build();
    }

    // true si la especie existe en catalogo, false si no
    public boolean existeEspecie(Long id) {
        try {
            webClient.get()
                    .uri("/api/especies/{id}", id)
                    .retrieve()
                    .toBodilessEntity()
                    .block();
            return true;
        } catch (WebClientResponseException.NotFound e) {
            return false;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "No se pudo conectar con el microservicio catalogo");
        }
    }
}
