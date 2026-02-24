import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { GuestbookService } from './guestbook.service';

describe('GuestbookService', () => {
  let service: GuestbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuestbookService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: string) => {
              if (key === 'SUPABASE_URL') return 'https://example.supabase.co';
              if (key === 'SUPABASE_KEY') return 'test-key';
              throw new Error(`Unexpected config key: ${key}`);
            }),
          },
        },
      ],
    }).compile();

    service = module.get<GuestbookService>(GuestbookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
