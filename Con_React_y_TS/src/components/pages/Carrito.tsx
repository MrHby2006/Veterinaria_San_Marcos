import { useState } from 'react';
import BotonEliminarCarrito from '../atoms/BotonEliminarCarrito';

function Carrito() {
  // pago = si el producto ya se pagó (Por pagar o Pagado)
  const [medicamentos, setMedicamentos] = useState([
    { id: 1, imagen: '/img/Medicamentos/Amoxibay.jpg', nombre_comercial: 'Amoxibay 250mg', precio: 4200, pago: 'Por pagar' },
    { id: 2, imagen: '/img/Medicamentos/Nexgard.jpg', nombre_comercial: 'Nexgard', precio: 9500, pago: 'Por pagar' },
  ]);

  const eliminarMedicamento = (id: number) => {
    setMedicamentos(medicamentos.filter((medicamento) => medicamento.id !== id));
  };

  // Suma los precios de los productos que faltan por pagar
  let totalPorPagar = 0;
  for (let i = 0; i < medicamentos.length; i++) {
    if (medicamentos[i].pago === 'Por pagar') {
      totalPorPagar = totalPorPagar + medicamentos[i].precio;
    }
  }

  // Paga todo el carrito de una vez
  const pagarTodo = () => {
    if (totalPorPagar === 0) {
      alert('No hay productos por pagar');
      return;
    }
    setMedicamentos(medicamentos.map((medicamento) => {
      return { id: medicamento.id, imagen: medicamento.imagen, nombre_comercial: medicamento.nombre_comercial, precio: medicamento.precio, pago: 'Pagado' };
    }));
    alert('Pago realizado con éxito');
  };

  return (
    <div className = "container mt-4">
      <h2 className="mb-4 text-center">Mi Carrito</h2>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="table-responsive">
            <table id="tablaCarrito" className="table table-bordered align-middle bg-white">
              <thead>
                <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Pago</th>
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
                <td className={medicamento.pago === 'Pagado' ? 'text-success fw-bold' : ''}>{medicamento.pago}</td>
                <td>
                  <BotonEliminarCarrito alEliminar={() => eliminarMedicamento(medicamento.id)} />
                </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total y botón global para pagar todo */}
          <div className="text-center mb-4">
            <h4>Total por pagar: ${totalPorPagar}</h4>
            <button className="btn btn-success" onClick={pagarTodo}>Ir a pagar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
