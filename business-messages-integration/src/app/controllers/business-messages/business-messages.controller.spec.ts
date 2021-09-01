import { Test, TestingModule } from '@nestjs/testing';
import { BusinessMessagesController } from './business-messages.controller';

describe('Generic Controller', () => {
  let controller: BusinessMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessMessagesController],
    }).compile();

    controller = module.get<BusinessMessagesController>(BusinessMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
