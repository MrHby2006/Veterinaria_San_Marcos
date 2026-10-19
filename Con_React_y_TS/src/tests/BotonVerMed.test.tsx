// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import BotonVerMed from "../components/atoms/BotonVerMed";

test("el botón muestra el texto Ver Medicamento", () => {

  render(
    <MemoryRouter>
      <BotonVerMed id={3} />
    </MemoryRouter>
  );

  const boton = screen.getByText("Ver Medicamento");

  expect(boton.textContent).toBe("Ver Medicamento");

});
