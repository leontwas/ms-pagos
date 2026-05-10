import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as ws from 'ws';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor(private configService: ConfigService) {
        const url = this.configService.get<string>('SUPABASE_URL');
        const key = this.configService.get<string>('SUPABASE_SERVICE_KEY');

        this.supabase = createClient(url || "", key || "", {
            auth: {
                persistSession: false,
            },
            global: {
                fetch: globalThis.fetch,
            },
            realtime: {
                websocket: ws,
                transport: ws,
            } as any,
        });
    }

    getClient() {
        return this.supabase;
    }
}