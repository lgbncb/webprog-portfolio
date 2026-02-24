import { Controller, Get, Post, Body } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('api/guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  getMessages() {
    return this.guestbookService.getMessages();
  }

  @Post()
  addMessage(@Body() body: { name: string; message: string }) {
    return this.guestbookService.addMessage(body.name, body.message);
  }
}