import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class PackageInfoService {
  private packageJson: any;

  constructor() {
    const packageJsonPath = join(__dirname, '../../package.json'); // Ruta relativa al archivo package.json
    const file = readFileSync(packageJsonPath, 'utf8'); // Lee el archivo
    this.packageJson = JSON.parse(file); // Convierte el archivo JSON a objeto
  }

  // Método para obtener una propiedad específica del package.json
  getVersion(): string {
    return this.packageJson.version; // Accede a la versión del package.json
  }

  getName(): string {
    return this.packageJson.name; // Accede a la versión del package.json
  }
  getDescription(): string {
    return this.packageJson.description; // Accede a la versión del package.json
  }

  // Método para obtener todo el contenido de package.json
  getPackageInfo(): any {
    return this.packageJson;
  }
}
