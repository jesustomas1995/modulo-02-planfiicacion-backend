import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Este decorador hace que el módulo sea global
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Asegúrate de exportar el servicio para que esté disponible
})
export class PrismaModule {}
