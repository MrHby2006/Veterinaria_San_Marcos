CREATE TABLE usuario(

    id_usuario BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    contrasena VARCHAR (255) NOT NULL,
    direccion VARCHAR (150),
    rol VARCHAR (20) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id_usuario),
    CONSTRAINT usuario_correo_un UNIQUE (correo)
);
