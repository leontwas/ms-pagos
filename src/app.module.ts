import { Module } from '@nestjs/common';
import { PagosModule } from './pagos/pagos.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';


@Module({
  imports: [PagosModule, ConfigModule.forRoot({
    isGlobal: true,
  }), SupabaseModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
