import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class PagosService {

  constructor(private readonly supabase: SupabaseService) { }

  async obtenerPagos() {
    try {
      const { data: pagos, error } = await this.supabase.getClient()
        .from('pagos')
        .select(`*`)
        .order('fecha_pago', { ascending: false });

      if (error) throw error;
      return pagos;
    } catch (error) {
      console.error('Error al obtener pagos:', error);
      throw error;
    }
  }

  async obtenerPagoPorId(id: string) {
    try {
      const { data: pago, error } = await this.supabase.getClient()
        .from('pagos')
        .select(`*`)
        .eq('id', id)
        .single();

      if (pago === null) {
        throw new NotFoundException('No se encontro el pago con el id: ' + id);
      }
      if (error) throw error;
      return pago;
    } catch (error) {
      console.error('Error al obtener pago:', error);
      throw error;
    }
  }

  async registrarPago(dto: {
    reservaId: number;
    monto: number;
    tipoPago: string;
    metodoPago: string;
    observaciones?: string;
  }) {
    try {
      const { data: pago, error } = await this.supabase.getClient()
        .from('pagos')
        .insert({
          reserva_id: dto.reservaId,
          monto: dto.monto,
          tipo_pago: dto.tipoPago,
          metodo_pago: dto.metodoPago,
          observaciones: dto.observaciones || null,
        })
        .select()
        .single();

      if (error) throw error;
      return { data: pago };
    } catch (error) {
      console.error('Error al registrar pago:', error);
      throw new InternalServerErrorException('Error al registrar el pago');
    }
  }

  async crearPreferencia(dto: {
    title: string;
    unit_price: number;
    quantity: number;
    reservaId: number;
  }) {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || '';
    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    try {
      const response = await preference.create({
        body: {
          items: [
            {
              id: dto.reservaId.toString(),
              title: dto.title,
              quantity: dto.quantity,
              unit_price: dto.unit_price,
            },
          ],
          back_urls: {
            success: `${process.env.FRONTEND_URL || 'https://ppp3-canchas.vercel.app'}/mis-reservas`,
            failure: `${process.env.FRONTEND_URL || 'https://ppp3-canchas.vercel.app'}/mis-reservas`,
            pending: `${process.env.FRONTEND_URL || 'https://ppp3-canchas.vercel.app'}/mis-reservas`,
          },
          auto_return: 'approved',
          external_reference: dto.reservaId.toString(),
        }
      });

      return { preferenceId: response.id };
    } catch (error) {
      console.error('Error creando preferencia en MercadoPago', error);
      throw new InternalServerErrorException('Error creando preferencia de pago');
    }
  }
}
