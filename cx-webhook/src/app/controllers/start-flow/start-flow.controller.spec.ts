import { Test, TestingModule } from '@nestjs/testing';
import { StartFlowController } from './start-flow.controller';

describe('Order Controller', () => {
  let controller: StartFlowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StartFlowController],
    }).compile();

    controller = module.get<StartFlowController>(StartFlowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
