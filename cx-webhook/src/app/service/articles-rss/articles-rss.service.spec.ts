import { Test, TestingModule } from '@nestjs/testing';
import { Articles } from './articles.service';

describe('WhoRssService', () => {
  let service: Articles;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Articles],
    }).compile();

    service = module.get<Articles>(Articles);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
