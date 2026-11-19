-- Los 3 consejos que estaban fijos en el front (Consejos.tsx y DetalleConsejo.tsx)
INSERT INTO consejo (titulo, categoria, descripcion, alerta, imagen) VALUES
('Alimentación equilibrada y agua fresca', 'Alimentación',
 'Proporciona un alimento adecuado para su edad, tamaño y nivel de actividad. Evita darle comida casera o sobras (especialmente huesos, chocolate, cebolla o ajo), ya que pueden ser tóxicas para ellos. Asegúrate de que siempre tengan acceso a un plato de agua limpia y fresca.',
 'Si deja de comer por más de un día, vomita seguido o comió algo tóxico como chocolate, uvas o cebolla, llévalo al veterinario de inmediato.',
 '/img/Consejos/comida.jpg'),
('Visitas regulares al veterinario', 'Salud preventiva',
 'Lleva a tu mascota al menos una vez al año para una revisión general. Mantén al día su calendario de vacunación y desparasitación (tanto interna como externa) para prevenir enfermedades graves.',
 'No esperes al control si notas decaimiento, fiebre, diarrea por más de un día, tos o cambios bruscos de peso.',
 '/img/Consejos/chequeo.jpg'),
('Actividad física y estimulación mental', 'Bienestar',
 'Dedica tiempo diario a jugar y pasear con tu mascota para quemar energía y mantener un peso saludable. Estimula su mente con juguetes interactivos o entrenamientos cortos para evitar el aburrimiento, la ansiedad y conductas destructivas.',
 'Si se cansa muy rápido, cojea, le cuesta respirar al hacer ejercicio o de repente empieza a romper cosas, consulta al veterinario.',
 '/img/Consejos/juego.jpg');

INSERT INTO recomendacion (texto, orden, id_consejo) VALUES
('Elige un alimento según su etapa de vida: cachorro, adulto o senior.', 1, 1),
('Divide la comida del día en 2 o 3 porciones, siempre a la misma hora.', 2, 1),
('Cambia el agua todos los días y lava su plato con frecuencia.', 3, 1),
('Si cambias de alimento, hazlo de a poco durante una semana, mezclando el nuevo con el anterior.', 4, 1),
('Cachorros y gatitos: controles cada 3 a 4 semanas mientras reciben sus primeras vacunas.', 1, 2),
('Mascotas adultas: un control general una vez al año.', 2, 2),
('Mascotas mayores de 7 años: un control cada 6 meses.', 3, 2),
('Guarda su carnet de vacunas al día y desparasítalo cuando lo indique el veterinario.', 4, 2),
('Perros: al menos un paseo al día, ajustando el tiempo a su raza y edad.', 1, 3),
('Gatos: sesiones cortas de juego con cañas o pelotas varias veces al día.', 2, 3),
('Usa juguetes interactivos o comederos tipo puzzle para estimular su mente.', 3, 3),
('Evita pasear en las horas de más calor y lleva agua en los paseos largos.', 4, 3);

-- Los 3 son "Perro / Gato" (1 = Perro, 2 = Gato en catalogo)
INSERT INTO consejo_especie (id_consejo, id_especie) VALUES
(1, 1), (1, 2),
(2, 1), (2, 2),
(3, 1), (3, 2);
