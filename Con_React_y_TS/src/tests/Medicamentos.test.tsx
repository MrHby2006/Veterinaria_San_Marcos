// @vitest-environment jsdom

import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Medicamentos from "../components/pages/Medicamentos";

test("cada card de medicamento está en una columna responsiva", () => {

  const { container } = render(
    <MemoryRouter>
      <Medicamentos />
    </MemoryRouter>
  );

  // querySelectorAll busca TODOS los elementos que tengan esas clases
  const columnas = container.querySelectorAll(".col-12.col-md-6.col-lg-4");

  // Son 22 medicamentos, así que deben haber 22 columnas
  expect(columnas.length).toBe(22);

});
