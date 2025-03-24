import {
  IsNumber,
  IsArray,
  Min,
  IsInt,
  ArrayMinSize,
  ValidateNested,
  Validate
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UniqueArrayValidator } from '@/common/dto/uniqueArrayValidator.dto';

class DetalleDto {
  @ApiProperty({
    description: 'El ID del producto',
    example: 0,
  })
  @IsNumber({}, { message: 'El `precio` debe ser un número' })
  @Min(0, { message: 'El `precio` debe ser al menos 0' })
  productoId: number;

  @ApiProperty({
    description: 'El precio del producto',
    example: 50,
  })
  @IsNumber({}, { message: 'El `precio` debe ser un número' })
  @Min(0, { message: 'El `precio` debe ser al menos 0' })
  precio: number;

  @ApiProperty({
    description: 'La cantidad del producto',
    example: 5,
  })
  @IsInt({ message: 'La `cantidad` debe ser un número entero' })
  @Min(1, { message: 'La `cantidad` debe ser al menos 1' })
  cantidad: number;
}

export class CreateCompraDto {
  @ApiProperty({
    description: 'proveedor',
    example: 1,
  })
  @IsNumber({}, { message: 'El `proveedorId` debe ser un número' })
  @Min(0, { message: 'El `proveedorId` debe ser como mínimo 1' })
  proveedorId: number;

  @ApiProperty({
    description: 'presupuesto',
    example: 1,
  })
  @IsNumber({}, { message: 'El `presupuestoId` debe ser un número' })
  @Min(0, { message: 'El `presupuestoId` debe ser como mínimo 1' })
  presupuestoId: number;

  @ApiProperty({
    description: 'Detalle de la orden, que incluye los productos',
    type: [DetalleDto],
  })
  @IsArray({ message: 'El `detalle` debe ser un arreglo' })
  @ArrayMinSize(1, { message: 'El `detalle` debe contener al menos un producto' })
  @ValidateNested({ each: true, message: 'Cada elemento del `detalle` debe ser un objeto válido' })
  @Validate(UniqueArrayValidator, ['productoId'], { message: 'El `productoId` debe ser único dentro de `detalle`' })
  @Type(() => DetalleDto)
  detalle: DetalleDto[];
}
