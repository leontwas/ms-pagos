import { Controller, Get } from '@nestjs/common';
import { HealthyService } from './pagos.service';

@Controller('pagos')
export class HealthyController {
  constructor(private readonly healthyService: HealthyService) { }

  @Get()
  healthy() {
    return this.healthyService.healthy();
  }
}
