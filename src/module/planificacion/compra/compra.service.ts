import { catchErrorCustom } from '../../../common/catcherror/index';
import { PrismaService } from '../../../databases/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GenericResponse } from 'src/common/response.generic';
import { CreateCompraDto } from './dto/create-compra.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CompraService {
  private model = "compra"
  constructor(
    readonly prisma: PrismaService,
  ) { }

  // Crear un registro
  async create(data: CreateCompraDto): Promise<GenericResponse<any>> {
    try {
      const resp = await this.prisma.write.$transaction(async (tx) => {
        // verificar el saldo del presupuesto
        const [total_presupuesto, producto_total] = await Promise.allSettled([
          tx.presupuesto.findFirst({
            select: {
              sobrante: true,
            },
            where: {
              registerActive: true,
              id: data.presupuestoId
            }
          }),
          tx.producto.count({
            where: {
              id: {
                in: data.detalle.map(data => data.productoId),
              }
            }
          })
        ]);
        if (total_presupuesto.status == "rejected")
          throw new HttpException("problemas al obtener el dato presupuesto", HttpStatus.INTERNAL_SERVER_ERROR);

        if (producto_total.status == "rejected")
          throw new HttpException("problemas al obtener los datos", HttpStatus.INTERNAL_SERVER_ERROR);

        // verificar que los productos existan
        if (producto_total.value != data.detalle.length)
          throw new HttpException("Uno de los id de los productos no esta disponible", HttpStatus.BAD_REQUEST);


        const total_compra = data.detalle.reduce((total, item) => total + (item.cantidad * item.precio), 0);
        if (total_compra > total_presupuesto.value.sobrante)
          throw new HttpException("No Existe fondos suficientes para este presupuesto", HttpStatus.CONFLICT);

        const createdData = await tx.compra.create({
          data: {
            proveedorId: data.proveedorId,
            presupuestoId: data.presupuestoId,
            total: total_compra,
            registerActive: true,
          },
        });

        await tx.compra_detalle.createMany({
          skipDuplicates: true,
          data: data.detalle.map((item) => {
            return {
              compraId: createdData.id,
              cantidad: item.cantidad,
              precio: item.precio,
              productoId: item.productoId,
            }
          }),
        });
        // update: presupuesto
        await tx.presupuesto.update({
          where: { id: data.presupuestoId },
          data: {
            sobrante: total_presupuesto.value.sobrante - total_compra,
          }
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
        this.prisma.read.compra.findMany({
          select: {
            id: true,
            total: true,
            registerActive: true,
            createdAt: true,
            updatedAt: true,
            presupuesto: {
              select: {
                id: true,
                nombre: true,
                monto: true
              }
            },
            proveedor: {
              select: {
                id: true,
                nit: true,
                razonSocial: true,
                representanteLegal: true
              }
            },
          },
          where: {
            registerActive: true,
          },
          skip: offset,
          take: limit,
        }),
        this.prisma.read.compra.count({}),
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
      const data = await this.prisma.read.compra.findUnique({
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
          presupuesto: {
            select: {
              id: true,
              nombre: true,
            }
          },
          compraDetalle: {
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
  async update(id: number, data: CreateCompraDto): Promise<GenericResponse<any>> {
    try {
      const resp = await this.prisma.write.$transaction(async (tx) => {
        const [total_compras, total_presupuesto, producto_total] = await Promise.allSettled([
          tx.compra.findFirst({
            select: {
              total: true,
              presupuesto: {
                select: {
                  id: true,
                  sobrante: true,
                }
              },
            },
            where: {
              registerActive: true,
              id
            }
          }),
          tx.presupuesto.findFirst({
            select: {
              sobrante: true,
            },
            where: {
              registerActive: true,
              id: data.presupuestoId
            }
          }),
          tx.producto.count({
            where: {
              id: {
                in: data.detalle.map(data => data.productoId),
              }
            }
          })
        ]);
        if (total_compras.status == "rejected")
          throw new HttpException("problemas al obtener el dato compra", HttpStatus.INTERNAL_SERVER_ERROR);
        if (total_presupuesto.status == "rejected")
          throw new HttpException("problemas al obtener el dato presupuesto", HttpStatus.INTERNAL_SERVER_ERROR);

        if (producto_total.status == "rejected")
          throw new HttpException("problemas al obtener los datos", HttpStatus.INTERNAL_SERVER_ERROR);

        // verificar que los productos existan
        if (producto_total.value != data.detalle.length)
          throw new HttpException("Uno de los id de los productos no esta disponible", HttpStatus.BAD_REQUEST);

        // verificar si el sobrante es el mismo
        let tmp_nuevo_sobrante = (total_presupuesto.value.sobrante);
        const tmp_total_compra = data.detalle.reduce((total, item) => total + (item.cantidad * item.precio), 0);
        if (data.presupuestoId == total_compras.value.presupuesto.id) {
          tmp_nuevo_sobrante = +total_compras.value.total
          await tx.presupuesto.update({
            where: {
              id: data.presupuestoId
            },
            data: {
              sobrante: tmp_nuevo_sobrante - tmp_total_compra
            }
          });
        } else {
          await Promise.allSettled([
            // devolver el dinero
            tx.presupuesto.update({
              where: {
                id: total_compras.value.presupuesto.id,
              },
              data: {
                sobrante: total_compras.value.presupuesto.sobrante + total_compras.value.total
              }
            }),
            // actualizar al nuevo presupuesto
            await tx.presupuesto.update({
              where: {
                id: data.presupuestoId
              },
              data: {
                sobrante: total_presupuesto.value.sobrante - tmp_total_compra
              }
            }),
          ])
        }

        if (tmp_total_compra > tmp_nuevo_sobrante)
          throw new HttpException("No Existe fondos suficientes para este presupuesto", HttpStatus.CONFLICT);

        const [updatedData, detalles] = await Promise.allSettled([
          tx.compra.update({
            where: { id },
            data: {
              proveedorId: data.proveedorId,
              presupuestoId: data.presupuestoId,
              total: data.detalle.reduce((total, item) => total + (item.cantidad * item.precio), 0),
              registerActive: true,
            },
          }),
          tx.compra_detalle.findMany({
            select: {
              id: true,
              registerActive: true,
              productoId: true,
            },
            where: { compraId: id }
          })
        ]);

        if (detalles.status == "fulfilled") {
          const news = [];
          data.detalle.forEach(async (item) => {
            const found = detalles.value.filter((tmp) => tmp.productoId == item.productoId);
            if (found.length > 0) {
              await tx.compra_detalle.update({
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
                productoId: item.productoId,
                cantidad: item.cantidad,
                precio: item.precio,
                compraId: id
              })
            }
          });
          // ingresando nuevos
          if (news.length > 0)
            await tx.compra_detalle.createMany({
              skipDuplicates: true,
              data: news,
            });
          // actualizando no registrados
          await tx.compra_detalle.updateMany({
            where: {
              compraId: id,
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
  async changeStatus(id: number): Promise<GenericResponse<any>> {
    try {
      const deletedData = await this.prisma.write.compra.update({
        where: { id },
        data: {
          registerActive: false,
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
