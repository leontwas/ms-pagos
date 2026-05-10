import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  controllers: [PagosController],
  providers: [PagosService],
  imports: [SupabaseModule],
})
export class PagosModule { }
