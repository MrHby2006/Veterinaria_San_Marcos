// @vitest-environment jsdom

import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";

import Recepcionista from "../components/pages/Recepcionista";

// fetch se simula con vi.spyOn, así la prueba no necesita el backend encendido
const respuestaFalsa = (datos: unknown) => new Response(JSON.stringify(datos), { status: 200 });

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

test("sin iniciar sesión como recepcionista no se ven las citas", () => {

  const llamadas = vi.spyOn(globalThis, "fetch");

  render(<Recepcionista />);

  // Aparece el aviso y no se le pide nada al backend
  expect(screen.getByText(/Solo las recepcionistas pueden ver esta página/)).not.toBe(null);
  expect(llamadas).not.toHaveBeenCalled();

});

test("solo se puede confirmar una cita después de asignarle un médico", async () => {

  localStorage.setItem("usuario", JSON.stringify({ id: 2, nombre: "Recepción", correo: "recepcion1@sanmarcos.cl", rol: "Recepcionista" }));

  const cita = { id: 1, correoCliente: "cliente@sanmarcos.cl", nombreMascota: "Firulais", nombreServicio: "Consulta general", fecha: "2030-01-07", hora: "10:00", precio: 15000, estado: "Pendiente", idMedico: null, nombreMedico: "Por asignar" };

  // Al abrir la página se piden: citas, médicos y medicamentos (en ese orden).
  // Después: PUT para asignar el médico y PUT para confirmar
  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce(respuestaFalsa([cita]))
    .mockResolvedValueOnce(respuestaFalsa([{ id: 1, nombre: "Camila", apellido: "Rojas" }]))
    .mockResolvedValueOnce(respuestaFalsa([]))
    .mockResolvedValueOnce(respuestaFalsa({ id: 1, correoCliente: "cliente@sanmarcos.cl", nombreMascota: "Firulais", nombreServicio: "Consulta general", fecha: "2030-01-07", hora: "10:00", precio: 15000, estado: "Pendiente", idMedico: 1, nombreMedico: "Camila Rojas" }))
    .mockResolvedValueOnce(respuestaFalsa({ id: 1, correoCliente: "cliente@sanmarcos.cl", nombreMascota: "Firulais", nombreServicio: "Consulta general", fecha: "2030-01-07", hora: "10:00", precio: 15000, estado: "Confirmada", idMedico: 1, nombreMedico: "Camila Rojas" }));

  render(<Recepcionista />);

  // Sin médico el botón Confirmar está desactivado
  const botonConfirmar = await screen.findByRole("button", { name: "Confirmar" }) as HTMLButtonElement;
  expect(botonConfirmar.disabled).toBe(true);

  // Esperamos a que lleguen los médicos y elegimos uno en el selector
  await screen.findByRole("option", { name: "Camila Rojas" });
  fireEvent.change(screen.getByLabelText("Médico veterinario"), { target: { value: "1" } });

  // Cuando el backend responde, el botón se activa
  await waitFor(() => expect((screen.getByRole("button", { name: "Confirmar" }) as HTMLButtonElement).disabled).toBe(false));

  fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));

  // La cita queda Confirmada y ya no hay botón Confirmar
  expect(await screen.findByText("Confirmada")).not.toBe(null);
  expect(screen.queryByRole("button", { name: "Confirmar" })).toBe(null);

});
