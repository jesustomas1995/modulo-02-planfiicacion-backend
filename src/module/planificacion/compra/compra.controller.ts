import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { CompraService } from './compra.service';
import { CreateCompraDto } from './dto/create-compra.dto';
// import { GetToken, IToken } from '@/common/decorator/token.decorator';
import { ChangeStatusDto } from '@/common/dto/changeStatus.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
// import { AuthGuard } from '@/common/guards/rol.guard';
// import { AllowPermissions } from '@/common/guards/rol.decorator';

@ApiTags('PLANIFICACION - COMPRA')
@Controller('/planificacion/compra')
@ApiSecurity('Authorization')
export class CompraController {
  constructor(private readonly service: CompraService) { }

  @Post()
  @ApiOperation({ summary: 'Servicio para registrar `Cotización`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  create(@Body() data: CreateCompraDto,) {
    return this.service.create(data);
  }

  @Post('list')
  @ApiOperation({ summary: 'Servicio para listar los `Cotizacion` por pagination y filtros' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  findAll(@Body() data: PaginationDto) {
    return this.service.findAll(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Servicio para obtener el `Cotizacion` del aviso por ID' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  findOne(@Param('id', ParseIntPipe) id: number,) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Servicio para actualizar la información del `Cotizacion`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateCompraDto,
  ) {
    return this.service.update(id, data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Servicio para eliminar el registro de `Cotizacion`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  remove(@Param('id', ParseIntPipe) id: number, @Body() body: ChangeStatusDto) {
    return this.service.changeStatus(
      id,
      body.registerActive,
    );
  }
}
