import { IsString, IsOptional, IsBoolean, Length, Matches, IsNumber, Min, IsISO8601 } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePresupuestoDto {
  @ApiProperty({
    description: 'El nombre',
    maxLength: 100,
    example: 'Samsung',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(1, 100, { message: 'El nombre debe tener entre 1 y 100 caracteres' })
  nombre: string;

  @ApiProperty({
    description: 'La descripcion',
    maxLength: 500,
    example: 'PRUEBA',
  })
  @IsString({ message: 'La descripcion debe ser una cadena de texto' })
  @Length(1, 500, { message: 'El nombre debe tener entre 1 y 500 caracteres' })
  descripcion: string;

  @ApiProperty({
    description: 'monto',
    example: 1,
  })
  @IsNumber({}, { message: 'El `monto` debe ser un número' })
  @Min(0, { message: 'El `monto` debe ser como mínimo 1' })
  monto: number;

  @ApiProperty({
    description: 'sobrante',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El `sobrante` debe ser un número' })
  @Min(0, { message: 'El `sobrante` debe ser como mínimo 1' })
  sobrante: number;

  @ApiProperty({
    description: 'Fecha de vencimiento',
    example: '2025-12-31T23:59:59.999Z',
  })
  @IsISO8601({ strict: true }, { message: 'El `vencimiento` debe ser una fecha válida en formato ISO 8601' })
  vencimiento: string;
}
