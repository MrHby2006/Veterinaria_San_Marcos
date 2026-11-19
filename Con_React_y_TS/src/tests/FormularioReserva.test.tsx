// @vitest-environment jsdom

import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";

import FormularioReserva from "../components/organism/FormularioReserva";

// fetch se simula con vi.spyOn, así la prueba no necesita el backend encendido
const respuestaFalsa = (datos: unknown) => new Response(JSON.stringify(datos), { status: 200 });

// Las especies que "devuelve" catalogo para el select
const especies = [{ id: 1, nombre: "Perro" }, { id: 2, nombre: "Gato" }];

// Después de cada prueba borra el formulario de la pantalla,
// así la siguiente prueba empieza con un formulario nuevo
afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

// Llena el formulario con la fecha y la hora que le pasemos
const llenarFormulario = async (fecha: string, hora: string) => {
  // Espera a que el select tenga las especies que llegaron del backend
  await screen.findByRole("option", { name: "Perro" });

  fireEvent.change(screen.getByLabelText("Nombre de la mascota"), { target: { value: "Firulais" } });
  fireEvent.change(screen.getByLabelText("Especie"), { target: { value: "1" } }); // 1 = Perro
  fireEvent.change(screen.getByLabelText("Fecha"), { target: { value: fecha } });
  fireEvent.change(screen.getByLabelText("Hora"), { target: { value: hora } });
};

test("no deja reservar una fecha que ya pasó", async () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});
  vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(respuestaFalsa(especies));

  render(<FormularioReserva servicio="Consulta general" idServicio={1} />);

  await llenarFormulario("2020-01-06", "10:00");

  fireEvent.click(screen.getByRole("button", { name: "Reservar hora" }));

  expect(alerta).toHaveBeenCalledWith("La fecha no puede ser anterior a hoy");

});

test("no deja reservar un domingo", async () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});
  vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(respuestaFalsa(especies));

  render(<FormularioReserva servicio="Consulta general" idServicio={1} />);

  // El 6 de enero de 2030 es domingo
  await llenarFormulario("2030-01-06", "10:00");

  fireEvent.click(screen.getByRole("button", { name: "Reservar hora" }));

  expect(alerta).toHaveBeenCalledWith("Los domingos no atendemos");

});

test("reserva la hora cuando todos los datos son correctos", async () => {

  // Para reservar hay que haber iniciado sesión
  localStorage.setItem("usuario", JSON.stringify({ id: 5, nombre: "Cliente", correo: "cliente@sanmarcos.cl", rol: "Cliente" }));

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  // 1ª llamada: GET de especies. 2ª llamada: POST de la cita
  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce(respuestaFalsa(especies))
    .mockResolvedValueOnce(respuestaFalsa({ id: 1 }));

  render(<FormularioReserva servicio="Consulta general" idServicio={1} />);

  // El 7 de enero de 2030 es lunes
  await llenarFormulario("2030-01-07", "10:00");

  fireEvent.click(screen.getByRole("button", { name: "Reservar hora" }));

  await waitFor(() => expect(alerta).toHaveBeenCalledWith("Hora reservada con éxito para Firulais: Consulta general el 2030-01-07 a las 10:00"));

});
