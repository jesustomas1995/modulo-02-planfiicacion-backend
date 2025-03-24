import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import { PackageInfoService } from './common/package.service';
import { createValidationPipe } from './common/pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const packageInfoService = app.get(PackageInfoService);
  app.use(compression());
  app.useGlobalPipes(createValidationPipe());
  app.enableCors({
    origin: (process.env.ENV_MODE == "production") ? process.env.ENV_ORIGIN?.split(",") : "*",
    // origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(json({ limit: configService.get('APP_FILE_MAX_SIZE') ?? '100mb' }));
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle(packageInfoService.getName())
    .setDescription(packageInfoService.getDescription())
    .setVersion(packageInfoService.getVersion())
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Please enter your Bearer token here',
      }, // Añadir el header global
      'Authorization', // Nombre de la referencia del esquema
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('ENV_PORT') || 3000;
  await app.listen(port);
}
bootstrap()
  .then(() => {
    const port = Number(process.env.ENV_PORT) || 3000;
    console.log(process.env.ENV_MODE || 'development');
    console.log('Servicio activo en el puerto: ' + port);
  })
  .catch((error) => {
    console.error('Error al iniciar el microservicio:', error);
  });
