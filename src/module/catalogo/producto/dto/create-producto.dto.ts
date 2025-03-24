import { IsString, IsOptional, IsBoolean, Length, Matches, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductoDto {

  @ApiProperty({
    description: 'El nombre',
    maxLength: 100,
    example: 'Televisores',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(1, 100, { message: 'El nombre debe tener entre 1 y 100 caracteres' })
  nombre: string;

  @ApiProperty({
    description: 'El nombre',
    maxLength: 200,
    example: 'Televisores',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(1, 200, { message: 'El nombre debe tener entre 1 y 200 caracteres' })
  numberPart: string;

  @ApiProperty({
    description: 'El nombre',
    maxLength: 200,
    example: 'Televisores',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(1, 200, { message: 'El nombre debe tener entre 1 y 200 caracteres' })
  numberSerial: string;

  @ApiProperty({
    description: 'marca',
    example: 1,
  })
  @IsNumber({}, { message: 'El `marcaId` debe ser un número' })
  @Min(0, { message: 'El `marcaId` debe ser como mínimo 1' })
  marcaId: number;

  @ApiProperty({
    description: 'categoria',
    example: 1,
  })
  @IsNumber({}, { message: 'El `categoriaId` debe ser un número' })
  @Min(0, { message: 'El `categoriaId` debe ser como mínimo 1' })
  categoriaId: number;


  @ApiProperty({
    description: 'La descripcion',
    maxLength: 1000,
    example: 'PRUEBA',
  })
  @IsString({ message: 'La descripcion debe ser una cadena de texto' })
  @Length(1, 1000, { message: 'El nombre debe tener entre 1 y 1000 caracteres' })
  descripcion: string;

}
