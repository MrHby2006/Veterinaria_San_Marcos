import { useEffect, useState } from 'react';
import { API, leerError } from '../../data/api';
import { obtenerUsuario } from '../../data/sesion';

// Datos de cada cita que manda el microservicio citas
interface Cita {
  id: number;
  fecha: string;
  hora: string;
  precio: number;
  estado: string; // Pendiente, Confirmada o Cancelada (lo decide la recepcionista)
  pagado: boolean;
  nombreMascota: string;
  nombreServicio: string;
  nombreMedico: string;
  reembolso: number | null; // Cuánto se devolvió al cancelar (null si no está cancelada)
}

function Citas() {
  const usuario = obtenerUsuario();

  // Citas del cliente, vienen del backend
  const [citas, setCitas] = useState<Cita[]>([]);

  // Consulta las citas del cliente al abrir la página
  useEffect(() => {
    const usuarioActual = obtenerUsuario();
    if (usuarioActual === null) {
      return;
    }
    fetch(API + '/api/citas/usuario/' + usuarioActual.id)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error al consultar las citas');
        }
        return respuesta.json();
      })
      .then((datos) => setCitas(datos))
      .catch(() => alert('No se pudieron cargar las citas'));
  }, []);

  // Reemplaza en la tabla la cita que cambió por la que devolvió el backend
  const actualizarEnTabla = (citaNueva: Cita) => {
    setCitas(citas.map((cita) => {
      if (cita.id === citaNueva.id) {
        return citaNueva;
      }
      return cita;
    }));
  };

  // Paga una sola cita
  const pagarCita = async (id: number) => {
    try {
      const respuesta = await fetch(API + '/api/citas/' + id + '/pagar?idUsuario=' + usuario?.id, { method: 'PUT' });
      if (!respuesta.ok) {
        alert(await leerError(respuesta));
        return;
      }
      actualizarEnTabla(await respuesta.json());
      alert('Pago realizado con éxito');
    } catch {
      alert('No se pudo conectar con el servidor');
    }
  };

  // Cancela la cita. No se borra: queda con estado "Cancelada".
  // Si estaba pagada, primero se le muestra al cliente cuánto se le devolverá
  const cancelarCita = async (id: number, pagado: boolean) => {
    try {
      let mensaje = '¿Seguro que quiere cancelar esta cita?';

      if (pagado) {
        // El backend calcula el reembolso (100% con 3 días o más de anticipación, si no, nada)
        const consulta = await fetch(API + '/api/citas/' + id + '/reembolso?idUsuario=' + usuario?.id);
        if (!consulta.ok) {
          alert(await leerError(consulta));
          return;
        }
        const reembolso: number = await consulta.json();
        if (reembolso > 0) {
          mensaje = 'Si cancela ahora se le devolverán $' + reembolso + '. ¿Desea continuar?';
        } else {
          mensaje = 'Faltan menos de 3 días para la cita, así que no se devuelve el dinero. ¿Desea cancelar igual?';
        }
      }

      if (!confirm(mensaje)) {
        return;
      }

      const respuesta = await fetch(API + '/api/citas/' + id + '/cancelar?idUsuario=' + usuario?.id, { method: 'PUT' });
      if (!respuesta.ok) {
        alert(await leerError(respuesta));
        return;
      }
      const citaCancelada: Cita = await respuesta.json();
      actualizarEnTabla(citaCancelada);
      if (citaCancelada.reembolso !== null && citaCancelada.reembolso > 0) {
        alert('Cita cancelada. Se le devolverán $' + citaCancelada.reembolso);
      } else {
        alert('Cita cancelada');
      }
    } catch {
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className = "container mt-4">
      <h2 className="mb-4 text-center">Mis Citas</h2>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">

          {/* Sin sesión no se sabe de quién son las citas */}
          {usuario === null ? (
            <p className="text-center">Debe <a href="/login">iniciar sesión</a> para ver sus citas.</p>
          ) : (
            <div className="table-responsive">
              <table id="tablaCitas" className="table table-bordered align-middle bg-white">
                <thead>
                  <tr>
                    <th>Mascota</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Médico</th>
                    <th>Pago</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody id="cuerpoTabla">
                  {citas.map((cita) => (
                    <tr key={cita.id}>
                      <td>{cita.nombreMascota}</td>
                      <td>{cita.nombreServicio}</td>
                      <td>{cita.fecha}</td>
                      <td>{cita.hora}</td>
                      <td>${cita.precio}</td>
                      {/* Si se canceló una cita pagada, también se muestra el reembolso */}
                      <td>
                        {cita.estado}
                        {cita.estado === 'Cancelada' && cita.pagado && (
                          <div className="small text-muted">Reembolso: ${cita.reembolso}</div>
                        )}
                      </td>

                      {/* El médico solo se muestra cuando la recepcionista confirma la cita */}
                      <td>{cita.estado === 'Confirmada' ? cita.nombreMedico : 'Por asignar'}</td>

                      {/* Si está por pagar se muestra el botón, si no, dice Pagado */}
                      <td>
                        {cita.pagado ? (
                          <span className="text-success fw-bold">Pagado</span>
                        ) : cita.estado === 'Cancelada' ? (
                          <span className="text-muted">-</span>
                        ) : (
                          <button className="btn btn-success btn-sm" onClick={() => pagarCita(cita.id)}>Ir a pagar</button>
                        )}
                      </td>

                      <td>
                        {cita.estado === 'Cancelada' ? (
                          <span className="text-muted">Sin acciones</span>
                        ) : (
                          <button className="btn btn-danger btn-sm" onClick={() => cancelarCita(cita.id, cita.pagado)}>Cancelar</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Citas;
