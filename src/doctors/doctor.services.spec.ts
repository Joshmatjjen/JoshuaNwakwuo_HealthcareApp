import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';

const mockDoctorRepository = () => ({
  find: jest.fn(),
  save: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('DoctorService', () => {
  let service: DoctorService;
  let doctorRepository: MockRepository<Doctor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        {
          provide: getRepositoryToken(Doctor),
          useValue: mockDoctorRepository(),
        },
      ],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
    doctorRepository = module.get<MockRepository<Doctor>>(
      getRepositoryToken(Doctor),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of doctors', async () => {
      const result = [new Doctor(), new Doctor()];
      doctorRepository.find.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });
});
