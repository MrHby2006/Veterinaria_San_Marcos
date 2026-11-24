// @vitest-environment jsdom

import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Medicamentos from "../components/pages/Medicamentos";
import Servicios from "../components/pages/Servicios";

// Cada card está dentro de una columna responsiva col-12 col-md-6 col-lg-4,
// así que contando columnas sabemos cuántas cards se están mostrando

// fetch se simula con vi.spyOn, así la prueba no necesita el backend encendido
const respuestaFalsa = (datos: unknown) => new Response(JSON.stringify(datos), { status: 200 });

const perro = { id: 1, nombre: "Perro" };
const gato = { id: 2, nombre: "Gato" };

// Medicamentos de prueba: 1 solo para perro, 1 solo para gato y 1 para los dos
const medicamentos = [
  { id: 1, categoria: "Antiparasitario", nombreComercial: "NexGard", principioActivo: "Afoxolaner", presentacion: "Comprimido", especies: [perro], stockActual: 10, precioUnitario: 15000, imagen: "/img/nexgard.jpg" },
  { id: 2, categoria: "Vacuna", nombreComercial: "Purevax", principioActivo: "Vacuna felina", presentacion: "Inyectable", especies: [gato], stockActual: 5, precioUnitario: 12000, imagen: "/img/purevax.jpg" },
  { id: 3, categoria: "Antiparasitario", nombreComercial: "Drontal", principioActivo: "Praziquantel", presentacion: "Comprimido", especies: [perro, gato], stockActual: 8, precioUnitario: 6000, imagen: "/img/drontal.jpg" },
];

// Servicios de prueba: 1 consulta y 2 cirugías
const servicios = [
  { id: 1, nombre: "Consulta general", categoria: "Consultas", descripcion: "Revisión médica", precio: 15000, imagen: "/img/consulta.jpg" },
  { id: 2, nombre: "Esterilización", categoria: "Cirugía", descripcion: "Operación", precio: 60000, imagen: "/img/esterilizacion.jpg" },
  { id: 3, nombre: "Castración", categoria: "Cirugía", descripcion: "Operación", precio: 50000, imagen: "/img/castracion.jpg" },
];

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test("el filtro de especie muestra solo los medicamentos para gato", async () => {

  vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(respuestaFalsa(medicamentos));

  const { container } = render(
    <MemoryRouter>
      <Medicamentos />
    </MemoryRouter>
  );

  // Esperamos a que lleguen los datos: al principio se ven los 3 medicamentos
  await screen.findByText(/NexGard/);
  expect(container.querySelectorAll(".col-12.col-md-6.col-lg-4").length).toBe(3);

  fireEvent.change(screen.getByLabelText("Filtrar por especie"), { target: { value: "Gato" } });

  // 1 es solo para gato y 1 es para "Perro / Gato"
  expect(container.querySelectorAll(".col-12.col-md-6.col-lg-4").length).toBe(2);
  expect(screen.queryByText(/NexGard/)).toBe(null);

});

test("el buscador encuentra un medicamento sin importar las mayúsculas", async () => {

  vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(respuestaFalsa(medicamentos));

  const { container } = render(
    <MemoryRouter>
      <Medicamentos />
    </MemoryRouter>
  );

  // Esperamos a que lleguen los datos del backend simulado
  await screen.findByText(/NexGard/);

  fireEvent.change(screen.getByLabelText("Buscar por nombre"), { target: { value: "NEXGARD" } });

  expect(container.querySelectorAll(".col-12.col-md-6.col-lg-4").length).toBe(1);
  expect(screen.getByText(/NexGard/)).not.toBe(null);

});

test("el filtro de categoría muestra solo los servicios de cirugía", async () => {

  vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(respuestaFalsa(servicios));

  const { container } = render(
    <MemoryRouter>
      <Servicios />
    </MemoryRouter>
  );

  // Esperamos a que lleguen los datos del backend simulado
  await screen.findByText("Consulta general");

  fireEvent.change(screen.getByLabelText("Filtrar por categoría"), { target: { value: "Cirugía" } });

  // Hay 2 servicios de cirugía
  expect(container.querySelectorAll(".col-12.col-md-6.col-lg-4").length).toBe(2);
  expect(screen.queryByText("Consulta general")).toBe(null);

});
