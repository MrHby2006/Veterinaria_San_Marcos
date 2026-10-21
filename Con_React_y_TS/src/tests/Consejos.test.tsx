// @vitest-environment jsdom

import { test, expect } from "vitest";

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Consejos from "../components/pages/Consejos";

// Desafío de la PPT: comprobar que Consejos tiene las clases responsivas de Bootstrap
test("Contacto tiene las clases responsivas col-12, col-md-8 y col-lg-6", () => {

  render(
    <MemoryRouter>
      <Consejos />
    </MemoryRouter>
  );

  // Buscamos el elemento usando las clases reales que pusiste en Consejos.tsx
  const columna = document.querySelector(".col-12.col-md-6.col-lg-4");

  // Si no lo encuentra, querySelector devuelve null y la prueba falla
  expect(columna).not.toBe(null);
});