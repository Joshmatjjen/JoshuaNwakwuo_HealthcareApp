import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Doctor } from '../doctors/doctor.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(
    doctorId: number,
    patientName: string,
    date: string,
  ): Promise<Appointment> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });
    // console.log('Date', date, '+', doctorId);

    if (!date) {
      throw new BadRequestException('Appointment Date not found');
    }
    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }
    if (!patientName || patientName === '') {
      throw new BadRequestException('Patient name not found');
    }

    const appointment = new Appointment();
    appointment.doctorId = doctorId;
    appointment.patientName = patientName;
    appointment.date = date;
    appointment.doctor = doctor;
    return this.appointmentRepository.save(appointment);
  }
}
