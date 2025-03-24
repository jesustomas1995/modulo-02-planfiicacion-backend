import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.dto';
// import { GetToken, IToken } from '@/common/decorator/token.decorator';
import { ChangeStatusDto } from '@/common/dto/changeStatus.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
// import { AuthGuard } from '@/common/guards/rol.guard';
// import { AllowPermissions } from '@/common/guards/rol.decorator';

@ApiTags('SEGURIDAD - Auth')
@Controller('/auth')
@ApiSecurity('Authorization')
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @Post("login")
  @ApiOperation({ summary: 'Servicio para autenticar `usuario`' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos' })
  @ApiResponse({ status: 500, description: 'Error Interno del servidor' })
  create(@Body() data: AuthLoginDto,) {
    return this.service.login(data);
  }

}
