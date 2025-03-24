import { catchErrorCustom } from '../../../common/catcherror/index';
import { PrismaService } from '../../../databases/prisma.service';
import { Injectable } from '@nestjs/common';
import { GenericResponse } from 'src/common/response.generic';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  private model = "usuario"
  constructor(
    readonly prisma: PrismaService,
  ) { }

  // Crear un registro
  async create(data: CreateUsuarioDto): Promise<GenericResponse<any>> {
    try {
      const contraseña_encriptada = await bcrypt.hash(data.password, 10);
      const createdData = await this.prisma.write.usuarios.create({
        omit: { password: true },
        data: {
          usuario: data.usuario,
          nombreCompleto: data.nombreCompleto,
          password: contraseña_encriptada,
          registerActive: true,
        },
      });
      return new GenericResponse({
        statusCode: 201,
        message: `${this.model} creada con éxito`,
        data: createdData,
        error: false,
      });
    } catch (error: any) {
      return catchErrorCustom(error, "Crear Registro")
    }
  }

  // Obtener todos los registros
  async findAll(filterDto: PaginationDto): Promise<GenericResponse<any>> {
    try {
      const { page, limit } = filterDto;

      const offset = (page - 1) * limit;
      // const where = prepareWhere(filterDto.where);
      const [data, total] = await Promise.all([
        this.prisma.read.usuarios.findMany({
          select: {
            id: true,
            nombreCompleto: true,
            usuario: true,
            registerActive: true,
            createdAt: true,
            updatedAt: true,
          },
          skip: offset,
          take: limit,
        }),
        this.prisma.read.usuarios.count({}),
      ]);
      const totalPages = Math.ceil(total / limit);

      return new GenericResponse({
        statusCode: 200,
        message: `${this.model} obtenidos con éxito`,
        data: {
          totalItems: total,
          limit: limit,
          currentPage: page,
          totalPages,
          items: data,
        },
        error: false,
      });
    } catch (error) {
      return catchErrorCustom(error, 'Listado con pagination');
    }
  }

  // Obtener un registro por ID
  async findOne(id: number): Promise<GenericResponse<any>> {
    try {
      const data = await this.prisma.read.usuarios.findUnique({
        select: {
          id: true,
          nombreCompleto: true,
          usuario: true,
          registerActive: true,
          createdAt: true,
          updatedAt: true,
        },
        where: { id },
      });
      if (!data) {
        return new GenericResponse({
          statusCode: 404,
          message: `${this.model} no encontrado`,
          error: true,
        });
      }
      return new GenericResponse({
        statusCode: 200,
        message: `${this.model} obtenido con éxito`,
        data,
        error: false,
      });
    } catch (error) {
      return catchErrorCustom(error, 'Error Interno del servidor');
    }
  }

  // Actualizar un registro
  async update(id: number, data: CreateUsuarioDto): Promise<GenericResponse<any>> {
    try {
      const password_encrypt = await bcrypt.hash(data.password, 10);
      const updatedData = await this.prisma.write.usuarios.update({
        where: { id },
        data: {
          usuario: data.usuario,
          nombreCompleto: data.nombreCompleto,
          password: password_encrypt,
          updatedAt: new Date(),
        },
      });
      return new GenericResponse({
        statusCode: 200,
        message: `${this.model} actualizado con éxito`,
        data: updatedData,
        error: false,
      });
    } catch (error) {
      return catchErrorCustom(error, 'Error Interno del servidor');
    }
  }

  // Marcar un registro como eliminado
  async changeStatus(id: number, isDeleted: boolean): Promise<GenericResponse<any>> {
    try {
      const deletedData = await this.prisma.write.usuarios.update({
        where: { id },
        data: {
          registerActive: isDeleted,
          updatedAt: new Date(),
        },
      });
      return new GenericResponse({
        statusCode: 200,
        message: `${this.model} eliminado con éxito`,
        data: deletedData,
        error: false,
      });
    } catch (error) {
      return catchErrorCustom(error, 'Error Interno del servidor');
    }
  }

}
