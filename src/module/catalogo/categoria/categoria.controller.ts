import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
// import { GetToken, IToken } from '@/common/decorator/token.decorator';
import { ChangeStatusDto } from '@/common/dto/changeStatus.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
// import { AuthGuard } from '@/common/guards/rol.guard';
// import { AllowPermissions } from '@/common/guards/rol.decorator';

@ApiTags('CATALOGO - CATEGORIA')
@Controller('/catalogo/categoria')
@ApiSecurity('Authorization')
export class CategoriaController {
  constructor(private readonly service: CategoriaService) { }

  @Post()
  @ApiOperation({ summary: 'Servicio para registrar `categoria`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  create(@Body() data: CreateCategoriaDto,) {
    return this.service.create(data);
  }

  @Post('list')
  @ApiOperation({ summary: 'Servicio para listar los `CATEGORIA` por pagination y filtros' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  findAll(@Body() data: PaginationDto) {
    return this.service.findAll(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Servicio para obtener el `CATEGORIA` del aviso por ID' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  findOne(@Param('id', ParseIntPipe) id: number,) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Servicio para actualizar la información del `CATEGORIA`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateCategoriaDto,
  ) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Servicio para eliminar el registro de `CATEGORIA`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.changeStatus(
      id
    );
  }
}
