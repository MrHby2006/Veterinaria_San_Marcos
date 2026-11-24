// @vitest-environment jsdom

import { test, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import DetalleConsejo from "../components/pages/DetalleConsejo";

// fetch se simula con vi.spyOn, así la prueba no necesita el backend encendido
const respuestaFalsa = (datos: unknown) => new Response(JSON.stringify(datos), { status: 200 });

// Consejo de prueba que "manda" el backend
const consejo = { id: 1, titulo: "Higiene dental", categoria: "Salud preventiva", descripcion: "Cuida los dientes de tu mascota", alerta: "Si le sangran las encías", imagen: "/img/consejo.jpg", recomendaciones: [{ id: 1, texto: "Cepillar los dientes", orden: 1 }], idEspecies: [1] };

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// Desafío de la PPT: comprobar que el Detalle de los Consejos tiene las clases responsivas de Bootstrap
test("DetalleConsejos tiene las clases responsivas col-12 y col-md-5", async () => {

  // La página pide primero el consejo y después las especies
  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce(respuestaFalsa(consejo))
    .mockResolvedValueOnce(respuestaFalsa([{ id: 1, nombre: "Perro" }]));

  render(
    // Usamos MemoryRouter con un path inicial que incluya un id válido (ej: /1) para que useParams funcione
    <MemoryRouter initialEntries={["/consejos/1"]}>
      <Routes>
        <Route path="/consejos/:id" element={<DetalleConsejo />} />
      </Routes>
    </MemoryRouter>
  );

  // Esperamos a que llegue el consejo (antes solo dice "Cargando...")
  await screen.findByText("Higiene dental");

  // Busca un elemento que tenga las dos clases a la vez
  const columna = document.querySelector(".col-12.col-md-5");

  // Si no lo encuentra, querySelector devuelve null y la prueba falla
  expect(columna).not.toBe(null);

});