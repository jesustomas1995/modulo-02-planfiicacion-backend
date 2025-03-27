import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
// import { GetToken, IToken } from '@/common/decorator/token.decorator';
import { ChangeStatusDto } from '@/common/dto/changeStatus.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
// import { AuthGuard } from '@/common/guards/rol.guard';
// import { AllowPermissions } from '@/common/guards/rol.decorator';

@ApiTags('CATALOGO - PROVEEDOR')
@Controller('/catalogo/proveedor')
@ApiSecurity('Authorization')
// TODO: 1) adicionar guards  
// @UseGuards(AuthGuard)
export class ProveedorController {
  constructor(private readonly service: ProveedorService) { }

  @Post()
  @ApiOperation({ summary: 'Servicio para registrar `PROVEEDOR`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  create(@Body() data: CreateProveedorDto,) {
    return this.service.create(data);
  }

  @Post('list')
  @ApiOperation({ summary: 'Servicio para listar los `PROVEEDOR` por pagination y filtros' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  findAll(@Body() data: PaginationDto) {
    return this.service.findAll(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Servicio para obtener el `PROVEEDOR` del aviso por ID' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  findOne(@Param('id', ParseIntPipe) id: number,) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Servicio para actualizar la información del `PROVEEDOR`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateProveedorDto,
  ) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Servicio para eliminar el registro de `PROVEEDOR`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.changeStatus(
      id
    );
  }
}
