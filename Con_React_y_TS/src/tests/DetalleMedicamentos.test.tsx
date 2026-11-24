// @vitest-environment jsdom

import { test, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import DetalleMedicamento from "../components/pages/DetalleMedicamento";

// fetch se simula con vi.spyOn, así la prueba no necesita el backend encendido
const respuestaFalsa = (datos: unknown) => new Response(JSON.stringify(datos), { status: 200 });

// Medicamento de prueba que "manda" el backend
const medicamento = { id: 1, categoria: "Antiparasitario", nombreComercial: "NexGard", principioActivo: "Afoxolaner", presentacion: "Comprimido", especies: [{ id: 1, nombre: "Perro" }], stockActual: 10, precioUnitario: 15000, imagen: "/img/nexgard.jpg" };

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// Desafío de la PPT: comprobar que el Detalle de Medicamento tiene las clases responsivas de Bootstrap
test("DetalleMedicamentos tiene las clases responsivas col-12 y col-md-5", async () => {

  vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(respuestaFalsa(medicamento));

  render(
    // Le pasamos un id válido en la URL (ej: /medicamento/1) para que encuentre el medicamento
    <MemoryRouter initialEntries={["/medicamento/1"]}>
      <Routes>
        <Route path="/medicamento/:id" element={<DetalleMedicamento />} />
      </Routes>
    </MemoryRouter>
  );

  // Esperamos a que llegue el medicamento (antes solo dice "Cargando...")
  await screen.findByText("NexGard");

  // Busca un elemento que tenga las dos clases a la vez
  const columna = document.querySelector(".col-12.col-md-5");

  // Si no lo encuentra, querySelector devuelve null y la prueba falla
  expect(columna).not.toBe(null);

});