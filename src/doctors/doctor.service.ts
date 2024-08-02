import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async createSampleDoctors() {
    const doctors = [
      { name: 'Dr. Smith', specialty: 'Cardiology' },
      { name: 'Dr. Johnson', specialty: 'Dermatology' },
      { name: 'Dr. Williams', specialty: 'Neurology' },
    ];

    for (const doctor of doctors) {
      const newDoctor = new Doctor();
      newDoctor.name = doctor.name;
      newDoctor.specialty = doctor.specialty;
      await this.doctorRepository.save(newDoctor);
    }
  }
}
