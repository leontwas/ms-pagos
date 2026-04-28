import { Controller, Get} from '@nestjs/common';
import { HealthyService } from './healthy.service';

@Controller('healthy')
export class HealthyController {
  constructor(private readonly healthyService: HealthyService) {}

  @Get()
  healthy() {
    return this.healthyService.healthy();
  }
}
