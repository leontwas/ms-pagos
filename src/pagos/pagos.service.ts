import { Injectable } from '@nestjs/common';

@Injectable()
export class PagosService {
  healthy() {
    return {
      message: "El microservicio de pagos está corriendo correctamente"
    };
  }
}
