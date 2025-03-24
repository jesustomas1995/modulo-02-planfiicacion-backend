import { catchErrorCustom } from '../../../common/catcherror/index';
import { PrismaService } from '../../../databases/prisma.service';
import { Injectable } from '@nestjs/common';
import { GenericResponse } from 'src/common/response.generic';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MarcaService {
  private model = "marca"
  constructor(
    readonly prisma: PrismaService,
  ) { }

  // Crear un registro
  async create(data: CreateMarcaDto): Promise<GenericResponse<any>> {
    try {
      const createdData = await this.prisma.write.marca.create({
        data: {
          ...data,
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
        this.prisma.read.marca.findMany({

          skip: offset,
          take: limit,
        }),
        this.prisma.read.marca.count({}),
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
      const data = await this.prisma.read.marca.findUnique({
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
  async update(id: number, data: CreateMarcaDto): Promise<GenericResponse<any>> {
    try {
      const updatedData = await this.prisma.write.marca.update({
        where: { id },
        data: {
          ...data,
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
      const deletedData = await this.prisma.write.marca.update({
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
