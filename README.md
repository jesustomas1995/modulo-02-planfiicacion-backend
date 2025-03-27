## Descripción
El presente proyecto esta realizado en NestJS para el area de planificación que tendrá la finalidad de registrar catalogo(marca, tipo, producto, proveedor) , gestor de usuarios y planificacion que tiene los puntos como ser presupuesto, cotizaciones y compras.

Para realizar este proyecto se hizo uso de:
* node: 22.12.0
* Postgres: 14.13 
* NestJS: 11
* NVM: gestor de versiones de node

## Base de datos
se cuenta con un backup del sistema en la raiz del proyecto dentro de la carpeta `backup_db` en el mismo esta el archivo `bd_prueba.sql`, se recomienda restaurar la base de datos en `postgres` con la version `14.13`

## configuracion de variables de entorno
en el proyecto raiz existe el archivo `example.env`, usted debe copiar este archivo y renombrarlo `.env` y modifique las variables para poder conectarse a la bse de datos y otras variables como ser el CORS, SECRETO DEL TOKEN Y otros.

## Usar nvm para gestionar diferentes versiones de Node

```bash
$ nvm v22.12.0
```

## Instalación de Dependencias

```bash
$ npm install
```

## ejecutacion para generar esquema del orm
```
npx prisma db generate
```

## Comando para hacer correr el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Contraseña por Defecto para el sistema
```
usuario: admin
contraseña: hola123
```
