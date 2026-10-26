// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import Recepcionista from "../components/pages/Recepcionista";

afterEach(() => {
  cleanup();
});

test("la recepcionista solo ve las citas que ya están pagadas", () => {

  render(<Recepcionista />);

  // La cita de cliente@sanmarcos.cl está pagada, así que se muestra
  expect(screen.getByText("cliente@sanmarcos.cl")).not.toBe(null);

  // La cita de pedro@correo.cl está "Por pagar", así que no debe aparecer
  expect(screen.queryByText("pedro@correo.cl")).toBe(null);

});

test("solo se puede confirmar una cita después de asignarle un médico", () => {

  render(<Recepcionista />);

  // Hay 2 citas pendientes pagadas, cada una con su botón Confirmar
  const botonConfirmar = screen.getAllByRole("button", { name: "Confirmar" })[0] as HTMLButtonElement;

  // Sin médico el botón está desactivado
  expect(botonConfirmar.disabled).toBe(true);

  // Elegimos un médico en el selector de la primera cita
  fireEvent.change(screen.getAllByLabelText("Médico veterinario")[0], { target: { value: "Dra. Camila Rojas" } });
  expect(botonConfirmar.disabled).toBe(false);

  fireEvent.click(botonConfirmar);

  // Ahora hay 2 citas confirmadas (la que ya estaba y la nueva) y queda 1 botón Confirmar
  expect(screen.getAllByText("Confirmada").length).toBe(2);
  expect(screen.getAllByRole("button", { name: "Confirmar" }).length).toBe(1);

});
