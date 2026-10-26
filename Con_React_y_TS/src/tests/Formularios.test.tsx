// @vitest-environment jsdom

import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import FormularioContacto from "../components/organism/FormularioContacto";
import FormularioLogin from "../components/organism/FormularioLogin";

afterEach(() => {
  cleanup();
});

test("el formulario de contacto rechaza un correo con formato inválido", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<FormularioContacto />);

  fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Marco" } });
  fireEvent.change(screen.getByLabelText("Correo Electrónico"), { target: { value: "correo-sin-arroba" } });

  fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

  expect(alerta).toHaveBeenCalledWith("Ingrese un correo válido");

  alerta.mockRestore();

});

test("el login rechaza una contraseña de menos de 8 caracteres", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<FormularioLogin />);

  fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "cliente@sanmarcos.cl" } });
  fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "1234" } });

  fireEvent.click(screen.getByRole("button", { name: "Iniciar Sesión" }));

  expect(alerta).toHaveBeenCalledWith("la contraseña debe ser de mínimo 8 caracteres");

  alerta.mockRestore();

});
