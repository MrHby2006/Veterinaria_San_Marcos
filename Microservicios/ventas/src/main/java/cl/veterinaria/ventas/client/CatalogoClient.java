package cl.veterinaria.ventas.client;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.ventas.dto.MedicamentoDTO;

// Habla con el microservicio catalogo.
// Si tu amigo cambia los nombres de los endpoints, solo hay que cambiar los .uri(...)
@Component
public class CatalogoClient {

    private final WebClient webClient;

    public CatalogoClient(WebClient.Builder builder) {
        this.webClient = builder.clone().baseUrl("http://catalogo").build();
    }

    // Devuelve null si el medicamento no existe
    public MedicamentoDTO buscarMedicamento(Long id) {
        try {
            return webClient.get()
                    .uri("/api/medicamentos/{id}", id)
                    .retrieve()
                    .bodyToMono(MedicamentoDTO.class)
                    .block();
        } catch (WebClientResponseException.NotFound e) {
            return null;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "No se pudo conectar con el microservicio catalogo");
        }
    }

    // Le pide a catalogo que descuente unidades del stock.
    // Ejemplo: PUT /api/medicamentos/3/stock?cantidad=2
    public void descontarStock(Long id, Integer cantidad) {
        try {
            webClient.put()
                    .uri("/api/medicamentos/{id}/stock?cantidad={cantidad}", id, cantidad)
                    .retrieve()
                    .toBodilessEntity()
                    .block();
        } catch (WebClientResponseException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Catalogo no pudo descontar el stock del medicamento " + id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "No se pudo conectar con el microservicio catalogo");
        }
    }
}
