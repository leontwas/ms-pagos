import { Controller, Get } from '@nestjs/common';
import { PagosService } from './pagos.service';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) { }

  @Get()
  healthy() {
    return this.pagosService.healthy();
  }
}
