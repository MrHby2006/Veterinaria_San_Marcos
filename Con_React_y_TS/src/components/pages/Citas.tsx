import { useState } from 'react';

function Citas() {
  // Estado que almacena las citas/servicios de la tabla
  // estado = lo que decide la recepcionista (Pendiente, Confirmada o Cancelada)
  // pago = si el cliente ya pagó la cita (Por pagar o Pagado)
  // Solo las citas pagadas le llegan a la recepcionista, por eso una cita confirmada siempre está pagada
  const [citas, setCitas] = useState([
    { id: 1, servicio: 'Consulta General', precio: 15000, estado: 'Pendiente', medico: '', pago: 'Por pagar' },
    { id: 2, servicio: 'Consulta de urgencia', precio: 25000, estado: 'Confirmada', medico: 'Dra. Camila Rojas', pago: 'Pagado' },
  ]);

  // Función para eliminar un elemento por su id (equivalente a "Quitar")
  const eliminarCita = (id: number) => {
    setCitas(citas.filter((cita) => cita.id !== id));
  };

  // Marca una sola cita como pagada
  const pagarCita = (id: number) => {
    setCitas(citas.map((cita) => {
      if (cita.id === id) {
        return { id: cita.id, servicio: cita.servicio, precio: cita.precio, estado: cita.estado, medico: cita.medico, pago: 'Pagado' };
      }
      return cita;
    }));
    alert('Pago realizado con éxito');
  };

  return (
    <div className = "container mt-4">
      <h2 className="mb-4 text-center">Mis Citas</h2>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="table-responsive">
            <table id="tablaCitas" className="table table-bordered align-middle bg-white">
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Médico</th>
                  <th>Pago</th>
                  <th>Quitar</th>
                </tr>
              </thead>
              <tbody id="cuerpoTabla">
                {citas.map((cita) => (
                  <tr key={cita.id}>
                    <td>{cita.servicio}</td>
                    <td>${cita.precio}</td>
                    <td>{cita.estado}</td>

                    {/* El médico solo se muestra cuando la recepcionista confirma la cita */}
                    <td>{cita.estado === 'Confirmada' ? cita.medico : 'Por asignar'}</td>

                    {/* Si está por pagar se muestra el botón, si no, dice Pagado */}
                    <td>
                      {cita.pago === 'Por pagar' ? (
                        <button className="btn btn-success btn-sm" onClick={() => pagarCita(cita.id)}>Ir a pagar</button>
                      ) : (
                        <span className="text-success fw-bold">Pagado</span>
                      )}
                    </td>

                    <td>
                      <button className="btn btn-primary btn-sm" onClick={() => eliminarCita(cita.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Citas;
