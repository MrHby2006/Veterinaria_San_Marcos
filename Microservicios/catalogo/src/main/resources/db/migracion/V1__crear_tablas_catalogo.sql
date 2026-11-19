CREATE TABLE especie(

    id_especie BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (30) NOT NULL,
    PRIMARY KEY (id_especie),
    CONSTRAINT especie_nombre_uk UNIQUE (nombre)
);

CREATE TABLE servicio(

    id_servicio BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (100) NOT NULL,
    descripcion VARCHAR (255) NOT NULL,
    categoria VARCHAR (30) NOT NULL,
    precio INT NOT NULL,
    imagen VARCHAR (150) NOT NULL,
    PRIMARY KEY (id_servicio),
    CONSTRAINT servicio_nombre_uk UNIQUE (nombre)
);

CREATE TABLE medicamento(

    id_medicamento BIGINT NOT NULL AUTO_INCREMENT,
    nombre_comercial VARCHAR (100) NOT NULL,
    principio_activo VARCHAR (100) NOT NULL,
    presentacion VARCHAR (50) NOT NULL,
    categoria VARCHAR (30) NOT NULL,
    precio_unitario INT NOT NULL,
    stock_actual INT NOT NULL,
    imagen VARCHAR (150) NOT NULL,
    PRIMARY KEY (id_medicamento),
    CONSTRAINT medicamento_nombre_uk UNIQUE (nombre_comercial)
);

-- Que especies puede usar cada medicamento (antes era el texto "Perro / Gato")
CREATE TABLE medicamento_especie(

    id_medicamento BIGINT NOT NULL,
    id_especie BIGINT NOT NULL,
    PRIMARY KEY (id_medicamento, id_especie),
    CONSTRAINT med_esp_medicamento_fk FOREIGN KEY (id_medicamento) REFERENCES medicamento (id_medicamento),
    CONSTRAINT med_esp_especie_fk FOREIGN KEY (id_especie) REFERENCES especie (id_especie)
);
