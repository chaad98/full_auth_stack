import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect to the database on module init', async () => {
    // Spy on the $connect method
    const connectSpy = jest.spyOn(service, '$connect').mockResolvedValueOnce();

    // Call onModuleInit
    await service.onModuleInit();

    // Expect $connect to have been called
    expect(connectSpy).toHaveBeenCalled();

    connectSpy.mockRestore();
  });
});
