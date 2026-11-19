package cl.veterinaria.citas.client;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.citas.dto.UsuarioDTO;

// Habla con el microservicio usuarios
@Component
public class UsuarioClient {

    private final WebClient webClient;

    public UsuarioClient(WebClient.Builder builder) {
        this.webClient = builder.clone().baseUrl("http://usuarios").build();
    }

    // Devuelve null si el usuario no existe
    public UsuarioDTO buscarUsuario(Long id) {
        try {
            return webClient.get()
                    .uri("/api/usuarios/{id}", id)
                    .retrieve()
                    .bodyToMono(UsuarioDTO.class)
                    .block();
        } catch (WebClientResponseException.NotFound e) {
            return null;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "No se pudo conectar con el microservicio usuarios");
        }
    }
}
