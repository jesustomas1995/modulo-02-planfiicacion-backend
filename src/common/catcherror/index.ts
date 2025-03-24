import { Prisma } from '@prisma/client';
import { GenericResponse } from '../response.generic';
import { HttpException } from '@nestjs/common';

export const catchErrorCustom = (error: any, title: string) => {
  let statusCode = 500;
  let message = `Error Interno ${title}: ${error.message}`;
  console.log(error, title)
  // console.log(error)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const errorMap: Record<string, { message: string; statusCode: number }> = {
      P2000: { message: `El valor proporcionado para algún campo es demasiado largo.`, statusCode: 400 },
      P2001: { message: `El registro solicitado no existe en la base de datos.`, statusCode: 404 },
      P2002: {
        message: `El '${Array.isArray(error.meta?.target) ? error.meta.target.join(', ') : 'campo único'}' ya está registrado.`,
        statusCode: 400,
      },
      P2003: {
        message: `Violación de clave foránea: ${error.meta?.field_name || 'campo relacionado'}.`,
        statusCode: 400,
      },
      P2004: { message: `Restricción de consulta fallida: ${error.message}.`, statusCode: 400 },
      P2005: { message: `El valor proporcionado no es válido para el campo esperado.`, statusCode: 400 },
      P2006: { message: `El tipo de dato proporcionado no es compatible con el esquema.`, statusCode: 400 },
      P2007: { message: `Los datos enviados son inválidos para la operación requerida.`, statusCode: 400 },
      P2008: { message: `Falló la validación de la consulta. Verifica tu esquema y datos.`, statusCode: 400 },
      P2009: { message: `Falló la validación de los datos: ${error.message}.`, statusCode: 400 },
      P2010: { message: `Error no permitido en las operaciones de raw query.`, statusCode: 400 },
      P2011: {
        message: `Restricción única violada: ${error.meta?.constraint || 'campo único'}.`,
        statusCode: 400,
      },
      P2012: { message: `Campo requerido faltante en los datos enviados.`, statusCode: 400 },
      P2013: { message: `Faltan parámetros requeridos en la consulta.`, statusCode: 400 },
      P2014: { message: `Violación en la relación referencial entre tablas.`, statusCode: 400 },
      P2015: { message: `El registro buscado no existe en la base de datos.`, statusCode: 404 },
      P2016: { message: `El registro relacionado no existe en la base de datos.`, statusCode: 404 },
      P2017: { message: `Consulta malformada: ${error.message}.`, statusCode: 400 },
      P2018: { message: `El registro no está vinculado en la relación esperada.`, statusCode: 400 },
      P2019: {
        message: `Entrada inválida para el campo: ${error.meta?.field_name || 'campo no especificado'}.`,
        statusCode: 400,
      },
      P2020: { message: `Valor fuera de rango para el campo especificado.`, statusCode: 400 },
      P2021: { message: `La tabla solicitada no existe en la base de datos.`, statusCode: 404 },
      P2022: { message: `Columna no existente en la tabla solicitada.`, statusCode: 404 },
      P2023: { message: `Error en la interpretación del argumento de consulta.`, statusCode: 400 },
      P2024: { message: `Tiempo de espera agotado en la operación de base de datos.`, statusCode: 408 },
      P2025: { message: `El registro solicitado para la operación no existe.`, statusCode: 404 },
    };

    const mappedError = errorMap[error.code];
    if (mappedError) {
      message = mappedError.message;
      statusCode = mappedError.statusCode;
    } else {
      message = `Error conocido de Prisma: ${error.message}.`;
      statusCode = 400;
    }
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    message = `Error desconocido de Prisma al procesar ${title}.`;
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    message = `Error al inicializar Prisma: ${error.message}.`;
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    message = `Error crítico en Prisma: Rust panic.`;
  } else if (error.message.includes('Out of Memory')) {
    message = `El servidor no tiene suficiente memoria RAM para procesar la solicitud.`;
    statusCode = 507; // 507: Insufficient Storage
  } else if (error.message.includes('Killed process') || error.message.includes('OOM')) {
    message = `El proceso fue terminado debido a falta de memoria en el sistema.`;
    statusCode = 500;
  } else if (error instanceof HttpException) {
    message = error.message;
    statusCode = error.getStatus();
  }

  return new GenericResponse({
    statusCode,
    message,
    data: error,
    error: true,
  });
};
