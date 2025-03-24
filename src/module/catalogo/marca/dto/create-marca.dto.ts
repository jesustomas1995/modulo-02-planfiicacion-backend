import { IsString, IsOptional, IsBoolean, Length, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMarcaDto {
  @ApiProperty({
    description: 'El nombre',
    maxLength: 100,
    example: 'Samsung',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(1, 100, { message: 'El nombre debe tener entre 1 y 100 caracteres' })
  nombre: string;
}
