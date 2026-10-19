// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import BotonReservarHora from "../components/atoms/BotonReservarHora";

test("el botón lleva al formulario de reserva con el servicio en la URL", () => {

  render(
    <MemoryRouter>
      <BotonReservarHora servicio="Vacunación" />
    </MemoryRouter>
  );

  const boton = screen.getByText("Reservar hora");

  // getAttribute("href") devuelve la dirección a la que lleva el Link
  expect(boton.getAttribute("href")).toBe("/reservar/Vacunación");

});
