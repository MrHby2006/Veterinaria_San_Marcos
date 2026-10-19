// @vitest-environment jsdom

import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import FormularioContacto from "../components/organism/FormularioContacto";

test("muestra una alerta cuando el nombre está vacío", () => {

  // Simulamos la función alert del navegador
  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  // Mostramos el formulario
  render(<FormularioContacto />);

  // Simulamos que el usuario presiona Enviar
  fireEvent.click(
    screen.getByRole("button", { name: "Enviar mensaje" })
  );

  // Comprobamos el mensaje de validación
  expect(alerta).toHaveBeenCalledWith("Debe ingresar su nombre");

  // Restauramos la función alert
  alerta.mockRestore();

});
