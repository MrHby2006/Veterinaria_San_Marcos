// @vitest-environment jsdom
import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";

import BotonAddCarro from "../components/atoms/BotonAddCarro";

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

test("muestra un mensaje al añadir un medicamento al carrito", async () => {

  // El cliente inició sesión
  localStorage.setItem("usuario", JSON.stringify({ id: 5, nombre: "Cliente", correo: "cliente@sanmarcos.cl", rol: "Cliente" }));

  // Simulamos la función alert del navegador y la respuesta del backend
  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});
  vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(new Response(JSON.stringify({ id: 1 }), { status: 201 }));

  render(<BotonAddCarro idMedicamento={1} />);

  // Simulamos que el usuario presiona el botón
  fireEvent.click(screen.getByRole("button", { name: "Añadir al Carrito" }));

  await waitFor(() => expect(alerta).toHaveBeenCalledWith("Medicamento agregado con éxito al carrito"));

});

test("pide iniciar sesión si nadie ha entrado", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<BotonAddCarro idMedicamento={1} />);

  fireEvent.click(screen.getByRole("button", { name: "Añadir al Carrito" }));

  expect(alerta).toHaveBeenCalledWith("Debe iniciar sesión para comprar");

});
