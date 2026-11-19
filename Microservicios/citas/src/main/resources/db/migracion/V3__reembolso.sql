-- Reembolso al cancelar una cita pagada.
-- Las 3 columnas quedan en NULL mientras la cita no se cancele.
ALTER TABLE cita
ADD COLUMN reembolso INT,
ADD COLUMN fecha_cancelacion DATETIME(6),
ADD COLUMN cancelada_por VARCHAR(20);
