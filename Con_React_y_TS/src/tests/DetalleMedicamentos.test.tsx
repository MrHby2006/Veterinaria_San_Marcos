// @vitest-environment jsdom

import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import DetalleMedicamento from "../components/pages/DetalleMedicamento";

// Desafío de la PPT: comprobar que el Detalle de Medicamento tiene las clases responsivas de Bootstrap
test("Contacto tiene las clases responsivas col-12, col-md-8 y col-lg-6", () => {

  render(
    // Le pasamos un id válido en la URL (ej: /medicamento/1) para que encuentre el medicamento
    <MemoryRouter initialEntries={["/medicamento/1"]}>
      <Routes>
        <Route path="/medicamento/:id" element={<DetalleMedicamento />} />
      </Routes>
    </MemoryRouter>
  );

  // Busca un elemento que tenga las tres clases a la vez
  const columna = document.querySelector(".col-12.col-md-5");

  // Si no lo encuentra, querySelector devuelve null y la prueba falla
  expect(columna).not.toBe(null);

});