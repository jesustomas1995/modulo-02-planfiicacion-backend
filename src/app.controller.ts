import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GenericResponse } from './common/response.generic';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): GenericResponse<any> {
    return this.appService.getHello();
  }
}
