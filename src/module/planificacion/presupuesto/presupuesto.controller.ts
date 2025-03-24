import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { PresupuestoService } from './presupuesto.service';
import { CreatePresupuestoDto } from './dto/create-presupuesto.dto';
// import { GetToken, IToken } from '@/common/decorator/token.decorator';
import { ChangeStatusDto } from '@/common/dto/changeStatus.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
// import { AuthGuard } from '@/common/guards/rol.guard';
// import { AllowPermissions } from '@/common/guards/rol.decorator';

@ApiTags('CATALOGO - PRESUPUESTO')
@Controller('/catalogo/presupuesto')
@ApiSecurity('Authorization')
export class PresupuestoController {
  constructor(private readonly service: PresupuestoService) { }

  @Post()
  @ApiOperation({ summary: 'Servicio para registrar `Presupuesto`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  create(@Body() data: CreatePresupuestoDto,) {
    return this.service.create(data);
  }

  @Post('list')
  @ApiOperation({ summary: 'Servicio para listar los `Presupuesto` por pagination y filtros' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  findAll(@Body() data: PaginationDto) {
    return this.service.findAll(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Servicio para obtener el `Presupuesto` del aviso por ID' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  findOne(@Param('id', ParseIntPipe) id: number,) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Servicio para actualizar la información del `Presupuesto`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreatePresupuestoDto,
  ) {
    return this.service.update(id, data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Servicio para eliminar el registro de `Presupuesto`' })
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
