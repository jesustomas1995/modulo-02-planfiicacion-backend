import { Module } from '@nestjs/common';
import { CategoriaModule } from './categoria/categoria.module';
import { MarcaModule } from './marca/marca.module';
import { ProductoModule } from './producto/producto.module';
import { ProveedorModule } from './proveedor/proveedor.module';

@Module({
    imports: [
        CategoriaModule,
        MarcaModule,
        ProductoModule,
        ProveedorModule
    ],
    controllers: [],
    providers: [],
})
export class CatalogoModule { }
