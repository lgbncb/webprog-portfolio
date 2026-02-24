import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.getOrThrow<string>('SUPABASE_URL');
    const supabaseKey = this.configService.getOrThrow<string>('SUPABASE_KEY');

    this.supabase = createClient(
      supabaseUrl,
      supabaseKey,
    );
  }

  async getMessages() {
    const { data, error } = await this.supabase.from('guestbook').select('*').order('created_at', { ascending: false });
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async addMessage(name: string, message: string) {
    const { data, error } = await this.supabase.from('guestbook').insert([{ name, message }]).select();
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }
}