import { Controller, Get, Post, Param, Body } from '@nestjs/common';
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

  @Post()
  registrarPago(@Body() dto: {
    reservaId: number;
    monto: number;
    tipoPago: string;
    metodoPago: string;
    observaciones?: string;
  }) {
    return this.pagosService.registrarPago(dto);
  }

  @Post('mercadopago/preferencia')
  crearPreferencia(@Body() dto: {
    title: string;
    unit_price: number;
    quantity: number;
    reservaId: number;
  }) {
    return this.pagosService.crearPreferencia(dto);
  }
}
