import { useState } from 'react';

function Citas() {
  // Estado que almacena las citas/servicios de la tabla
  const [citas, setCitas] = useState([
    { id: 1, servicio: 'Consulta General', precio: 15000, estado: 'Pendiente' },
    { id: 2, servicio: 'Consulta de urgencia', precio: 25000, estado: 'Confirmado' },
  ]);

  // Función para eliminar un elemento por su id (equivalente a "Quitar")
  const eliminarCita = (id: number) => {
    setCitas(citas.filter((cita) => cita.id !== id));
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
                  <th>Quitar</th>
                </tr>
              </thead>
              <tbody id="cuerpoTabla">
                {citas.map((cita) => (
                  <tr key={cita.id}>
                    <td>{cita.servicio}</td>
                    <td>${cita.precio}</td>
                    <td>{cita.estado}</td>
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
