// @vitest-environment jsdom

import { test, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";

import Citas from "../components/pages/Citas";

// fetch se simula con vi.spyOn, así la prueba no necesita el backend encendido
const respuestaFalsa = (datos: unknown) => new Response(JSON.stringify(datos), { status: 200 });

// Una cita pagada de $15000
const citaPagada = { id: 1, fecha: "2030-01-07", hora: "10:00", precio: 15000, estado: "Pendiente", pagado: true, nombreMascota: "Firulais", nombreServicio: "Consulta general", nombreMedico: "Por asignar", reembolso: null };

beforeEach(() => {
  localStorage.setItem("usuario", JSON.stringify({ id: 5, nombre: "Cliente", correo: "cliente@sanmarcos.cl", rol: "Cliente" }));
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

test("con 3 días o más de anticipación avisa que se devuelve todo", async () => {

  vi.spyOn(window, "alert").mockImplementation(() => {});
  const confirmacion = vi.spyOn(window, "confirm").mockImplementation(() => true);

  // 1ª: GET de las citas. 2ª: GET del reembolso (15000). 3ª: PUT de cancelar
  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce(respuestaFalsa([citaPagada]))
    .mockResolvedValueOnce(respuestaFalsa(15000))
    .mockResolvedValueOnce(respuestaFalsa({ id: 1, fecha: "2030-01-07", hora: "10:00", precio: 15000, estado: "Cancelada", pagado: true, nombreMascota: "Firulais", nombreServicio: "Consulta general", nombreMedico: "Por asignar", reembolso: 15000 }));

  render(<Citas />);

  fireEvent.click(await screen.findByRole("button", { name: "Cancelar" }));

  // Antes de cancelar se le muestra cuánto se le devuelve
  await waitFor(() => expect(confirmacion).toHaveBeenCalledWith("Si cancela ahora se le devolverán $15000. ¿Desea continuar?"));

  // Después, la tabla muestra la cita cancelada con su reembolso
  expect(await screen.findByText("Reembolso: $15000")).not.toBe(null);

});

test("con menos de 3 días avisa que no se devuelve el dinero", async () => {

  // El cliente se arrepiente y NO cancela
  const confirmacion = vi.spyOn(window, "confirm").mockImplementation(() => false);

  // 1ª: GET de las citas. 2ª: GET del reembolso (0)
  const llamadas = vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce(respuestaFalsa([citaPagada]))
    .mockResolvedValueOnce(respuestaFalsa(0));

  render(<Citas />);

  fireEvent.click(await screen.findByRole("button", { name: "Cancelar" }));

  await waitFor(() => expect(confirmacion).toHaveBeenCalledWith("Faltan menos de 3 días para la cita, así que no se devuelve el dinero. ¿Desea cancelar igual?"));

  // Como no aceptó, no se envió el PUT de cancelar (solo hubo 2 llamadas)
  expect(llamadas).toHaveBeenCalledTimes(2);

});
