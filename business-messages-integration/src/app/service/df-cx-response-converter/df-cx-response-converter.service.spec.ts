import { Test, TestingModule } from '@nestjs/testing';
import { DfCxResponseConverterService } from './df-cx-response-converter.service';

describe('DfCxResponseConverterService', () => {
  let service: DfCxResponseConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DfCxResponseConverterService],
    }).compile();

    service = module.get<DfCxResponseConverterService>(DfCxResponseConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
