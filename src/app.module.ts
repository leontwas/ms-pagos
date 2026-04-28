import { Module } from '@nestjs/common';
import { HealthyModule } from './healthy/healthy.module';

@Module({
  imports: [HealthyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
