-- Adminer 4.8.1 PostgreSQL 14.13 (Debian 14.13-1.pgdg120+1) dump

DROP TABLE IF EXISTS "categoria";
DROP SEQUENCE IF EXISTS categoria_id_seq;
CREATE SEQUENCE categoria_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."categoria" (
    "id" integer DEFAULT nextval('categoria_id_seq') NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) NOT NULL,
    "nombre" character varying(100) NOT NULL,
    "registerActive" boolean DEFAULT true NOT NULL,
    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "categoria" ("id", "createdAt", "updatedAt", "nombre", "registerActive") VALUES
(3,	'2025-03-24 02:44:41.184',	'2025-03-24 02:44:41.184',	'Memorias RAM',	't'),
(5,	'2025-03-26 04:32:08.691',	'2025-03-26 04:32:08.691',	'DISCOS DUROS',	't'),
(4,	'2025-03-24 03:20:00.615',	'2025-03-26 04:32:15.561',	'MEMORIAS RAM',	't'),
(2,	'2025-03-24 02:44:22.936',	'2025-03-26 04:35:57.965',	'TELEVISORESS',	'f');

DROP TABLE IF EXISTS "compra";
DROP SEQUENCE IF EXISTS compra_id_seq;
CREATE SEQUENCE compra_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."compra" (
    "id" integer DEFAULT nextval('compra_id_seq') NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) NOT NULL,
    "proveedorId" integer NOT NULL,
    "total" double precision NOT NULL,
    "presupuestoId" integer NOT NULL,
    "registerActive" boolean DEFAULT true NOT NULL,
    CONSTRAINT "compra_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "compra" ("id", "createdAt", "updatedAt", "proveedorId", "total", "presupuestoId", "registerActive") VALUES
(1,	'2025-03-24 06:35:19.442',	'2025-03-24 06:42:35.489',	1,	50,	1,	't'),
(2,	'2025-03-26 09:16:38.459',	'2025-03-26 09:16:38.459',	1,	3900,	3,	't');

DROP TABLE IF EXISTS "compra_detalle";
DROP SEQUENCE IF EXISTS compra_detalle_id_seq;
CREATE SEQUENCE compra_detalle_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."compra_detalle" (
    "id" integer DEFAULT nextval('compra_detalle_id_seq') NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) NOT NULL,
    "precio" double precision NOT NULL,
    "cantidad" integer NOT NULL,
    "productoId" integer NOT NULL,
    "compraId" integer NOT NULL,
    "registerActive" boolean DEFAULT true NOT NULL,
    CONSTRAINT "compra_detalle_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "compra_detalle" ("id", "createdAt", "updatedAt", "precio", "cantidad", "productoId", "compraId", "registerActive") VALUES
(1,	'2025-03-24 06:35:19.444',	'2025-03-24 06:42:35.49',	50,	1,	1,	1,	't'),
(2,	'2025-03-24 06:42:08.354',	'2025-03-24 06:42:35.49',	50,	1,	3,	1,	'f'),
(3,	'2025-03-26 09:16:38.464',	'2025-03-26 09:16:38.464',	30,	30,	1,	2,	't'),
(4,	'2025-03-26 09:16:38.464',	'2025-03-26 09:16:38.464',	60,	50,	3,	2,	't');

DROP TABLE IF EXISTS "cotizacion";
DROP SEQUENCE IF EXISTS cotizacion_id_seq;
CREATE SEQUENCE cotizacion_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."cotizacion" (
    "id" integer DEFAULT nextval('cotizacion_id_seq') NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) NOT NULL,
    "proveedorId" integer NOT NULL,
    "total" double precision NOT NULL,
    "registerActive" boolean DEFAULT true NOT NULL,
    CONSTRAINT "cotizacion_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "cotizacion" ("id", "createdAt", "updatedAt", "proveedorId", "total", "registerActive") VALUES
(1,	'2025-03-24 05:04:10.908',	'2025-03-26 07:09:33.431',	1,	0,	'f'),
(2,	'2025-03-24 05:25:55.802',	'2025-03-26 08:37:36.656',	2,	500,	't'),
(3,	'2025-03-26 08:54:45.19',	'2025-03-26 09:29:08.001',	2,	120,	't');

DROP TABLE IF EXISTS "cotizacion_detalle";
DROP SEQUENCE IF EXISTS cotizacion_detalle_id_seq;
CREATE SEQUENCE cotizacion_detalle_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."cotizacion_detalle" (
    "id" integer DEFAULT nextval('cotizacion_detalle_id_seq') NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) NOT NULL,
    "precio" double precision NOT NULL,
    "cantidad" integer NOT NULL,
    "productoId" integer NOT NULL,
    "cotizacionId" integer NOT NULL,
    "registerActive" boolean DEFAULT true NOT NULL,
    CONSTRAINT "cotizacion_detalle_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "cotizacion_detalle" ("id", "createdAt", "updatedAt", "precio", "cantidad", "productoId", "cotizacionId", "registerActive") VALUES
(2,	'2025-03-24 05:25:55.804',	'2025-03-26 08:37:36.66',	50,	5,	3,	2,	't'),
(1,	'2025-03-24 05:25:55.804',	'2025-03-26 08:37:36.66',	50,	5,	1,	2,	't'),
(3,	'2025-03-26 08:54:45.194',	'2025-03-26 09:29:08.005',	30,	4,	1,	3,	't');

DROP TABLE IF EXISTS "marca";
DROP SEQUENCE IF EXISTS marca_id_seq;
CREATE SEQUENCE marca_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."marca" (
    "id" integer DEFAULT nextval('marca_id_seq') NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) NOT NULL,
    "nombre" character varying(100) NOT NULL,
    "registerActive" boolean DEFAULT true NOT NULL,
    CONSTRAINT "marca_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "marca" ("id", "createdAt", "updatedAt", "nombre", "registerActive") VALUES
(2,	'2025-03-24 02:52:53.725',	'2025-03-24 02:52:53.725',	'Dell',	't'),
(1,	'2025-03-24 02:52:39.335',	'2025-03-26 04:41:07.881',	'SAMSUNG',	't'),
(3,	'2025-03-26 04:41:22.388',	'2025-03-26 04:41:22.388',	'HP..',	't'),
(4,	'2025-03-26 04:41:45.478',	'2025-03-26 04:41:45.478',	'IBM',	't');

DROP TABLE IF EXISTS "presupuesto";
DROP SEQUENCE IF EXISTS presupuesto_id_seq;
CREATE SEQUENCE presupuesto_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."presupuesto" (
    "id" integer DEFAULT nextval('presupuesto_id_seq') NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) NOT NULL,
    "nombre" character varying(100) NOT NULL,
    "descripcion" character varying(500) NOT NULL,
    "vencimiento" timestamp(3) NOT NULL,
    "monto" double precision NOT NULL,
    "sobrante" double precision,
    "registerActive" boolean DEFAULT true NOT NULL,
    CONSTRAINT "presupuesto_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "presupuesto" ("id", "createdAt", "updatedAt", "nombre", "descripcion", "vencimiento", "monto", "sobrante", "registerActive") VALUES
(2,	'2025-03-24 04:49:23.366',	'2025-03-26 06:59:47.791',	'para compras del memorias ram del servidor',	'PRUEBA',	'2025-12-25 04:00:00',	100,	100,	't'),
(1,	'2025-03-24 04:49:21.847',	'2025-03-26 07:00:26.943',	'centro de datos',	'PRUEBA',	'2025-03-25 04:00:00',	100,	50,	't'),
(3,	'2025-03-26 06:59:04.331',	'2025-03-26 09:16:38.467',	'Centro de datos',	'la finalidad de este proyecto es para ejecutar los presupuestos destinados para el cento de datos',	'2025-06-26 04:00:00',	1254653210,	1254649310,	't');

DROP TABLE IF EXISTS "producto";
DROP SEQUENCE IF EXISTS producto_id_seq;
CREATE SEQUENCE producto_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."producto" (
    "id" integer DEFAULT nextval('producto_id_seq') NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) NOT NULL,
    "nombre" character varying(100) NOT NULL,
    "marcaId" integer NOT NULL,
    "categoriaId" integer NOT NULL,
    "registerActive" boolean DEFAULT true NOT NULL,
    "numberPart" character varying(500),
    "numberSerial" character varying(500),
    "descripcion" text,
    CONSTRAINT "producto_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "producto" ("id", "createdAt", "updatedAt", "nombre", "marcaId", "categoriaId", "registerActive", "numberPart", "numberSerial", "descripcion") VALUES
(3,	'2025-03-24 05:24:58.852',	'2025-03-24 05:24:58.852',	'monitores',	2,	2,	't',	'Televisores',	'Televisores',	'PRUEBA'),
(1,	'2025-03-24 03:20:46.226',	'2025-03-26 05:25:47.189',	'memorias ram dell ',	2,	3,	't',	'asdfasdTelevisores',	'234sdfTelevisores',	'para descripcion de prueba');

DROP TABLE IF EXISTS "proveedor";
DROP SEQUENCE IF EXISTS proveedor_id_seq;
CREATE SEQUENCE proveedor_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."proveedor" (
    "id" integer DEFAULT nextval('proveedor_id_seq') NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) NOT NULL,
    "representanteLegal" character varying(500) NOT NULL,
    "razonSocial" character varying(250) NOT NULL,
    "nit" character varying(100) NOT NULL,
    "celular" character varying(50),
    "telefono" character varying(50),
    "email" character varying(500),
    "municipio" character varying(250),
    "registerActive" boolean DEFAULT true NOT NULL,
    "direccion" character varying(500),
    "departamentoId" integer,
    CONSTRAINT "proveedor_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "proveedor" ("id", "createdAt", "updatedAt", "representanteLegal", "razonSocial", "nit", "celular", "telefono", "email", "municipio", "registerActive", "direccion", "departamentoId") VALUES
(2,	'2025-03-26 05:51:22.24',	'2025-03-26 05:52:08.153',	'JUAN JOSE',	'TIGO',	'1232',	'123123',	'1231',	'jesus.tn79@gmail.com',	'OROPEZA',	't',	'AVENIDA LAS AMERICAS',	2),
(1,	'2025-03-24 03:46:12.341',	'2025-03-26 05:54:12.559',	'Pepito Perez',	'Entel',	'123456789',	'123456789',	'123456789',	'pepito@gmail.com',	'Sucre',	'f',	'Calle Angeles',	1);

DROP TABLE IF EXISTS "usuarios";
DROP SEQUENCE IF EXISTS usuarios_id_seq;
CREATE SEQUENCE usuarios_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."usuarios" (
    "id" integer DEFAULT nextval('usuarios_id_seq') NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) NOT NULL,
    "nombreCompleto" character varying(500) NOT NULL,
    "usuario" character varying(50) NOT NULL,
    "password" character varying(200) NOT NULL,
    "registerActive" boolean DEFAULT true NOT NULL,
    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "usuarios_usuario_key" UNIQUE ("usuario")
) WITH (oids = false);

INSERT INTO "usuarios" ("id", "createdAt", "updatedAt", "nombreCompleto", "usuario", "password", "registerActive") VALUES
(5,	'2025-03-26 06:05:50.586',	'2025-03-26 06:05:57.022',	'Jesus Tomas',	'jesus.tomas',	'$2b$10$sWfeONKOJhsGcG2.jTty6OBOy.SvRrT.XBPYntUv2879ndUM3gDUW',	't'),
(3,	'2025-03-24 04:08:49.733',	'2025-03-26 09:56:33.603',	'PRUEBA',	'admin',	'$2b$10$UDHfqXztLUtVPt2wiBvy/unbfU0cktb7fk3ANJ0uTUOcwCWHy73IK',	't');

ALTER TABLE ONLY "public"."compra" ADD CONSTRAINT "compra_presupuestoId_fkey" FOREIGN KEY ("presupuestoId") REFERENCES presupuesto(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;
ALTER TABLE ONLY "public"."compra" ADD CONSTRAINT "compra_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES proveedor(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."compra_detalle" ADD CONSTRAINT "compra_detalle_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES compra(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;
ALTER TABLE ONLY "public"."compra_detalle" ADD CONSTRAINT "compra_detalle_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES producto(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."cotizacion" ADD CONSTRAINT "cotizacion_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES proveedor(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."cotizacion_detalle" ADD CONSTRAINT "cotizacion_detalle_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES cotizacion(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;
ALTER TABLE ONLY "public"."cotizacion_detalle" ADD CONSTRAINT "cotizacion_detalle_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES producto(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."producto" ADD CONSTRAINT "producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES categoria(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;
ALTER TABLE ONLY "public"."producto" ADD CONSTRAINT "producto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES marca(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;

-- 2025-03-26 12:01:48.839648+00

SELECT setval(pg_get_serial_sequence('categoria', 'id'), (SELECT max(id) FROM categoria), false);
SELECT setval(pg_get_serial_sequence('compra', 'id'), (SELECT max(id) FROM compra), false);
SELECT setval(pg_get_serial_sequence('compra_detalle', 'id'), (SELECT max(id) FROM compra_detalle), false);
SELECT setval(pg_get_serial_sequence('cotizacion', 'id'), (SELECT max(id) FROM cotizacion), false);
SELECT setval(pg_get_serial_sequence('cotizacion_detalle', 'id'), (SELECT max(id) FROM cotizacion_detalle), false);
SELECT setval(pg_get_serial_sequence('marca', 'id'), (SELECT max(id) FROM marca), false);
SELECT setval(pg_get_serial_sequence('presupuesto', 'id'), (SELECT max(id) FROM presupuesto), false);
SELECT setval(pg_get_serial_sequence('producto', 'id'), (SELECT max(id) FROM producto), false);
SELECT setval(pg_get_serial_sequence('proveedor', 'id'), (SELECT max(id) FROM proveedor), false);
SELECT setval(pg_get_serial_sequence('usuarios', 'id'), (SELECT max(id) FROM usuarios), false);