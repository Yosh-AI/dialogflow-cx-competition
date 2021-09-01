import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationFlowController } from './registration-flow.controller';

describe('RegistrationFlow Controller', () => {
  let controller: RegistrationFlowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationFlowController],
    }).compile();

    controller = module.get<RegistrationFlowController>(RegistrationFlowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
