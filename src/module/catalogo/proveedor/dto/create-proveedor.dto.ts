import { IsString, IsOptional, IsBoolean, Length, Matches, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProveedorDto {

  @ApiProperty({
    description: 'El representante Legal',
    maxLength: 500,
    example: 'Pepito Perez',
  })
  @IsString({ message: 'El `representanteLegal` debe ser una cadena de texto' })
  @Length(1, 500, { message: 'El `representanteLegal` debe tener entre 1 y 500 caracteres' })
  representanteLegal: string;

  @ApiProperty({
    description: 'El nombre',
    maxLength: 250,
    example: 'Entel',
  })
  @IsString({ message: 'El `razonSocial` debe ser una cadena de texto' })
  @Length(1, 250, { message: 'El `razonSocial` debe tener entre 1 y 250 caracteres' })
  razonSocial: string;

  @ApiProperty({
    description: 'El nombre',
    maxLength: 100,
    example: '123456789',
  })
  @IsString({ message: 'El `nit` debe ser una cadena de texto' })
  @Length(1, 100, { message: 'El `nit` debe tener entre 1 y 100 caracteres' })
  nit: string;

  @ApiProperty({
    description: 'El nombre',
    maxLength: 50,
    example: '123456789',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
  telefono: string;

  @ApiProperty({
    description: 'El nombre',
    maxLength: 50,
    example: '123456789',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
  celular: string;

  @ApiProperty({
    description: 'El Email',
    maxLength: 500,
    example: 'pepito@gmail.com',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(1, 500, { message: 'El nombre debe tener entre 1 y 500 caracteres' })
  email: string;

  @ApiProperty({
    description: 'Dirección',
    maxLength: 500,
    example: 'Calle Angeles',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(1, 500, { message: 'El nombre debe tener entre 1 y 500 caracteres' })
  direccion: string;

  @ApiProperty({
    description: 'Municipio',
    maxLength: 250,
    example: 'Sucre',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(1, 250, { message: 'El nombre debe tener entre 1 y 250 caracteres' })
  municipio: string;

}
