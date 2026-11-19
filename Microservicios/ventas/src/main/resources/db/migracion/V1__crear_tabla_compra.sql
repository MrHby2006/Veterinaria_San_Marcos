CREATE TABLE compra(

    id_compra BIGINT NOT NULL AUTO_INCREMENT,
    cantidad INT NOT NULL,
    precio INT NOT NULL,
    pagado BOOLEAN NOT NULL DEFAULT FALSE,
    entregado BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_agregado DATETIME(6) NOT NULL,
    fecha_pago DATETIME(6),
    id_usuario BIGINT NOT NULL,
    id_medicamento BIGINT NOT NULL,
    PRIMARY KEY (id_compra)
);
