import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Número de la página a obtener',
    default: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number) // Convierte el valor a número
  @IsInt({ message: 'La página debe ser un número entero' })
  @Min(1, { message: 'El número de página debe ser al menos 1' })
  page: number;

  @ApiPropertyOptional({
    description: 'Cantidad de registros a obtener por página',
    default: 10,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number) // Convierte el valor a número
  @IsInt({ message: 'El límite debe ser un número entero' })
  @Min(1, { message: 'El límite debe ser al menos 1' })
  limit: number;
}
