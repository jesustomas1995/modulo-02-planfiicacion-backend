import { IsString, IsOptional, IsBoolean, Length, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'El nombre',
    maxLength: 100,
    example: 'Televisores',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(1, 100, { message: 'El nombre debe tener entre 1 y 100 caracteres' })
  nombre: string;

  // @ApiProperty({
  //   description: 'La descripcion',
  //   maxLength: 500,
  //   example: 'PRUEBA',
  // })
  // @IsString({ message: 'La descripcion debe ser una cadena de texto' })
  // @Length(1, 500, { message: 'El nombre debe tener entre 1 y 500 caracteres' })
  // descripcion: string;

}
