import { catchErrorCustom } from '../../../common/catcherror/index';
import { PrismaService } from '../../../databases/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GenericResponse } from 'src/common/response.generic';
import { AuthLoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private model = "auth"
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  // Crear un registro
  async login(data: AuthLoginDto): Promise<GenericResponse<any>> {
    try {
      const authSelected = await this.prisma.write.usuarios.findFirst({
        select: {
          password: true,
          registerActive: true,
          id: true,
          nombreCompleto: true,
        },
        where: {
          usuario: data.usuario,
        },
      });
      if (!authSelected) throw new HttpException("Usuario no existente o no activo", HttpStatus.BAD_REQUEST);

      const password_equals = await bcrypt.compare(data.password, authSelected.password);
      if (!password_equals)
        throw new HttpException(
          `Credenciales incorrectas intento`,
          HttpStatus.CONFLICT,
        );
      const dataToken = this.getJwtToken({
        id: authSelected.id,
        nombreCompleto: authSelected.nombreCompleto,
      })
      return new GenericResponse({
        statusCode: 200,
        message: `Login Exitoso`,
        data: dataToken,
        error: false,
      });
    } catch (error: any) {
      return catchErrorCustom(error, "Auth")
    }
  }

  private getJwtToken(payload: {
    nombreCompleto: string,
    id: number
  }): string {
    const token = this.jwtService.sign(payload, {
      expiresIn: `${30}m`,
      secret: this.configService.get<string>('ENV_TOKEN_SECRET'),
    });
    return token;
  }

}
