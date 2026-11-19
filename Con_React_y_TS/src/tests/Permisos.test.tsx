// @vitest-environment jsdom

import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Admin from "../components/pages/Admin";
import Admin_medicos from "../components/pages/Admin_medicos";

// Pruebas de los permisos: quién puede entrar a las páginas del admin,
// y que el front le mande al backend el id de quien inició sesión.

const respuestaFalsa = (datos: unknown) => new Response(JSON.stringify(datos), { status: 200 });

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

test("un cliente no puede ver el panel de administración", () => {

  localStorage.setItem("usuario", JSON.stringify({ id: 5, nombre: "Cliente", correo: "cliente@sanmarcos.cl", rol: "Cliente" }));

  render(
    <MemoryRouter>
      <Admin />
    </MemoryRouter>
  );

  // Se muestra el aviso y NO las tarjetas del panel
  expect(screen.getByText(/Solo el administrador puede ver esta página/)).not.toBe(null);
  expect(screen.queryByText("Ir a usuarios")).toBe(null);

});

test("al editar un médico se envía un PUT con el id del administrador", async () => {

  localStorage.setItem("usuario", JSON.stringify({ id: 1, nombre: "Admin", correo: "admin@sanmarcos.cl", rol: "Administrador" }));
  vi.spyOn(window, "alert").mockImplementation(() => {});

  // 1ª: GET de los médicos. 2ª: PUT con el médico ya corregido
  const llamadas = vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce(respuestaFalsa([{ id: 4, nombre: "Andres", apellido: "Perez" }]))
    .mockResolvedValueOnce(respuestaFalsa({ id: 4, nombre: "Andrés", apellido: "Pérez" }));

  render(
    <MemoryRouter>
      <Admin_medicos />
    </MemoryRouter>
  );

  // Al apretar Editar, los datos pasan al formulario
  fireEvent.click(await screen.findByRole("button", { name: "Editar" }));
  fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Andrés" } });
  fireEvent.change(screen.getByLabelText("Apellido"), { target: { value: "Pérez" } });
  fireEvent.click(screen.getByRole("button", { name: "Guardar cambios" }));

  // La 2ª llamada es un PUT al médico 4, con ?idUsuario=1 (el admin)
  await waitFor(() => expect(llamadas).toHaveBeenCalledTimes(2));
  const [url, opciones] = llamadas.mock.calls[1];
  expect(url).toBe("http://localhost:8080/api/medicos/4?idUsuario=1");
  expect(opciones?.method).toBe("PUT");

  // Y la tabla muestra el nombre corregido
  expect(await screen.findByText("Andrés")).not.toBe(null);

});
