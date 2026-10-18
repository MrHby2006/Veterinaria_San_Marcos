import React, { useState } from 'react';

// Definimos la estructura de cada elemento de la tabla
interface Cita {
  id: number;
  servicio: string;
  precio: number;
  estado: string;
}

export const TablaCitas: React.FC = () => {
  // Estado que almacena las citas/servicios de la tabla
  const [citas, setCitas] = useState<Cita[]>([
    { id: 1, servicio: 'Consulta General', precio: 15.000, estado: 'Pendiente' },
    { id: 2, servicio: 'Consulta de urgencia', precio: 25.000, estado: 'Confirmado' },
  ]);

  // Función para eliminar un elemento por su id (equivalente a "Quitar")
  const eliminarCita = (id: number) => {
    setCitas(citas.filter((cita) => cita.id !== id));
  };

  return (
    <table id="tablaCitas">
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
              <button onClick={() => eliminarCita(cita.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};