import { Test, TestingModule } from '@nestjs/testing';
import { DfResponseConverterFactoryService } from './df-response-converter-factory.service';

describe('ResponseConverterFactoryService', () => {
  let service: DfResponseConverterFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DfResponseConverterFactoryService],
    }).compile();

    service = module.get<DfResponseConverterFactoryService>(DfResponseConverterFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
