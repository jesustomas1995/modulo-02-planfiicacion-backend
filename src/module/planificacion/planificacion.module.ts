import { CompraModule } from './compra/compra.module';
import { Module } from '@nestjs/common';
import { PresupuestoModule } from './presupuesto/presupuesto.module';
import { CotizacionModule } from './cotizacion/cotizacion.module';

@Module({
    imports: [
        PresupuestoModule,
        CotizacionModule,
        CompraModule
    ],
    controllers: [],
    providers: [],
})
export class PlanificacionModule { }
