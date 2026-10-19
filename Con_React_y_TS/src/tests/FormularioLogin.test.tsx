// @vitest-environment jsdom

import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import FormularioLogin from "../components/organism/FormularioLogin";

// Después de cada prueba borra el formulario de la pantalla,
// así la siguiente prueba empieza con un formulario nuevo
afterEach(() => {
  cleanup();
});

test("muestra una alerta cuando el correo está vacío", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<FormularioLogin />);

  fireEvent.click(screen.getByRole("button", { name: "Iniciar Sesión" }));

  expect(alerta).toHaveBeenCalledWith("Debe ingresar un correo");

  alerta.mockRestore();

});

test("muestra una alerta cuando la contraseña tiene menos de 8 caracteres", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<FormularioLogin />);

  // Simulamos que el usuario escribe en los campos
  fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "marco@gmail.com" } });
  fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "1234567" } });

  fireEvent.click(screen.getByRole("button", { name: "Iniciar Sesión" }));

  expect(alerta).toHaveBeenCalledWith("la contraseña debe ser de mínimo 8 caracteres");

  alerta.mockRestore();

});
