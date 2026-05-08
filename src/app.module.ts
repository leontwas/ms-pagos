import { Module } from '@nestjs/common';
import { PagosModule } from './pagos/pagos.module';

@Module({
  imports: [PagosModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
