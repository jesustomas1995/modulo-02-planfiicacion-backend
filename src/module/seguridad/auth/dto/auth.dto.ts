import { IsString, IsOptional, IsBoolean, Length, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({
    description: 'El usuario',
    maxLength: 50,
    example: 'admin',
  })
  @IsString({ message: 'El usuario debe ser una cadena de texto' })
  @Length(1, 50, { message: 'El usuario debe tener entre 1 y 50 caracteres' })
  usuario: string;

  @ApiProperty({
    description: 'El password',
    maxLength: 20,
    example: 'hola123',
  })
  @IsString({ message: 'El password debe ser una cadena de texto' })
  @Length(1, 20, { message: 'El password debe tener entre 1 y 20 caracteres' })
  password: string;
}
