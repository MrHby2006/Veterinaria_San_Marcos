// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import BotonAddCarro from "../components/atoms/BotonAddCarro";

test("muestra un mensaje al añadir un medicamento al carrito", () => {

  // Simulamos la función alert del navegador
  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<BotonAddCarro />);

  // Simulamos que el usuario presiona el botón
  fireEvent.click(screen.getByRole("button", { name: "Añadir al Carrito" }));

  expect(alerta).toHaveBeenCalledWith("Medicamento agregado con éxito al carrito");

  alerta.mockRestore();

});
