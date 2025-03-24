import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
// import { GetToken, IToken } from '@/common/decorator/token.decorator';
import { ChangeStatusDto } from '@/common/dto/changeStatus.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
// import { AuthGuard } from '@/common/guards/rol.guard';
// import { AllowPermissions } from '@/common/guards/rol.decorator';

@ApiTags('CATALOGO - PRODUCTO')
@Controller('/catalogo/producto')
@ApiSecurity('Authorization')
// TODO: 1) adicionar guards  
// @UseGuards(AuthGuard)
export class ProductoController {
  constructor(private readonly service: ProductoService) { }

  @Post()
  // @AllowPermissions(['CAT_INCIDENCIA_ESTADO_CREAR'])
  @ApiOperation({ summary: 'Servicio para registrar `categoria`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  create(@Body() data: CreateProductoDto,) {
    return this.service.create(data);
  }

  @Post('list')
  // @AllowPermissions(['CAT_INCIDENCIA_ESTADO_LISTAR'])
  @ApiOperation({ summary: 'Servicio para listar los `CATEGORIA` por pagination y filtros' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  findAll(@Body() data: PaginationDto) {
    return this.service.findAll(data);
  }

  @Get(':id')
  // @AllowPermissions(['CAT_INCIDENCIA_ESTADO_LISTAR'])
  @ApiOperation({ summary: 'Servicio para obtener el `CATEGORIA` del aviso por ID' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  findOne(@Param('id', ParseIntPipe) id: number,) {
    return this.service.findOne(id);
  }

  @Put(':id')
  // @AllowPermissions(['CAT_INCIDENCIA_ESTADO_ACTUALIZAR'])
  @ApiOperation({ summary: 'Servicio para actualizar la información del `CATEGORIA`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateProductoDto,
  ) {
    return this.service.update(id, data);
  }

  @Patch(':id')
  // @AllowPermissions(['CAT_INCIDENCIA_ESTADO_ELIMINAR'])
  @ApiOperation({ summary: 'Servicio para eliminar el registro de `CATEGORIA`' })
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
