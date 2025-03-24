import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        UsuarioModule, AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class SeguridadModule { }
