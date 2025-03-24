import { HttpStatus, Injectable } from '@nestjs/common';
import { GenericResponse } from './common/response.generic';
import { DateTime } from 'luxon';
import { PackageInfoService } from './common/package.service';

@Injectable()
export class AppService {
  constructor(private readonly packageInfo: PackageInfoService) { }

  getHello(): GenericResponse<any> {
    const data = {
      nombre: this.packageInfo.getName(),
      version: this.packageInfo.getVersion(),
      datetime: DateTime.now().toISO(),
    };

    // Devolver una respuesta genérica de éxito
    return new GenericResponse({
      statusCode: HttpStatus.OK,
      message: 'Versión de la aplicación obtenida con éxito',
      data,
      error: false,
    });
  }
}
