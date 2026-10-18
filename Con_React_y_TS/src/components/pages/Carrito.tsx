import React, { useState } from 'react';
import BotonEliminarCarrito from '../atoms/BotonEliminarCarrito';

interface Medicamento {
  id: number;
  imagen: string;
  nombre_comercial: string;
  precio: number;
}

export const TablaCarrito: React.FC = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([
    { id: 1, imagen: '/img/Medicamentos/Amoxibay.jpg', nombre_comercial: 'Amoxibay 250mg', precio: 4.200 },
    { id: 2, imagen: '/img/Medicamentos/Nexgard.jpg', nombre_comercial: 'Nexgard', precio: 9.500 },
  ]);

  const eliminarMedicamento = (id: number) => {
    setMedicamentos(medicamentos.filter((medicamento) => medicamento.id !== id));
  };

  return (
    <table id="tablaCitas">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Quitar</th>
        </tr>
      </thead>
      <tbody id="cuerpoTabla">
        {medicamentos.map((medicamento) => (
          <tr key={medicamento.id}>
            <td>{medicamento.imagen}</td>
            <td>${medicamento.nombre_comercial}</td>
            <td>{medicamento.precio}</td>
            <td>
              <BotonEliminarCarrito />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};