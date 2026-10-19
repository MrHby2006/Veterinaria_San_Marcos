// @vitest-environment jsdom

import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import FormularioReserva from "../components/organism/FormularioReserva";

// Después de cada prueba borra el formulario de la pantalla,
// así la siguiente prueba empieza con un formulario nuevo
afterEach(() => {
  cleanup();
});

// Llena el formulario con la fecha y la hora que le pasemos
const llenarFormulario = (fecha: string, hora: string) => {
  fireEvent.change(screen.getByLabelText("Nombre de la mascota"), { target: { value: "Firulais" } });
  fireEvent.change(screen.getByLabelText("Especie"), { target: { value: "Perro" } });
  fireEvent.change(screen.getByLabelText("Fecha"), { target: { value: fecha } });
  fireEvent.change(screen.getByLabelText("Hora"), { target: { value: hora } });
};

test("muestra una alerta cuando el nombre de la mascota está vacío", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<FormularioReserva servicio="Consulta general" />);

  fireEvent.click(screen.getByRole("button", { name: "Reservar hora" }));

  expect(alerta).toHaveBeenCalledWith("Debe ingresar el nombre de su mascota");

  alerta.mockRestore();

});

test("no deja reservar una fecha que ya pasó", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<FormularioReserva servicio="Consulta general" />);

  llenarFormulario("2020-01-06", "10:00");

  fireEvent.click(screen.getByRole("button", { name: "Reservar hora" }));

  expect(alerta).toHaveBeenCalledWith("La fecha no puede ser anterior a hoy");

  alerta.mockRestore();

});

test("no deja reservar un domingo", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<FormularioReserva servicio="Consulta general" />);

  // El 6 de enero de 2030 es domingo
  llenarFormulario("2030-01-06", "10:00");

  fireEvent.click(screen.getByRole("button", { name: "Reservar hora" }));

  expect(alerta).toHaveBeenCalledWith("Los domingos no atendemos");

  alerta.mockRestore();

});

test("no deja reservar un sábado fuera del horario", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<FormularioReserva servicio="Consulta general" />);

  // El 5 de enero de 2030 es sábado
  llenarFormulario("2030-01-05", "16:00");

  fireEvent.click(screen.getByRole("button", { name: "Reservar hora" }));

  expect(alerta).toHaveBeenCalledWith("Los sábados atendemos de 10:00 a 14:00");

  alerta.mockRestore();

});

test("reserva la hora cuando todos los datos son correctos", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<FormularioReserva servicio="Consulta general" />);

  // El 7 de enero de 2030 es lunes
  llenarFormulario("2030-01-07", "10:00");

  fireEvent.click(screen.getByRole("button", { name: "Reservar hora" }));

  expect(alerta).toHaveBeenCalledWith("Hora reservada con éxito para Firulais: Consulta general el 2030-01-07 a las 10:00");

  alerta.mockRestore();

});
