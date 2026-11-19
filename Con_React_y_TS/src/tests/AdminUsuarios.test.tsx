// @vitest-environment jsdom

import { test, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Admin_usuarios from "../components/pages/Admin_usuarios";

// Pruebas del CRUD de usuarios (Crear, Leer, Actualizar y Eliminar).
// fetch se simula con vi.spyOn (igual que alert), así la prueba no necesita el backend encendido.

// Arma una respuesta falsa del backend con los datos que le pasemos
const respuestaFalsa = (datos: unknown) => new Response(JSON.stringify(datos), { status: 200 });

// Los 3 usuarios que "devuelve" el backend al abrir la página
const usuariosIniciales = [
  { id: 1, nombre: "Cliente de prueba", correo: "cliente@sanmarcos.cl", rol: "Cliente" },
  { id: 2, nombre: "Recepcionista de prueba", correo: "recepcion@sanmarcos.cl", rol: "Recepcionista" },
  { id: 3, nombre: "Administrador de prueba", correo: "admin@sanmarcos.cl", rol: "Administrador" },
];

// La página solo se muestra si inició sesión un administrador
beforeEach(() => {
  localStorage.setItem("usuario", JSON.stringify({ id: 3, nombre: "Administrador de prueba", correo: "admin@sanmarcos.cl", rol: "Administrador" }));
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

// Admin_usuarios tiene un Link, por eso va dentro de MemoryRouter
const mostrarPagina = () => {
  render(
    <MemoryRouter>
      <Admin_usuarios />
    </MemoryRouter>
  );
};

test("agrega un usuario nuevo a la tabla", async () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  // 1ª llamada: GET de la lista. 2ª llamada: POST que devuelve el usuario creado
  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce(respuestaFalsa(usuariosIniciales))
    .mockResolvedValueOnce(respuestaFalsa({ id: 4, nombre: "Usuario nuevo", correo: "nuevo@correo.cl", rol: "Cliente" }));

  mostrarPagina();

  // findByText espera a que llegue la respuesta del backend
  await screen.findByText("cliente@sanmarcos.cl");

  // Llenamos el formulario y presionamos Agregar
  fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Usuario nuevo" } });
  fireEvent.change(screen.getByLabelText("Correo"), { target: { value: "nuevo@correo.cl" } });
  fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "clave1234" } });
  fireEvent.click(screen.getByRole("button", { name: "Agregar usuario" }));

  // El usuario aparece en la tabla
  expect(await screen.findByText("nuevo@correo.cl")).not.toBe(null);
  expect(alerta).toHaveBeenCalledWith("Usuario agregado");

});

test("edita un usuario que ya existe", async () => {

  const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

  // 1ª llamada: GET de la lista. 2ª llamada: PUT que devuelve el usuario editado
  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce(respuestaFalsa(usuariosIniciales))
    .mockResolvedValueOnce(respuestaFalsa({ id: 1, nombre: "Cliente editado", correo: "cliente@sanmarcos.cl", rol: "Cliente" }));

  mostrarPagina();

  // Editar pasa los datos del primer usuario al formulario
  fireEvent.click((await screen.findAllByRole("button", { name: "Editar" }))[0]);

  // Cambiamos el nombre y guardamos
  fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Cliente editado" } });
  fireEvent.click(screen.getByRole("button", { name: "Guardar cambios" }));

  // El nombre antiguo ya no está y aparece el nuevo
  expect(await screen.findByText("Cliente editado")).not.toBe(null);
  expect(screen.queryByText("Cliente de prueba")).toBe(null);
  expect(alerta).toHaveBeenCalledWith("Usuario actualizado");

});

test("elimina un usuario de la tabla", async () => {

  // Simulamos que el administrador acepta el mensaje de confirmación
  vi.spyOn(window, "confirm").mockImplementation(() => true);

  // 1ª llamada: GET de la lista. 2ª llamada: DELETE (responde 204, sin contenido)
  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce(respuestaFalsa(usuariosIniciales))
    .mockResolvedValueOnce(new Response(null, { status: 204 }));

  mostrarPagina();

  // Al principio hay 3 usuarios, así que hay 3 botones Eliminar
  expect((await screen.findAllByRole("button", { name: "Eliminar" })).length).toBe(3);

  fireEvent.click(screen.getAllByRole("button", { name: "Eliminar" })[0]);

  // waitFor repite la revisión hasta que se cumpla (o se acabe el tiempo)
  await waitFor(() => expect(screen.queryByText("Cliente de prueba")).toBe(null));
  expect(screen.getAllByRole("button", { name: "Eliminar" }).length).toBe(2);

});
