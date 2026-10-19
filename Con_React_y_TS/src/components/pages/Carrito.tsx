import { useState } from 'react';
import BotonEliminarCarrito from '../atoms/BotonEliminarCarrito';

function Carrito() {
  const [medicamentos, setMedicamentos] = useState([
    { id: 1, imagen: '/img/Medicamentos/Amoxibay.jpg', nombre_comercial: 'Amoxibay 250mg', precio: 4200 },
    { id: 2, imagen: '/img/Medicamentos/Nexgard.jpg', nombre_comercial: 'Nexgard', precio: 9500 },
  ]);

  const eliminarMedicamento = (id: number) => {
    setMedicamentos(medicamentos.filter((medicamento) => medicamento.id !== id));
  };

  return (
    <div className = "container mt-4">
      <h2 className="mb-4 text-center">Mi Carrito</h2>

      <div className="table-responsive">
        <table id="tablaCarrito" className="table table-bordered align-middle bg-white">
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
                <td>
                  <img src={medicamento.imagen} alt={medicamento.nombre_comercial} style={{ width: "60px" }} />
                </td>
                <td>{medicamento.nombre_comercial}</td>
                <td>${medicamento.precio}</td>
                <td>
                  <BotonEliminarCarrito alEliminar={() => eliminarMedicamento(medicamento.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Carrito;
