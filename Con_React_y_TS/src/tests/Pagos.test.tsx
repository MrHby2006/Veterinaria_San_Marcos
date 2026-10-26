// @vitest-environment jsdom

import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import Carrito from "../components/pages/Carrito";
import Citas from "../components/pages/Citas";

afterEach(() => {
  cleanup();
});

test("el carrito suma el total y lo deja en 0 después de pagar", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<Carrito />);

  // Amoxibay (4200) + Nexgard (9500) = 13700
  expect(screen.getByText("Total por pagar: $13700")).not.toBe(null);

  fireEvent.click(screen.getByRole("button", { name: "Ir a pagar" }));

  // Después de pagar no queda nada por pagar y los 2 productos dicen Pagado
  expect(alerta).toHaveBeenCalledWith("Pago realizado con éxito");
  expect(screen.getByText("Total por pagar: $0")).not.toBe(null);
  expect(screen.getAllByText("Pagado").length).toBe(2);

  alerta.mockRestore();

});

test("una cita por pagar queda como Pagado al presionar Ir a pagar", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<Citas />);

  fireEvent.click(screen.getByRole("button", { name: "Ir a pagar" }));

  // El botón desaparece y las 2 citas quedan pagadas
  expect(alerta).toHaveBeenCalledWith("Pago realizado con éxito");
  expect(screen.queryByRole("button", { name: "Ir a pagar" })).toBe(null);
  expect(screen.getAllByText("Pagado").length).toBe(2);

  alerta.mockRestore();

});
