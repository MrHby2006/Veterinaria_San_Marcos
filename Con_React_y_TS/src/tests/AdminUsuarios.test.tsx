// @vitest-environment jsdom

import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Admin_usuarios from "../components/pages/Admin_usuarios";

// Pruebas del CRUD de usuarios (Crear, Leer, Actualizar y Eliminar)

afterEach(() => {
  cleanup();
});

// Admin_usuarios tiene un Link, por eso va dentro de MemoryRouter
const mostrarPagina = () => {
  render(
    <MemoryRouter>
      <Admin_usuarios />
    </MemoryRouter>
  );
};

test("agrega un usuario nuevo a la tabla", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  mostrarPagina();

  // Llenamos el formulario y presionamos Agregar
  fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Usuario nuevo" } });
  fireEvent.change(screen.getByLabelText("Correo"), { target: { value: "nuevo@correo.cl" } });
  fireEvent.click(screen.getByRole("button", { name: "Agregar usuario" }));

  // El usuario aparece en la tabla
  expect(alerta).toHaveBeenCalledWith("Usuario agregado");
  expect(screen.getByText("nuevo@correo.cl")).not.toBe(null);

  alerta.mockRestore();

});

test("edita un usuario que ya existe", () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  mostrarPagina();

  // Editar pasa los datos del primer usuario al formulario
  fireEvent.click(screen.getAllByRole("button", { name: "Editar" })[0]);

  // Cambiamos el nombre y guardamos
  fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Cliente editado" } });
  fireEvent.click(screen.getByRole("button", { name: "Guardar cambios" }));

  // El nombre antiguo ya no está y aparece el nuevo
  expect(alerta).toHaveBeenCalledWith("Usuario actualizado");
  expect(screen.queryByText("Cliente de prueba")).toBe(null);
  expect(screen.getByText("Cliente editado")).not.toBe(null);

  alerta.mockRestore();

});

test("elimina un usuario de la tabla", () => {

  mostrarPagina();

  // Al principio hay 3 usuarios, así que hay 3 botones Eliminar
  expect(screen.getAllByRole("button", { name: "Eliminar" }).length).toBe(3);

  fireEvent.click(screen.getAllByRole("button", { name: "Eliminar" })[0]);

  // queryByText devuelve null cuando no encuentra el texto
  expect(screen.queryByText("Cliente de prueba")).toBe(null);
  expect(screen.getAllByRole("button", { name: "Eliminar" }).length).toBe(2);

});
