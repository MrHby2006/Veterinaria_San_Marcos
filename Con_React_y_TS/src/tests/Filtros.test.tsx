// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Medicamentos from "../components/pages/Medicamentos";
import Servicios from "../components/pages/Servicios";

// Cada card está dentro de una columna responsiva col-12 col-md-6 col-lg-4,
// así que contando columnas sabemos cuántas cards se están mostrando

afterEach(() => {
  cleanup();
});

test("el filtro de especie muestra solo los medicamentos para gato", () => {

  const { container } = render(
    <MemoryRouter>
      <Medicamentos />
    </MemoryRouter>
  );

  // Al principio se ven los 22 medicamentos
  expect(container.querySelectorAll(".col-12.col-md-6.col-lg-4").length).toBe(22);

  fireEvent.change(screen.getByLabelText("Filtrar por especie"), { target: { value: "Gato" } });

  // 3 son solo para gato y 10 son para "Perro / Gato"
  expect(container.querySelectorAll(".col-12.col-md-6.col-lg-4").length).toBe(13);

});

test("el buscador encuentra un medicamento sin importar las mayúsculas", () => {

  const { container } = render(
    <MemoryRouter>
      <Medicamentos />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText("Buscar por nombre"), { target: { value: "NEXGARD" } });

  expect(container.querySelectorAll(".col-12.col-md-6.col-lg-4").length).toBe(1);

});

test("el filtro de categoría muestra solo los servicios de cirugía", () => {

  const { container } = render(
    <MemoryRouter>
      <Servicios />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText("Filtrar por categoría"), { target: { value: "Cirugía" } });

  // Hay 6 servicios de cirugía
  expect(container.querySelectorAll(".col-12.col-md-6.col-lg-4").length).toBe(6);

});
