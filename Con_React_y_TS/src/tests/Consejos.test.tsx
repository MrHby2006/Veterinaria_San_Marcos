// @vitest-environment jsdom

import { test, expect } from "vitest";
import { render } from "@testing-library/react";

import Consejos from "../components/pages/Consejos";

// Desafío de la PPT: comprobar que Consejos tiene las clases responsivas de Bootstrap
test("Contacto tiene las clases responsivas col-12, col-md-8 y col-lg-6", () => {

  // container es el pedazo de página donde se dibujó el componente
  const { container } = render(<Consejos />);

  // Busca un elemento que tenga las tres clases a la vez
  const columna = container.querySelector(".col-12.col-md-8.col-lg-6");

  // Si no lo encuentra, querySelector devuelve null y la prueba falla
  expect(columna).not.toBe(null);

});