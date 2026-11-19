package cl.veterinaria.ventas.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.veterinaria.ventas.client.CatalogoClient;
import cl.veterinaria.ventas.client.UsuarioClient;
import cl.veterinaria.ventas.dto.AgregarCarritoDTO;
import cl.veterinaria.ventas.dto.CompraDTO;
import cl.veterinaria.ventas.dto.MedicamentoDTO;
import cl.veterinaria.ventas.dto.UsuarioDTO;
import cl.veterinaria.ventas.model.Compra;
import cl.veterinaria.ventas.repository.CompraRepository;

@Service
public class CompraService {

    private final CompraRepository repository;
    private final CatalogoClient catalogoClient;
    private final UsuarioClient usuarioClient;
    private final PermisoService permisoService;

    public CompraService(CompraRepository repository, CatalogoClient catalogoClient, UsuarioClient usuarioClient,
            PermisoService permisoService) {
        this.repository = repository;
        this.catalogoClient = catalogoClient;
        this.usuarioClient = usuarioClient;
        this.permisoService = permisoService;
    }

    // Detalle de medicamento > Añadir al carrito
    public CompraDTO agregarAlCarrito(AgregarCarritoDTO datos) {
        // 1. Quien compra tiene que ser un Cliente activo (pregunta a usuarios)
        permisoService.validarCliente(datos.getIdUsuario());

        // 2. El medicamento existe (pregunta a catalogo)
        MedicamentoDTO medicamento = catalogoClient.buscarMedicamento(datos.getIdMedicamento());
        if (medicamento == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El medicamento no existe");
        }

        // 3. Si ya estaba en el carrito se suma la cantidad, si no se crea la fila
        Optional<Compra> enCarrito = repository.findByIdUsuarioAndIdMedicamentoAndPagadoFalse(datos.getIdUsuario(), datos.getIdMedicamento());
        Compra compra;
        int cantidadTotal;
        if (enCarrito.isPresent()) {
            compra = enCarrito.get();
            cantidadTotal = compra.getCantidad() + datos.getCantidad();
        } else {
            compra = new Compra();
            compra.setIdUsuario(datos.getIdUsuario());
            compra.setIdMedicamento(datos.getIdMedicamento());
            compra.setPagado(false);
            compra.setEntregado(false);
            cantidadTotal = datos.getCantidad();
        }

        // 4. Tiene que haber stock para todo lo que quiere llevar
        validarStock(medicamento, cantidadTotal);

        // 5. El precio se copia desde catalogo (no se confia en el que mande el front)
        compra.setCantidad(cantidadTotal);
        compra.setPrecio(medicamento.getPrecioUnitario());

        return aDTO(repository.save(compra), medicamento, null);
    }

    // Carrito
    public List<CompraDTO> verCarrito(Long idUsuario) {
        permisoService.validarCliente(idUsuario);
        List<CompraDTO> lista = new ArrayList<>();
        for (Compra compra : repository.findByIdUsuarioAndPagadoFalse(idUsuario)) {
            lista.add(aDTO(compra, catalogoClient.buscarMedicamento(compra.getIdMedicamento()), null));
        }
        return lista;
    }

    // Carrito > Quitar: aqui si se borra, porque todavia no se compro nada
    public void quitarDelCarrito(Long id, Long idUsuario) {
        permisoService.validarCliente(idUsuario);
        Compra compra = obtener(id);
        validarDueno(compra, idUsuario);
        if (compra.getPagado()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede quitar algo que ya esta pagado");
        }
        repository.delete(compra);
    }

    // Carrito > Ir a pagar
    public List<CompraDTO> pagar(Long idUsuario) {
        permisoService.validarCliente(idUsuario);
        List<Compra> carrito = repository.findByIdUsuarioAndPagadoFalse(idUsuario);
        if (carrito.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No hay productos por pagar");
        }

        // Paso 1: revisar TODO el stock antes de descontar nada.
        // Asi, si falta stock de uno, no queda descontado el de los otros.
        List<MedicamentoDTO> medicamentos = new ArrayList<>();
        for (Compra compra : carrito) {
            MedicamentoDTO medicamento = catalogoClient.buscarMedicamento(compra.getIdMedicamento());
            if (medicamento == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Un medicamento de tu carrito ya no existe, quitalo para poder pagar");
            }
            validarStock(medicamento, compra.getCantidad());
            medicamentos.add(medicamento);
        }

        // Paso 2: descontar stock y marcar como pagado
        LocalDateTime ahora = LocalDateTime.now();
        List<CompraDTO> pagadas = new ArrayList<>();
        for (int i = 0; i < carrito.size(); i++) {
            Compra compra = carrito.get(i);
            catalogoClient.descontarStock(compra.getIdMedicamento(), compra.getCantidad());
            compra.setPagado(true);
            compra.setFechaPago(ahora);
            pagadas.add(aDTO(repository.save(compra), medicamentos.get(i), null));
        }
        return pagadas;
    }

    // Recepcion > Retiro de medicamentos: todo lo pagado (entregado o no)
    public List<CompraDTO> comprasPagadas(Long idUsuario) {
        permisoService.validarPersonal(idUsuario);
        List<CompraDTO> lista = new ArrayList<>();
        for (Compra compra : repository.findByPagadoTrueOrderByFechaPagoDesc()) {
            UsuarioDTO cliente = usuarioClient.buscarUsuario(compra.getIdUsuario());
            String correo = null;
            if (cliente != null) {
                correo = cliente.getCorreo();
            }
            lista.add(aDTO(compra, catalogoClient.buscarMedicamento(compra.getIdMedicamento()), correo));
        }
        return lista;
    }

    // Recepcion > Marcar como entregado
    public CompraDTO marcarEntregado(Long id, Long idUsuario) {
        permisoService.validarPersonal(idUsuario);
        Compra compra = obtener(id);
        if (!compra.getPagado()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede entregar algo que no esta pagado");
        }
        if (compra.getEntregado()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Este medicamento ya fue entregado");
        }
        compra.setEntregado(true);
        return aDTO(repository.save(compra), catalogoClient.buscarMedicamento(compra.getIdMedicamento()), null);
    }

    // ---------- Metodos de ayuda ----------

    private Compra obtener(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe la compra " + id));
    }

    // Un cliente solo puede tocar SU carrito
    private void validarDueno(Compra compra, Long idUsuario) {
        if (!compra.getIdUsuario().equals(idUsuario)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Este producto no esta en su carrito");
        }
    }

    private void validarStock(MedicamentoDTO medicamento, int cantidad) {
        if (medicamento.getStockActual() < cantidad) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Solo quedan " + medicamento.getStockActual() + " unidades de " + medicamento.getNombreComercial());
        }
    }

    // medicamento puede venir en null si catalogo ya no lo tiene
    private CompraDTO aDTO(Compra compra, MedicamentoDTO medicamento, String correoCliente) {
        CompraDTO dto = new CompraDTO();
        dto.setId(compra.getId());
        dto.setIdMedicamento(compra.getIdMedicamento());
        if (medicamento == null) {
            dto.setNombreMedicamento("Medicamento no disponible");
        } else {
            dto.setNombreMedicamento(medicamento.getNombreComercial());
            dto.setImagen(medicamento.getImagen());
        }
        dto.setCantidad(compra.getCantidad());
        dto.setPrecio(compra.getPrecio());
        dto.setSubtotal(compra.getPrecio() * compra.getCantidad());
        dto.setPagado(compra.getPagado());
        dto.setEntregado(compra.getEntregado());
        dto.setFechaAgregado(compra.getFechaAgregado());
        dto.setFechaPago(compra.getFechaPago());
        dto.setCorreoCliente(correoCliente);
        return dto;
    }
}
