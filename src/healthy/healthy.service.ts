import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthyService {
    healthy() {
      return {
        message: "El microservicio de pagos está corriendo correctamente"
      };
  }
}
