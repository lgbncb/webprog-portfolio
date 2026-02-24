import { Test, TestingModule } from '@nestjs/testing';
import { GuestbookController } from './guestbook.controller';
import { GuestbookService } from './guestbook.service';

describe('GuestbookController', () => {
  let controller: GuestbookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuestbookController],
      providers: [
        {
          provide: GuestbookService,
          useValue: {
            getMessages: jest.fn(),
            addMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GuestbookController>(GuestbookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
