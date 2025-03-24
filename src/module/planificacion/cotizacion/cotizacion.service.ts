import { catchErrorCustom } from '../../../common/catcherror/index';
import { PrismaService } from '../../../databases/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GenericResponse } from 'src/common/response.generic';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CotizacionService {
  private model = "cotización"
  constructor(
    readonly prisma: PrismaService,
  ) { }

  // Crear un registro
  async create(data: CreateCotizacionDto): Promise<GenericResponse<any>> {
    try {
      const resp = await this.prisma.write.$transaction(async (tx) => {
        const product_total = await tx.producto.count({
          where: {
            id: {
              in: data.detalle.map(data => data.productoId),
            }
          }
        });
        if (product_total != data.detalle.length)
          throw new HttpException("Uno de los id de los productos no esta disponible", HttpStatus.BAD_REQUEST);

        const createdData = await tx.cotizacion.create({
          data: {
            proveedorId: data.proveedorId,
            total: data.detalle.reduce((total, item) => total + (item.cantidad * item.precio), 0),
            registerActive: true,
          },
        });

        await tx.cotizacion_detalle.createMany({
          skipDuplicates: true,
          data: data.detalle.map((item) => {
            return {
              cotizacionId: createdData.id,
              cantidad: item.cantidad,
              precio: item.precio,
              productoId: item.productoId,
            }
          }),
        })

        return createdData;
      });

      return new GenericResponse({
        statusCode: 201,
        message: `${this.model} creada con éxito`,
        data: resp,
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
        this.prisma.read.cotizacion.findMany({
          select: {
            id: true,
            total: true,
            registerActive: true,
            createdAt: true,
            updatedAt: true,
            proveedor: {
              select: {
                id: true,
                nit: true,
                razonSocial: true,
                representanteLegal: true
              }
            },
          },
          skip: offset,
          take: limit,
        }),
        this.prisma.read.cotizacion.count({}),
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
      const data = await this.prisma.read.cotizacion.findUnique({
        select: {
          id: true,
          total: true,
          registerActive: true,
          proveedor: {
            select: {
              id: true,
              nit: true,
              razonSocial: true,
              representanteLegal: true
            }
          },
          cotizacionDetalle: {
            select: {
              id: true,
              cantidad: true,
              precio: true,
              producto: {
                select: {
                  id: true,
                  nombre: true,
                  marca: {
                    select: {
                      id: true,
                      nombre: true,
                    }
                  },
                  categoria: {
                    select: {
                      id: true,
                      nombre: true,
                    }
                  }
                }
              },
            }
          }
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
  async update(id: number, data: CreateCotizacionDto): Promise<GenericResponse<any>> {
    try {
      const resp = await this.prisma.write.$transaction(async (tx) => {
        const product_total = await tx.producto.count({
          where: {
            id: {
              in: data.detalle.map(data => data.productoId),
            }
          }
        });
        if (product_total != data.detalle.length)
          throw new HttpException("Uno de los id de los productos no esta disponible", HttpStatus.BAD_REQUEST);

        const [updatedData, detalles] = await Promise.allSettled([
          tx.cotizacion.update({
            where: { id },
            data: {
              proveedorId: data.proveedorId,
              total: data.detalle.reduce((total, item) => total + (item.cantidad * item.precio), 0),
              registerActive: true,
            },
          }),
          tx.cotizacion_detalle.findMany({
            select: {
              id: true,
              registerActive: true,
              productoId: true,
            },
            where: { cotizacionId: id }
          })
        ]);

        if (detalles.status == "fulfilled") {
          const news = [];
          data.detalle.forEach(async (item) => {
            const found = detalles.value.filter((tmp) => tmp.productoId == item.productoId);
            if (found.length > 0) {
              await tx.cotizacion_detalle.update({
                where: {
                  id: found[0].id,
                },
                data: {
                  cantidad: item.cantidad,
                  precio: item.precio,
                  registerActive: true
                }
              });
            } else {
              news.push({
                productId: item.productoId,
                cantidad: item.cantidad,
                precio: item.precio,
                cotizacionId: id
              })
            }
          });
          // ingresando nuevos
          if (news.length > 0)
            await tx.cotizacion_detalle.createMany({
              skipDuplicates: true,
              data: news,
            });
          // actualizando no registrados
          await tx.cotizacion_detalle.updateMany({
            where: {
              cotizacionId: id,
              productoId: {
                notIn: data.detalle.map(item => item.productoId)
              }
            },
            data: {
              registerActive: false
            }
          })
        }

        return updatedData;
      });
      return new GenericResponse({
        statusCode: 200,
        message: `${this.model} actualizado con éxito`,
        data: resp,
        error: false,
      });
    } catch (error) {
      return catchErrorCustom(error, 'Error Interno del servidor');
    }
  }

  // Marcar un registro como eliminado
  async changeStatus(id: number, isDeleted: boolean): Promise<GenericResponse<any>> {
    try {
      const deletedData = await this.prisma.write.cotizacion.update({
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
