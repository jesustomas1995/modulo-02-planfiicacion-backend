import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class ChangeStatusDto {
  @ApiPropertyOptional({
    description: 'Indica si la Rol está eliminada',
    default: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo `registerActive` debe ser un valor booleano' })
  registerActive?: boolean;
}
