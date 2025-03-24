import { ValidationPipe, ValidationError, BadRequestException, HttpStatus } from '@nestjs/common';

export const createValidationPipe = () =>
  new ValidationPipe({
    whitelist: true, // Elimina campos que no están en el DTO
    forbidNonWhitelisted: true, // Lanza error si se pasan campos no permitidos
    transform: true, // Transforma los tipos según los DTOs
    exceptionFactory: (errors: ValidationError[]) => {
      const groupedErrors = errors.reduce(
        (acc, error) => {
          const field = error.property;
          const constraints = Object.values(error.constraints || {});
          // Si ya existe el campo, agregamos más errores a su array
          acc[field] = acc[field] ? [...acc[field], ...constraints] : constraints;
          return acc;
        },
        {} as Record<string, string[]>,
      );
      return new BadRequestException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Validación fallida',
        data: groupedErrors,
        error: true,
      });
    },
  });
