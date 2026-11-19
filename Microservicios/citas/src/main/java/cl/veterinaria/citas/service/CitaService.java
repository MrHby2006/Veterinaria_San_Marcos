package cl.veterinaria.citas.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.citas.client.CatalogoClient;
import cl.veterinaria.citas.client.UsuarioClient;
import cl.veterinaria.citas.dto.CitaDTO;
import cl.veterinaria.citas.dto.ReservaDTO;
import cl.veterinaria.citas.dto.ServicioDTO;
import cl.veterinaria.citas.dto.UsuarioDTO;
import cl.veterinaria.citas.model.Cita;
import cl.veterinaria.citas.model.Mascota;
import cl.veterinaria.citas.model.Medico;
import cl.veterinaria.citas.repository.CitaRepository;
import cl.veterinaria.citas.repository.MascotaRepository;
import cl.veterinaria.citas.repository.MedicoRepository;

@Service
public class CitaService {

    private final CitaRepository citaRepository;
    private final MascotaRepository mascotaRepository;
    private final MedicoRepository medicoRepository;
    private final CatalogoClient catalogoClient;
    private final UsuarioClient usuarioClient;
    private final PermisoService permisoService;

    public CitaService(CitaRepository citaRepository, MascotaRepository mascotaRepository, MedicoRepository medicoRepository,
            CatalogoClient catalogoClient, UsuarioClient usuarioClient, PermisoService permisoService) {
        this.citaRepository = citaRepository;
        this.mascotaRepository = mascotaRepository;
        this.medicoRepository = medicoRepository;
        this.catalogoClient = catalogoClient;
        this.usuarioClient = usuarioClient;
        this.permisoService = permisoService;
    }

    // Reservar hora
    public CitaDTO reservar(ReservaDTO datos) {
        // 1. Quien reserva tiene que ser un Cliente activo (pregunta a usuarios)
        permisoService.validarCliente(datos.getIdUsuario());

        // 2. La especie existe (pregunta a catalogo)
        if (!catalogoClient.existeEspecie(datos.getIdEspecie())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La especie seleccionada no existe");
        }

        // 3. El servicio existe, y su precio se copia desde catalogo (no se confia en el front)
        ServicioDTO servicio = catalogoClient.buscarServicio(datos.getIdServicio());
        if (servicio == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El servicio seleccionado no existe");
        }

        // 4. Fecha y hora dentro del horario de atencion (las mismas reglas del front)
        validarHorario(datos.getFecha(), datos.getHora());

        // 5. Si el cliente ya tiene esa mascota se usa la misma; si no, se crea
        Mascota mascota = buscarOCrearMascota(datos);

        // 6. La mascota no puede tener otra cita a esa misma hora
        if (citaRepository.existsByIdMascotaAndFechaAndHoraAndEstadoNot(mascota.getId(), datos.getFecha(), datos.getHora(), "Cancelada")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, mascota.getNombre() + " ya tiene una cita ese dia a esa hora");
        }

        Cita cita = new Cita();
        cita.setFecha(datos.getFecha());
        cita.setHora(datos.getHora());
        cita.setPrecio(servicio.getPrecio());
        cita.setEstado("Pendiente");
        cita.setPagado(false);
        cita.setIdMascota(mascota.getId());
        cita.setIdServicio(servicio.getId());
        cita.setIdMedico(null); // "Por asignar": lo elige la recepcionista

        return aDTO(citaRepository.save(cita));
    }

    // Mis Citas: todas las citas de todas las mascotas del cliente
    public List<CitaDTO> misCitas(Long idUsuario) {
        permisoService.obtenerUsuario(idUsuario);
        List<CitaDTO> lista = new ArrayList<>();
        for (Mascota mascota : mascotaRepository.findByIdUsuario(idUsuario)) {
            for (Cita cita : citaRepository.findByIdMascota(mascota.getId())) {
                lista.add(aDTO(cita));
            }
        }
        return lista;
    }

    // Recepcion > Citas: solo las pagadas
    public List<CitaDTO> citasPagadas(Long idUsuario) {
        permisoService.validarPersonal(idUsuario);
        List<CitaDTO> lista = new ArrayList<>();
        for (Cita cita : citaRepository.findByPagadoTrueOrderByFechaAscHoraAsc()) {
            lista.add(aDTO(cita));
        }
        return lista;
    }

    // Mis Citas > Ir a pagar
    public CitaDTO pagar(Long id, Long idUsuario) {
        permisoService.obtenerUsuario(idUsuario);
        Cita cita = obtener(id);
        validarDueno(cita, idUsuario);
        if (cita.getEstado().equals("Cancelada")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede pagar una cita cancelada");
        }
        if (cita.getPagado()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La cita ya estaba pagada");
        }
        cita.setPagado(true);
        return aDTO(citaRepository.save(cita));
    }

    // Mis Citas > Cancelar (el cliente) y Recepcion > Cancelar (la clinica).
    // No se borra: cambia a "Cancelada" y se guarda cuanto dinero se devuelve
    public CitaDTO cancelar(Long id, Long idUsuario) {
        Cita cita = obtener(id);
        validarQueSePuedeCancelar(cita);
        String por = quienCancela(cita, idUsuario);

        cita.setReembolso(calcularReembolso(cita, por));
        cita.setFechaCancelacion(LocalDateTime.now());
        cita.setCanceladaPor(por);
        cita.setEstado("Cancelada");
        return aDTO(citaRepository.save(cita));
    }

    // Cuanto se devolveria si se cancela AHORA (el front lo muestra antes de confirmar)
    public Integer verReembolso(Long id, Long idUsuario) {
        Cita cita = obtener(id);
        validarQueSePuedeCancelar(cita);
        return calcularReembolso(cita, quienCancela(cita, idUsuario));
    }

    // Recepcion > elegir medico
    public CitaDTO asignarMedico(Long id, Long idMedico, Long idUsuario) {
        permisoService.validarPersonal(idUsuario);
        Cita cita = obtener(id);
        if (!cita.getEstado().equals("Pendiente")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Solo se puede cambiar el medico de una cita pendiente");
        }

        Medico medico = medicoRepository.findById(idMedico)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No existe el medico " + idMedico));
        if (!medico.getActivo()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ese medico ya no trabaja en la clinica");
        }

        // El medico no puede atender dos citas a la misma hora
        if (citaRepository.existsByIdMedicoAndFechaAndHoraAndEstadoNotAndIdNot(idMedico, cita.getFecha(), cita.getHora(), "Cancelada", cita.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ese medico ya tiene otra cita ese dia a esa hora");
        }

        cita.setIdMedico(idMedico);
        return aDTO(citaRepository.save(cita));
    }

    // Recepcion > Confirmar
    public CitaDTO confirmar(Long id, Long idUsuario) {
        permisoService.validarPersonal(idUsuario);
        Cita cita = obtener(id);
        if (!cita.getEstado().equals("Pendiente")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Solo se puede confirmar una cita pendiente");
        }
        if (!cita.getPagado()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La cita todavia no esta pagada");
        }
        if (cita.getIdMedico() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Primero hay que asignar un medico");
        }
        cita.setEstado("Confirmada");
        return aDTO(citaRepository.save(cita));
    }

    // ---------- Metodos de ayuda ----------

    private Cita obtener(Long id) {
        return citaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe la cita " + id));
    }

    // Un cliente solo puede tocar las citas de SUS mascotas
    private void validarDueno(Cita cita, Long idUsuario) {
        Mascota mascota = mascotaRepository.findById(cita.getIdMascota())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe la mascota de esta cita"));
        if (!mascota.getIdUsuario().equals(idUsuario)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Esta cita no es suya");
        }
    }

    // Quien cancela se saca del ROL guardado en usuarios, no de lo que diga el front.
    // Asi un cliente no puede hacerse pasar por la clinica para que le devuelvan todo.
    private String quienCancela(Cita cita, Long idUsuario) {
        UsuarioDTO usuario = permisoService.obtenerUsuario(idUsuario);
        if (permisoService.esPersonal(usuario)) {
            return "Clinica";
        }
        validarDueno(cita, idUsuario);
        return "Cliente";
    }

    private void validarQueSePuedeCancelar(Cita cita) {
        if (cita.getEstado().equals("Cancelada")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La cita ya estaba cancelada");
        }
        if (cita.getFecha().isBefore(LocalDate.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede cancelar una cita que ya paso");
        }
    }

    // Regla de reembolso:
    // - Si la cita no estaba pagada, no hay nada que devolver.
    // - Si cancela la clinica, se devuelve todo (el cliente no tiene la culpa).
    // - Si cancela el cliente con 3 dias o mas de anticipacion, se devuelve todo.
    // - Si cancela el cliente con menos de 3 dias, no se devuelve nada.
    private Integer calcularReembolso(Cita cita, String por) {
        if (!cita.getPagado()) {
            return 0;
        }
        if (por.equals("Clinica")) {
            return cita.getPrecio();
        }
        // Dias que faltan desde hoy hasta el dia de la cita (ej: hoy viernes, cita lunes = 3)
        long diasQueFaltan = ChronoUnit.DAYS.between(LocalDate.now(), cita.getFecha());
        if (diasQueFaltan >= 3) {
            return cita.getPrecio();
        }
        return 0;
    }

    // Mismas reglas que el FormularioReserva del front
    private void validarHorario(LocalDate fecha, LocalTime hora) {
        LocalDate hoy = LocalDate.now();
        if (fecha.isBefore(hoy)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La fecha no puede ser anterior a hoy");
        }
        if (fecha.equals(hoy) && hora.isBefore(LocalTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Esa hora de hoy ya paso");
        }

        DayOfWeek dia = fecha.getDayOfWeek();
        if (dia == DayOfWeek.SUNDAY) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Los domingos no atendemos");
        }
        if (dia == DayOfWeek.SATURDAY) {
            if (hora.isBefore(LocalTime.of(10, 0)) || hora.isAfter(LocalTime.of(14, 0))) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Los sabados atendemos de 10:00 a 14:00");
            }
        } else if (hora.isBefore(LocalTime.of(9, 0)) || hora.isAfter(LocalTime.of(19, 0))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "De lunes a viernes atendemos de 09:00 a 19:00");
        }
    }

    private Mascota buscarOCrearMascota(ReservaDTO datos) {
        String nombre = datos.getNombreMascota().trim();
        Optional<Mascota> existente = mascotaRepository.findByIdUsuarioAndNombreIgnoreCaseAndIdEspecie(datos.getIdUsuario(), nombre, datos.getIdEspecie());
        if (existente.isPresent()) {
            return existente.get();
        }

        Mascota nueva = new Mascota();
        nueva.setNombre(nombre);
        nueva.setIdUsuario(datos.getIdUsuario());
        nueva.setIdEspecie(datos.getIdEspecie());
        return mascotaRepository.save(nueva);
    }

    // Arma la respuesta con los nombres de la mascota, el servicio, el medico y el cliente
    private CitaDTO aDTO(Cita cita) {
        CitaDTO dto = new CitaDTO();
        dto.setId(cita.getId());
        dto.setFecha(cita.getFecha());
        dto.setHora(cita.getHora());
        dto.setPrecio(cita.getPrecio());
        dto.setEstado(cita.getEstado());
        dto.setPagado(cita.getPagado());
        dto.setIdMascota(cita.getIdMascota());
        dto.setIdServicio(cita.getIdServicio());
        dto.setIdMedico(cita.getIdMedico());
        dto.setReembolso(cita.getReembolso());
        dto.setCanceladaPor(cita.getCanceladaPor());

        Optional<Mascota> mascota = mascotaRepository.findById(cita.getIdMascota());
        if (mascota.isPresent()) {
            dto.setNombreMascota(mascota.get().getNombre());

            UsuarioDTO cliente = usuarioClient.buscarUsuario(mascota.get().getIdUsuario());
            if (cliente != null) {
                dto.setCorreoCliente(cliente.getCorreo());
            }
        }

        ServicioDTO servicio = catalogoClient.buscarServicio(cita.getIdServicio());
        if (servicio != null) {
            dto.setNombreServicio(servicio.getNombre());
        }

        if (cita.getIdMedico() == null) {
            dto.setNombreMedico("Por asignar");
        } else {
            Optional<Medico> medico = medicoRepository.findById(cita.getIdMedico());
            if (medico.isPresent()) {
                dto.setNombreMedico(medico.get().getNombre() + " " + medico.get().getApellido());
            }
        }
        return dto;
    }
}
