-- Usuarios iniciales: sin un administrador nadie podria entrar al panel de Admin.
-- Las contraseñas van encriptadas con BCrypt (igual que las que guarda el registro).
--   admin@sanmarcos.cl        -> Admin2026
--   recepcion1..3@sanmarcos.cl -> Recepcion2026

INSERT INTO usuario (nombre, correo, contrasena, direccion, rol, activo) VALUES
('Marco Administrador', 'admin@sanmarcos.cl', '$2a$10$.zZ2SXU.mwy6ZUkTn5p/luhhn7VVH3jZpbALcY6aan82Sc17wma8O', NULL, 'Administrador', TRUE),
('Paula Gonzalez', 'recepcion1@sanmarcos.cl', '$2a$10$hua2VOCn2Ceq1mUKavEIe.REXo3btK0og.hh/n/HxvajuNPwvtCIq', NULL, 'Recepcionista', TRUE),
('Tomas Riquelme', 'recepcion2@sanmarcos.cl', '$2a$10$hua2VOCn2Ceq1mUKavEIe.REXo3btK0og.hh/n/HxvajuNPwvtCIq', NULL, 'Recepcionista', TRUE),
('Daniela Vergara', 'recepcion3@sanmarcos.cl', '$2a$10$hua2VOCn2Ceq1mUKavEIe.REXo3btK0og.hh/n/HxvajuNPwvtCIq', NULL, 'Recepcionista', TRUE);
