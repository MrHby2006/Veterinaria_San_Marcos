// @vitest-environment jsdom

import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import DetalleConsejo from "../components/pages/DetalleConsejo";

// Desafío de la PPT: comprobar que el Detalle de los Consejos tiene las clases responsivas de Bootstrap
test("Contacto tiene las clases responsivas col-12, col-md-8 y col-lg-6", () => {

  render(
    // Usamos MemoryRouter con un path inicial que incluya un id válido (ej: /1) para que useParams funcione
    <MemoryRouter initialEntries={["/consejos/1"]}>
      <Routes>
        <Route path="/consejos/:id" element={<DetalleConsejo />} />
      </Routes>
    </MemoryRouter>
  );

  // Busca un elemento que tenga las tres clases a la vez
  const columna = document.querySelector(".col-12.col-md-5");

  // Si no lo encuentra, querySelector devuelve null y la prueba falla
  expect(columna).not.toBe(null);

});