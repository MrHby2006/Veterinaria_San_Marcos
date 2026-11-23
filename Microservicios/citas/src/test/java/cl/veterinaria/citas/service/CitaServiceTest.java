package cl.veterinaria.citas.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
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

@ExtendWith(MockitoExtension.class)
class CitaServiceTest {

    @Mock private CitaRepository citaRepository;
    @Mock private MascotaRepository mascotaRepository;
    @Mock private MedicoRepository medicoRepository;
    @Mock private CatalogoClient catalogoClient;
    @Mock private UsuarioClient usuarioClient;
    @Mock private PermisoService permisoService;

    @InjectMocks
    private CitaService service;

    private LocalDate proximoDiaHabil;
    private Mascota mascota;
    private Cita citaPagada;
    private UsuarioDTO clienteDTO;
    private UsuarioDTO recepDTO;

    @BeforeEach
    void setUp() {
        proximoDiaHabil = LocalDate.now().plusDays(1);
        while (proximoDiaHabil.getDayOfWeek() == DayOfWeek.SUNDAY) {
            proximoDiaHabil = proximoDiaHabil.plusDays(1);
        }

        mascota = new Mascota();
        mascota.setId(10L);
        mascota.setNombre("Firulais");
        mascota.setIdUsuario(5L);
        mascota.setIdEspecie(1L);

        citaPagada = new Cita();
        citaPagada.setId(100L);
        citaPagada.setFecha(LocalDate.now().plusDays(5));
        citaPagada.setHora(LocalTime.of(11, 0));
        citaPagada.setPrecio(20000);
        citaPagada.setEstado("Pendiente");
        citaPagada.setPagado(true);
        citaPagada.setIdMascota(10L);
        citaPagada.setIdServicio(2L);

        clienteDTO = new UsuarioDTO();
        clienteDTO.setId(5L);
        clienteDTO.setCorreo("cliente@vet.cl");
        clienteDTO.setRol("Cliente");
        clienteDTO.setActivo(true);

        recepDTO = new UsuarioDTO();
        recepDTO.setId(9L);
        recepDTO.setCorreo("recep@vet.cl");
        recepDTO.setRol("Recepcionista");
        recepDTO.setActivo(true);
    }

    @Test
    void reservar_exitosaCopiaPrecioDeCatalogoYCreaMascotaSiNoExiste() {
        LocalTime hora = proximoDiaHabil.getDayOfWeek() == DayOfWeek.SATURDAY
                ? LocalTime.of(11, 0) : LocalTime.of(15, 0);

        ReservaDTO req = new ReservaDTO();
        req.setIdUsuario(5L);
        req.setNombreMascota("Firulais");
        req.setIdEspecie(1L);
        req.setIdServicio(2L);
        req.setFecha(proximoDiaHabil);
        req.setHora(hora);

        ServicioDTO srv = new ServicioDTO();
        srv.setId(2L);
        srv.setNombre("Vacunacion");
        srv.setPrecio(18500);

        when(catalogoClient.existeEspecie(1L)).thenReturn(true);
        when(catalogoClient.buscarServicio(2L)).thenReturn(srv);
        when(mascotaRepository.findByIdUsuarioAndNombreIgnoreCaseAndIdEspecie(5L, "Firulais", 1L))
                .thenReturn(Optional.empty());
        when(mascotaRepository.save(any(Mascota.class))).thenReturn(mascota);
        when(citaRepository.existsByIdMascotaAndFechaAndHoraAndEstadoNot(10L, proximoDiaHabil, hora, "Cancelada"))
                .thenReturn(false);
        when(citaRepository.save(any(Cita.class))).thenAnswer(inv -> {
            Cita c = inv.getArgument(0);
            c.setId(55L);
            return c;
        });
        when(mascotaRepository.findById(10L)).thenReturn(Optional.of(mascota));
        when(usuarioClient.buscarUsuario(5L)).thenReturn(clienteDTO);

        CitaDTO res = service.reservar(req);
        assertEquals(55L, res.getId());
        assertEquals(18500, res.getPrecio());
        assertEquals("Pendiente", res.getEstado());
        assertEquals("Por asignar", res.getNombreMedico());
    }

    @Test
    void reservar_enDomingoLanzaBadRequest() {
        LocalDate domingo = LocalDate.now().plusDays(1);
        while (domingo.getDayOfWeek() != DayOfWeek.SUNDAY) {
            domingo = domingo.plusDays(1);
        }

        ReservaDTO req = new ReservaDTO();
        req.setIdUsuario(5L);
        req.setNombreMascota("Firulais");
        req.setIdEspecie(1L);
        req.setIdServicio(2L);
        req.setFecha(domingo);
        req.setHora(LocalTime.of(11, 0));

        ServicioDTO srv = new ServicioDTO();
        srv.setId(2L);
        srv.setNombre("Consulta");
        srv.setPrecio(15000);

        when(catalogoClient.existeEspecie(1L)).thenReturn(true);
        when(catalogoClient.buscarServicio(2L)).thenReturn(srv);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.reservar(req));
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
    }

    @Test
    void cancelar_clienteConMenosDe3DiasTieneReembolsoCero() {
        citaPagada.setFecha(LocalDate.now().plusDays(1));
        when(citaRepository.findById(100L)).thenReturn(Optional.of(citaPagada));
        when(permisoService.obtenerUsuario(5L)).thenReturn(clienteDTO);
        when(permisoService.esPersonal(clienteDTO)).thenReturn(false);
        when(mascotaRepository.findById(10L)).thenReturn(Optional.of(mascota));
        when(citaRepository.save(any(Cita.class))).thenAnswer(inv -> inv.getArgument(0));
        when(usuarioClient.buscarUsuario(5L)).thenReturn(clienteDTO);

        CitaDTO res = service.cancelar(100L, 5L);
        assertEquals("Cancelada", res.getEstado());
        assertEquals(0, res.getReembolso());
        assertEquals("Cliente", res.getCanceladaPor());
    }

    @Test
    void cancelar_clinicaReembolsaCienPorCiento() {
        citaPagada.setFecha(LocalDate.now().plusDays(1));
        when(citaRepository.findById(100L)).thenReturn(Optional.of(citaPagada));
        when(permisoService.obtenerUsuario(9L)).thenReturn(recepDTO);
        when(permisoService.esPersonal(recepDTO)).thenReturn(true);
        when(citaRepository.save(any(Cita.class))).thenAnswer(inv -> inv.getArgument(0));
        when(mascotaRepository.findById(10L)).thenReturn(Optional.of(mascota));
        when(usuarioClient.buscarUsuario(5L)).thenReturn(clienteDTO);

        CitaDTO res = service.cancelar(100L, 9L);
        assertEquals(20000, res.getReembolso());
        assertEquals("Clinica", res.getCanceladaPor());
    }

    @Test
    void asignarMedico_rechazaChoqueHorario() {
        Medico medico = new Medico();
        medico.setId(3L);
        medico.setNombre("Carla");
        medico.setApellido("Rojas");
        medico.setActivo(true);

        when(citaRepository.findById(100L)).thenReturn(Optional.of(citaPagada));
        when(medicoRepository.findById(3L)).thenReturn(Optional.of(medico));
        when(citaRepository.existsByIdMedicoAndFechaAndHoraAndEstadoNotAndIdNot(
                3L, citaPagada.getFecha(), citaPagada.getHora(), "Cancelada", 100L)).thenReturn(true);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.asignarMedico(100L, 3L, 9L));
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
    }
}
