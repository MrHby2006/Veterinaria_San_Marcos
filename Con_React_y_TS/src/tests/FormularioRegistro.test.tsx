// @vitest-environment jsdom

import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import FormularioRegistro from "../components/organism/FormularioRegistro";

test("muestra una alerta cuando el nombre está vacío", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<FormularioRegistro />);

  fireEvent.click(screen.getByRole("button", { name: "Crear Cuenta" }));

  expect(alerta).toHaveBeenCalledWith("Debe ingresar un nombre");

  alerta.mockRestore();

});
