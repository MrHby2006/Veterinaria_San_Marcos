// @vitest-environment jsdom

import { test, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";

import Carrito from "../components/pages/Carrito";
import Citas from "../components/pages/Citas";

// fetch se simula con vi.spyOn, así la prueba no necesita el backend encendido
const respuestaFalsa = (datos: unknown) => new Response(JSON.stringify(datos), { status: 200 });

// El carrito y las citas solo se muestran si inició sesión un cliente
beforeEach(() => {
  localStorage.setItem("usuario", JSON.stringify({ id: 5, nombre: "Cliente", correo: "cliente@sanmarcos.cl", rol: "Cliente" }));
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

test("el carrito suma el total y lo deja en 0 después de pagar", async () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  // 1ª llamada: GET del carrito. 2ª llamada: PUT de pagar
  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce(respuestaFalsa([
      { id: 1, nombreMedicamento: "Amoxibay 250mg", imagen: "", cantidad: 1, precio: 4200, subtotal: 4200 },
      { id: 2, nombreMedicamento: "Nexgard", imagen: "", cantidad: 1, precio: 9500, subtotal: 9500 },
    ]))
    .mockResolvedValueOnce(respuestaFalsa([]));

  render(<Carrito />);

  // Amoxibay (4200) + Nexgard (9500) = 13700
  expect(await screen.findByText("Total por pagar: $13700")).not.toBe(null);

  fireEvent.click(screen.getByRole("button", { name: "Ir a pagar" }));

  // Después de pagar el carrito queda vacío
  expect(await screen.findByText("Total por pagar: $0")).not.toBe(null);
  expect(screen.queryByText("Nexgard")).toBe(null);
  expect(alerta).toHaveBeenCalledWith("Pago realizado con éxito");

});

test("una cita por pagar queda como Pagado al presionar Ir a pagar", async () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  const citaPorPagar = { id: 1, fecha: "2030-01-07", hora: "10:00", precio: 15000, estado: "Pendiente", pagado: false, nombreMascota: "Firulais", nombreServicio: "Consulta general", nombreMedico: "Por asignar" };
  const citaPagada = { id: 2, fecha: "2030-01-08", hora: "11:00", precio: 25000, estado: "Confirmada", pagado: true, nombreMascota: "Michi", nombreServicio: "Consulta de urgencia", nombreMedico: "Camila Rojas" };

  // 1ª llamada: GET de las citas. 2ª llamada: PUT de pagar, que devuelve la cita ya pagada
  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce(respuestaFalsa([citaPorPagar, citaPagada]))
    .mockResolvedValueOnce(respuestaFalsa({ id: 1, fecha: "2030-01-07", hora: "10:00", precio: 15000, estado: "Pendiente", pagado: true, nombreMascota: "Firulais", nombreServicio: "Consulta general", nombreMedico: "Por asignar" }));

  render(<Citas />);

  fireEvent.click(await screen.findByRole("button", { name: "Ir a pagar" }));

  // El botón desaparece y las 2 citas quedan pagadas
  await waitFor(() => expect(screen.queryByRole("button", { name: "Ir a pagar" })).toBe(null));
  expect(screen.getAllByText("Pagado").length).toBe(2);
  expect(alerta).toHaveBeenCalledWith("Pago realizado con éxito");

});
