package cl.veterinaria.usuarios.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SeguridadConfig {

    // Encripta las contraseñas con BCrypt.
    // Solo se usa spring-security-crypto, asi que los endpoints NO quedan bloqueados.
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
