import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogoModule } from './module/catalogo/catologo.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './databases/prisma.module';
import { PackageInfoService } from './common/package.service';
import { SeguridadModule } from './module/seguridad/seguridad.module';
import { PlanificacionModule } from './module/planificacion/planificacion.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); // Aplica a todas las rutas
  }
}