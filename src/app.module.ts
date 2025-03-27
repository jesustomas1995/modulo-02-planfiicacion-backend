import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogoModule } from './module/catalogo/catologo.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './databases/prisma.module';
import { PackageInfoService } from './common/package.service';
import { SeguridadModule } from './module/seguridad/seguridad.module';
import { PlanificacionModule } from './module/planificacion/planificacion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el módulo esté disponible en toda la aplicación
      envFilePath: '.env', // Ruta al archivo .env
    }),
    CatalogoModule,
    SeguridadModule,
    PlanificacionModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, PackageInfoService],
})
export class AppModule { }
