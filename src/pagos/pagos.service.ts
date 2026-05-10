import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

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
}
