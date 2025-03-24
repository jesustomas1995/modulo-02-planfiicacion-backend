import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  private prismaWrite: PrismaClient;
  private prismaRead: PrismaClient;

  constructor() {
    // Cliente para escritura
    this.prismaWrite = new PrismaClient({
      datasources: {
        db: {
          url: process.env.ENV_DATABASE_URL_WRITE,
        },
      },
    });

    // Cliente para lectura
    this.prismaRead = new PrismaClient({
      datasources: {
        db: {
          url: process.env.ENV_DATABASE_URL_READ,
        },
      },
    });
  }

  // Exponer métodos para acceder a prismaWrite
  get write() {
    return this.prismaWrite;
  }

  // Exponer métodos para acceder a prismaRead
  get read() {
    return this.prismaRead;
  }

  // Cierra las conexiones al apagar el módulo
  async onModuleDestroy() {
    await this.prismaWrite.$disconnect();
    await this.prismaRead.$disconnect();
  }
}
