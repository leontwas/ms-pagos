import { Controller, Get, Param } from '@nestjs/common';
import { PagosService } from './pagos.service';


@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) { }

  @Get()
  obtenerPagos() {
    return this.pagosService.obtenerPagos();
  }

  @Get(':id')
  obtenerPagoPorId(@Param('id') id: string) {
    return this.pagosService.obtenerPagoPorId(id);
  }
}
