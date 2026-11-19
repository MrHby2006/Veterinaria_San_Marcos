CREATE TABLE consejo(

    id_consejo BIGINT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR (100) NOT NULL,
    categoria VARCHAR (50) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    alerta VARCHAR (500) NOT NULL,
    imagen VARCHAR (150) NOT NULL,
    PRIMARY KEY (id_consejo),
    CONSTRAINT consejo_titulo_uk UNIQUE (titulo)
);

-- Antes eran 4 columnas (recomendacion_1 a recomendacion_4); ahora una fila por recomendacion
CREATE TABLE recomendacion(

    id_recomendacion BIGINT NOT NULL AUTO_INCREMENT,
    texto VARCHAR (255) NOT NULL,
    orden INT NOT NULL,
    id_consejo BIGINT NOT NULL,
    PRIMARY KEY (id_recomendacion),
    CONSTRAINT recomendacion_consejo_fk FOREIGN KEY (id_consejo) REFERENCES consejo (id_consejo)
);

-- id_especie no lleva FK: la tabla ESPECIE esta en la base de catalogo
CREATE TABLE consejo_especie(

    id_consejo BIGINT NOT NULL,
    id_especie BIGINT NOT NULL,
    PRIMARY KEY (id_consejo, id_especie),
    CONSTRAINT consejo_especie_consejo_fk FOREIGN KEY (id_consejo) REFERENCES consejo (id_consejo)
);

CREATE TABLE mensaje(

    id_mensaje BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    mensaje VARCHAR (1000) NOT NULL,
    fecha DATETIME NOT NULL,
    estado VARCHAR (20) NOT NULL DEFAULT 'PENDIENTE',
    PRIMARY KEY (id_mensaje)
);
