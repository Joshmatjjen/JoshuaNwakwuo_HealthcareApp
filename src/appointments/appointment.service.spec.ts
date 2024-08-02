import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { Doctor } from '../doctors/doctor.entity';

const mockAppointmentRepository = () => ({
  save: jest.fn(),
});
const mockDoctorRepository = () => ({
  findOne: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('AppointmentService', () => {
  let service: AppointmentService;
  let appointmentRepository: MockRepository<Appointment>;
  let doctorRepository: MockRepository<Doctor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: mockAppointmentRepository(),
        },
        {
          provide: getRepositoryToken(Doctor),
          useValue: mockDoctorRepository(),
        },
      ],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
    appointmentRepository = module.get<MockRepository<Appointment>>(
      getRepositoryToken(Appointment),
    );
    doctorRepository = module.get<MockRepository<Doctor>>(
      getRepositoryToken(Doctor),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an appointment', async () => {
      const appointment = new Appointment();
      const doctor = new Doctor();
      doctorRepository.findOne.mockResolvedValue(doctor);
      appointmentRepository.save.mockResolvedValue(appointment);

      expect(await service.create(1, 'John Doe', '2023-01-01')).toBe(
        appointment,
      );
    });

    it('should throw an error if doctor is not found', async () => {
      doctorRepository.findOne.mockResolvedValue(null);

      await expect(service.create(1, 'John Doe', '2023-01-01')).rejects.toThrow(
        'Doctor not found',
      );
    });
  });
});
