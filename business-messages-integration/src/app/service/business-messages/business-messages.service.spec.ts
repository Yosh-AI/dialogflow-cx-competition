import { Test, TestingModule } from '@nestjs/testing';
import { BusinessMessagesService } from './business-messages.service';

describe('BusinessMessagesService', () => {
  let service: BusinessMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessMessagesService],
    }).compile();

    service = module.get<BusinessMessagesService>(BusinessMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
