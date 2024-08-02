import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { IsInt, IsString, IsDateString, Min } from 'class-validator';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';

class CreateAppointmentDto {
  @IsInt()
  @Min(1)
  doctorId: number;

  @IsString()
  patientName: string;

  @IsDateString()
  date: string;
}

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  // NOTE This return the appointment data
  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { doctorId, patientName, date } = createAppointmentDto;
    return this.appointmentService.create(doctorId, patientName, date);
  }
}
