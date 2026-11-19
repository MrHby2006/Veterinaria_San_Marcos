import { useEffect, useState } from 'react';
import BotonEliminarCarrito from '../atoms/BotonEliminarCarrito';
import { API, leerError } from '../../data/api';
import { obtenerUsuario } from '../../data/sesion';

// Datos de cada producto del carrito que manda el microservicio ventas
interface ItemCarrito {
  id: number;
  nombreMedicamento: string;
  imagen: string;
  cantidad: number;
  precio: number;
  subtotal: number; // precio * cantidad
}

function Carrito() {
  const usuario = obtenerUsuario();

  // Productos que el cliente todavía no paga, vienen del backend
  const [medicamentos, setMedicamentos] = useState<ItemCarrito[]>([]);

  // Consulta el carrito del cliente al abrir la página
  useEffect(() => {
    const usuarioActual = obtenerUsuario();
    if (usuarioActual === null) {
      return;
    }
    fetch(API + '/api/compras/carrito/' + usuarioActual.id)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error al consultar el carrito');
        }
        return respuesta.json();
      })
      .then((datos) => setMedicamentos(datos))
      .catch(() => alert('No se pudo cargar el carrito'));
  }, []);

  // Quita un producto del carrito (aquí sí se borra, porque todavía no se pagó)
  const eliminarMedicamento = async (id: number) => {
    try {
      const respuesta = await fetch(API + '/api/compras/' + id + '?idUsuario=' + usuario?.id, { method: 'DELETE' });
      if (!respuesta.ok) {
        alert(await leerError(respuesta));
        return;
      }
      setMedicamentos(medicamentos.filter((medicamento) => medicamento.id !== id));
    } catch {
      alert('No se pudo conectar con el servidor');
    }
  };

  // Suma los subtotales de los productos del carrito
  let totalPorPagar = 0;
  for (let i = 0; i < medicamentos.length; i++) {
    totalPorPagar = totalPorPagar + medicamentos[i].subtotal;
  }

  // Paga todo el carrito de una vez. El backend revisa el stock y lo descuenta
  const pagarTodo = async () => {
    if (usuario === null || totalPorPagar === 0) {
      alert('No hay productos por pagar');
      return;
    }
    try {
      const respuesta = await fetch(API + '/api/compras/pagar/' + usuario.id, { method: 'PUT' });
      if (!respuesta.ok) {
        alert(await leerError(respuesta));
        return;
      }
      // Lo pagado sale del carrito y pasa a Recepción para que lo retiren
      setMedicamentos([]);
      alert('Pago realizado con éxito');
    } catch {
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className = "container mt-4">
      <h2 className="mb-4 text-center">Mi Carrito</h2>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">

          {/* Sin sesión no se sabe de quién es el carrito */}
          {usuario === null ? (
            <p className="text-center">Debe <a href="/login">iniciar sesión</a> para ver su carrito.</p>
          ) : (
            <>
              <div className="table-responsive">
                <table id="tablaCarrito" className="table table-bordered align-middle bg-white">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Subtotal</th>
                      <th>Quitar</th>
                    </tr>
                  </thead>
                  <tbody id="cuerpoTabla">
                    {medicamentos.map((medicamento) => (
                      <tr key={medicamento.id}>
                        <td>
                          <img src={medicamento.imagen} alt={medicamento.nombreMedicamento} style={{ width: "60px" }} />
                        </td>
                        <td>{medicamento.nombreMedicamento}</td>
                        <td>{medicamento.cantidad}</td>
                        <td>${medicamento.precio}</td>
                        <td>${medicamento.subtotal}</td>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carrito;
