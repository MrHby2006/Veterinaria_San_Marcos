CREATE TABLE medico(

    id_medico BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL,
    apellido VARCHAR (50) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id_medico)
);

CREATE TABLE mascota(

    id_mascota BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL,
    id_usuario BIGINT NOT NULL,
    id_especie BIGINT NOT NULL,
    PRIMARY KEY (id_mascota)
);

CREATE TABLE cita(

    id_cita BIGINT NOT NULL AUTO_INCREMENT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    precio INT NOT NULL,
    estado VARCHAR (20) NOT NULL DEFAULT 'Pendiente',
    pagado BOOLEAN NOT NULL DEFAULT FALSE,
    id_mascota BIGINT NOT NULL,
    id_servicio BIGINT NOT NULL,
    id_medico BIGINT,
    PRIMARY KEY (id_cita),
    CONSTRAINT cita_mascota_fk FOREIGN KEY (id_mascota) REFERENCES mascota (id_mascota),
    CONSTRAINT cita_medico_fk FOREIGN KEY (id_medico) REFERENCES medico (id_medico)
);
